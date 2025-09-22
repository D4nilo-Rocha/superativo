import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, findUserByEmail, getUserCount, getRecentUsers } from '/lib/database.js';

// Configurações
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-aqui';

export async function POST(request) {
  try {
    // Extrair dados do corpo da requisição
    const {
      nomeCompleto,
      email,
      senha,
      confirmarSenha,
      telefone,
      dataNascimento,
      genero,
      endereco
    } = await request.json();

    // Validações básicas
    const errors = {};

    // Validar campos obrigatórios
    if (!nomeCompleto || nomeCompleto.trim().length < 2) {
      errors.nomeCompleto = 'Nome completo é obrigatório e deve ter pelo menos 2 caracteres';
    }

    if (!email || !isValidEmail(email)) {
      errors.email = 'E-mail válido é obrigatório';
    }

    if (!senha || senha.length < 8) {
      errors.senha = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (senha !== confirmarSenha) {
      errors.confirmarSenha = 'Senhas não conferem';
    }

    if (!dataNascimento) {
      errors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    if (!genero) {
      errors.genero = 'Gênero é obrigatório';
    }

    // Validar idade mínima
    if (dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      
      if (idade < 13) {
        errors.dataNascimento = 'Idade mínima: 13 anos';
      }
    }

    // Validar força da senha
    if (senha) {
      const hasNumber = /\d/.test(senha);
      const hasLetter = /[a-zA-Z]/.test(senha);
      
      if (!hasNumber || !hasLetter) {
        errors.senha = 'Senha deve conter pelo menos uma letra e um número';
      }
    }

    // Verificar se há erros
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Dados inválidos',
        errors
      }, { status: 400 });
    }

    // Verificar se e-mail já existe usando o banco compartilhado
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Este e-mail já está cadastrado',
        errors: { email: 'E-mail já cadastrado' }
      }, { status: 409 });
    }

    // Criptografar senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Preparar dados do novo usuário
    const userData = {
      nomeCompleto: nomeCompleto.trim(),
      email: email.toLowerCase().trim(),
      senha: hashedPassword,
      telefone: telefone ? formatPhone(telefone) : null,
      dataNascimento,
      genero,
      endereco: {
        rua: endereco?.rua || '',
        cidade: endereco?.cidade || '',
        cep: endereco?.cep ? formatCEP(endereco.cep) : ''
      },
      pontos: {
        aula: 0,
        saude: 0,
        presenca: 0,
        total: 0
      },
      turma: null, // Será definido posteriormente
      nivel: 'Bronze',
      ativo: true
    };

    // Salvar usuário usando o banco compartilhado
    const newUser = addUser(userData);

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email,
        nome: newUser.nomeCompleto
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remover senha da resposta
    const { senha: _, ...userResponse } = newUser;

    // Log para desenvolvimento (remover em produção)
    console.log('✅ Usuário cadastrado:', {
      id: newUser.id,
      nome: newUser.nomeCompleto,
      email: newUser.email,
      totalUsuarios: getUserCount()
    });

    // Resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Cadastro realizado com sucesso!',
      data: {
        user: userResponse,
        token
      }
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Erro no cadastro:', error);

    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
    }, { status: 500 });
  }
}

// Método GET para verificar se o endpoint está funcionando
export async function GET() {
  return NextResponse.json({
    message: 'Endpoint de cadastro funcionando',
    totalUsuarios: getUserCount(),
    ultimosCadastros: getRecentUsers()
  });
}

// Funções utilitárias
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function formatPhone(phone) {
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function formatCEP(cep) {
  const numbers = cep.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
}
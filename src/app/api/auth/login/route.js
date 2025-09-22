import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, updateUserLogin, getUserCount, getUsers } from '/lib/database.js';

// Configurações
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-aqui';

export async function POST(request) {
  try {
    // Extrair dados do corpo da requisição
    const { email, senha } = await request.json();

    // Validações básicas
    if (!email || !senha) {
      return NextResponse.json({
        success: false,
        message: 'E-mail e senha são obrigatórios',
        errors: {
          email: !email ? 'E-mail é obrigatório' : undefined,
          senha: !senha ? 'Senha é obrigatória' : undefined
        }
      }, { status: 400 });
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Formato de e-mail inválido',
        errors: { email: 'E-mail inválido' }
      }, { status: 400 });
    }

    // Buscar usuário no banco compartilhado
    const user = findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'E-mail não cadastrado',
        errors: { email: 'Este e-mail não está cadastrado' }
      }, { status: 401 });
    }

    // Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    
    if (!senhaCorreta) {
      return NextResponse.json({
        success: false,
        message: 'Senha incorreta',
        errors: { senha: 'Senha incorreta' }
      }, { status: 401 });
    }

    // Atualizar último login usando função do banco compartilhado
    const updatedUser = updateUserLogin(user.id);

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: updatedUser.id,
        email: updatedUser.email,
        nome: updatedUser.nomeCompleto
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remover senha da resposta
    const { senha: _, ...userResponse } = updatedUser;

    // Log para desenvolvimento (remover em produção)
    console.log('✅ Login realizado:', {
      usuario: updatedUser.nomeCompleto,
      email: updatedUser.email,
      ultimoLogin: updatedUser.ultimoLogin
    });

    // Resposta de sucesso
    return NextResponse.json({
      success: true,
      message: `Bem-vindo de volta, ${updatedUser.nomeCompleto}!`,
      data: {
        user: userResponse,
        token,
        expiresIn: '7d'
      }
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Erro no login:', error);

    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
    }, { status: 500 });
  }
}

// Método GET para verificar se o endpoint está funcionando
export async function GET() {
  const allUsers = getUsers();
  
  return NextResponse.json({
    message: 'Endpoint de login funcionando',
    totalUsuarios: getUserCount(),
    usuariosDisponiveis: allUsers.map(user => ({
      id: user.id,
      nome: user.nomeCompleto,
      email: user.email,
      ultimoLogin: user.ultimoLogin || 'Nunca fez login'
    }))
  });
}
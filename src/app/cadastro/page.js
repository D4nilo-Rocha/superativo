'use client'

import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Check, X, User, Mail, Lock, Phone, Calendar, MapPin, Shield, CheckCircle } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";


const CadastroScreen = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    endereco: {
      rua: '',
      cidade: '',
      cep: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validações
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const validateCEP = (cep) => {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validação em tempo real
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value
      }
    }));
    
    setTouched(prev => ({ ...prev, [`endereco.${field}`]: true }));
    validateAddressField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'nomeCompleto':
        if (!value.trim()) {
          newErrors[field] = 'Nome completo é obrigatório';
        } else if (value.trim().split(' ').length < 2) {
          newErrors[field] = 'Digite o nome completo';
        } else {
          delete newErrors[field];
        }
        break;

      case 'email':
        if (!value) {
          newErrors[field] = 'E-mail é obrigatório';
        } else if (!validateEmail(value)) {
          newErrors[field] = 'E-mail inválido';
        } else {
          delete newErrors[field];
        }
        break;

      case 'senha':
        const passValidation = validatePassword(value);
        if (!value) {
          newErrors[field] = 'Senha é obrigatória';
        } else if (!passValidation.length || !passValidation.hasNumber || !passValidation.hasLetter) {
          newErrors[field] = 'Senha deve ter 8+ caracteres, letras e números';
        } else {
          delete newErrors[field];
        }
        break;

      case 'confirmarSenha':
        if (!value) {
          newErrors[field] = 'Confirmação de senha é obrigatória';
        } else if (value !== formData.senha) {
          newErrors[field] = 'Senhas não conferem';
        } else {
          delete newErrors[field];
        }
        break;

      case 'telefone':
        if (value && !validatePhone(value)) {
          newErrors[field] = 'Telefone inválido';
        } else {
          delete newErrors[field];
        }
        break;

      case 'dataNascimento':
        if (!value) {
          newErrors[field] = 'Data de nascimento é obrigatória';
        } else {
          const hoje = new Date();
          const nascimento = new Date(value);
          const idade = hoje.getFullYear() - nascimento.getFullYear();
          if (idade < 13) {
            newErrors[field] = 'Idade mínima: 13 anos';
          } else if (idade > 100) {
            newErrors[field] = 'Data inválida';
          } else {
            delete newErrors[field];
          }
        }
        break;

      case 'genero':
        if (!value) {
          newErrors[field] = 'Selecione o gênero';
        } else {
          delete newErrors[field];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateAddressField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'cep':
        if (value && !validateCEP(value)) {
          newErrors[`endereco.${field}`] = 'CEP inválido';
        } else {
          delete newErrors[`endereco.${field}`];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const getFieldStatus = (field) => {
    if (errors[field]) return 'error';
    if (touched[field] && formData[field]) return 'success';
    return 'default';
  };

  const getAddressFieldStatus = (field) => {
    const fieldKey = `endereco.${field}`;
    if (errors[fieldKey]) return 'error';
    if (touched[fieldKey] && formData.endereco[field]) return 'success';
    return 'default';
  };

  // FUNÇÃO INTEGRADA COM BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar aceitação de termos
    if (!acceptTerms || !acceptPrivacy) {
      alert('É necessário aceitar os termos e políticas para continuar');
      return;
    }

    // Verificar se há erros de validação
    if (Object.keys(errors).length > 0) {
      alert('Por favor, corrija os erros no formulário');
      return;
    }

    setIsLoading(true);
    
    try {
      // Enviar dados para o backend
      const response = await fetch('/api/auth/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Sucesso no cadastro
        alert(`Parabéns! Cadastro realizado com sucesso!\n\nBem-vindo(a), ${result.data.user.nomeCompleto}!`);
        
        // Salvar token de autenticação
        if (result.data.token) {
          localStorage.setItem('superativo_token', result.data.token);
          localStorage.setItem('superativo_user', JSON.stringify(result.data.user));
        }
        
        // Redirecionar para tela inicial
        window.location.href = '/homescreen';
        
      } else {
        // Erros retornados pelo backend
        if (result.errors) {
          setErrors(result.errors);
          alert(`Erro no cadastro:\n${result.message}`);
        } else {
          alert(result.message || 'Erro desconhecido no cadastro');
        }
      }

    } catch (error) {
      console.error('Erro ao conectar com servidor:', error);
      alert('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    alert(`Cadastro com ${provider} em desenvolvimento`);
  };

  const passwordValidation = validatePassword(formData.senha);
  const isFormValid = Object.keys(errors).length === 0 && 
                      formData.nomeCompleto && 
                      formData.email && 
                      formData.senha && 
                      formData.confirmarSenha &&
                      formData.dataNascimento &&
                      formData.genero &&
                      acceptTerms && 
                      acceptPrivacy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft size={24} className="cursor-pointer" onClick={() => window.history.go(-1)} />
          <h1 className="text-xl font-semibold">Criar Conta</h1>
        </div>
        <p className="text-blue-100">Junte-se à Educação Física Conectada</p>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          
          {/* Cadastro Social */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cadastro Rápido</h3>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                  type="button"
                    onClick={() => handleSocialLogin('Google')}
                     className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                   <FcGoogle size={20} />
                  <span className="text-sm font-medium">Google</span>
              </button>
                
              <button
                  type="button"
                   onClick={() => handleSocialLogin('Facebook')}
                    className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FaFacebook size={20} className="text-blue-600" />
                    <span className="text-sm font-medium">Facebook</span>
              </button>
                
              <button
                  type="button"
                    onClick={() => handleSocialLogin('Apple')}
                      className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FaApple size={20} className="text-black" />
                    <span className="text-sm font-medium">Apple</span>
              </button>
              </div>

            <div className="text-center text-gray-500 text-sm mt-4">ou</div>
          </div>

          {/* Dados Pessoais */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User size={20} />
              Dados Pessoais
            </h3>
            
            {/* Nome Completo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('nomeCompleto') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('nomeCompleto') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Digite seu nome completo"
                />
                {getFieldStatus('nomeCompleto') === 'success' && (
                  <CheckCircle size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
              </div>
              {errors.nomeCompleto && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X size={14} />
                  {errors.nomeCompleto}
                </p>
              )}
            </div>

            {/* Data de Nascimento e Gênero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('dataNascimento') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('dataNascimento') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.dataNascimento && (
                  <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero *
                </label>
                <select
                  value={formData.genero}
                  onChange={(e) => handleInputChange('genero', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('genero') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('genero') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="nao-binario">Não-binário</option>
                  <option value="prefiro-nao-informar">Prefiro não informar</option>
                </select>
                {errors.genero && (
                  <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Phone size={20} />
              Contato
            </h3>
            
            {/* E-mail */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('email') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('email') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="seu.email@exemplo.com"
                />
                {getFieldStatus('email') === 'success' && (
                  <CheckCircle size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone (opcional)
              </label>
              <input
                type="text"
                value={formatPhone(formData.telefone)}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  getFieldStatus('telefone') === 'error' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="(11) 99999-9999"
              />
              {errors.telefone && (
                <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
              )}
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Endereço (opcional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  value={formatCEP(formData.endereco.cep)}
                  onChange={(e) => handleAddressChange('cep', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getAddressFieldStatus('cep') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="12345-678"
                />
                {errors['endereco.cep'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['endereco.cep']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={formData.endereco.cidade}
                  onChange={(e) => handleAddressChange('cidade', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sua cidade"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua/Endereço
                </label>
                <input
                  type="text"
                  value={formData.endereco.rua}
                  onChange={(e) => handleAddressChange('rua', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rua, número, complemento"
                />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Lock size={20} />
              Segurança
            </h3>
            
            {/* Senha */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className={`w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('senha') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('senha') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {formData.senha && (
                <div className="mt-2 space-y-1">
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.length ? <Check size={12} /> : <X size={12} />}
                    Mínimo 8 caracteres
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasLetter ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.hasLetter ? <Check size={12} /> : <X size={12} />}
                    Pelo menos uma letra
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.hasNumber ? <Check size={12} /> : <X size={12} />}
                    Pelo menos um número
                  </div>
                </div>
              )}
              
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmação de Senha *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                  className={`w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('confirmarSenha') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('confirmarSenha') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Digite a senha novamente"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {getFieldStatus('confirmarSenha') === 'success' && (
                  <CheckCircle size={20} className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
              </div>
              {errors.confirmarSenha && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>
              )}
            </div>
          </div>

          {/* Termos e Privacidade */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shield size={20} />
              Termos e Privacidade
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Li e aceito os <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> da plataforma *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Aceito a <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a> e o tratamento dos meus dados conforme a LGPD *
                </span>
              </label>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                <Shield size={16} className="inline mr-2" />
                Seus dados estão protegidos com criptografia de ponta a ponta e nunca serão compartilhados sem sua autorização.
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-colors ${
                isFormValid && !isLoading
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>

            <div className="text-center">
              <span className="text-gray-600">Já tem conta? </span>
              <a href="login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Entrar agora
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing for mobile */}
      <div className="h-8"></div>
    </div>
  );
};

export default CadastroScreen;
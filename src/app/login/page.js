'use client'

import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, User, Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';        // Logo oficial Google
import { FaFacebookF, FaApple } from 'react-icons/fa'; // Logo oficial Facebook e Apple

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
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
        if (!value) {
          newErrors[field] = 'Senha é obrigatória';
        } else if (value.length < 6) {
          newErrors[field] = 'Senha deve ter pelo menos 6 caracteres';
        } else {
          delete newErrors[field];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const getFieldStatus = (field) => {
    if (errors[field]) return 'error';
    if (touched[field] && formData[field] && !errors[field]) return 'success';
    return 'default';
  };

  const handleLogin = async () => {
    validateField('email', formData.email);
    validateField('senha', formData.senha);

    if (!formData.email || !formData.senha || Object.keys(errors).length > 0) {
      alert('Por favor, preencha todos os campos corretamente');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert(`${result.message}`);
        
        if (result.data.token) {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('superativo_token', result.data.token);
          storage.setItem('superativo_user', JSON.stringify(result.data.user));
        }

        window.location.href = '/homescreen';
      } else {
        if (result.errors) setErrors(result.errors);
        alert(result.message || 'Erro no login');
      }

    } catch (error) {
      console.error('Erro ao conectar com servidor:', error);
      alert('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    alert(`Login com ${provider} em desenvolvimento`);
  };

  const handleForgotPassword = () => {
    alert('Funcionalidade de recuperação de senha em desenvolvimento');
  };

  const isFormValid = formData.email && 
                      formData.senha && 
                      Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft 
            size={24} 
            className="cursor-pointer" 
            onClick={() => window.location.href = '/homescreen'}
          />
          <h1 className="text-xl font-semibold">Entrar na Conta</h1>
        </div>
        <p className="text-blue-100">Acesse sua conta da Educação Física Conectada</p>
      </div>

      <div className="p-6 max-w-md mx-auto">
        <div className="space-y-6">

          {/* Login Social */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Entrar com</h3>
            <div className="space-y-3">

              {/* Google */}
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle size={20} />
                <span className="font-medium">Continuar com Google</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFacebookF size={20} className="text-blue-600" />
                <span className="font-medium">Continuar com Facebook</span>
              </button>

              {/* Apple */}
              <button
                onClick={() => handleSocialLogin('Apple')}
                className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaApple size={20} />
                <span className="font-medium">Continuar com Apple</span>
              </button>

            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>
          </div>

          {/* Formulário de Login */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User size={20} />
              Dados de Acesso
            </h3>

            {/* E-mail */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('email') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('email') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="seu.email@exemplo.com"
                />
                {getFieldStatus('email') === 'success' && (
                  <CheckCircle size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
                {getFieldStatus('email') === 'error' && (
                  <AlertCircle size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldStatus('senha') === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : getFieldStatus('senha') === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
              )}
            </div>

            {/* Opções de Login */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Lembrar de mim</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Botão de Entrar */}
            <button
              onClick={handleLogin}
              disabled={!isFormValid || isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                isFormValid && !isLoading
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          {/* Segurança e Informações */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800">Login Seguro</h4>
                    <p className="text-sm text-blue-700">
                      Sua conexão é protegida com criptografia SSL de 256 bits
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Ainda não tem conta?
                </p>
                <button
                  onClick={() => window.location.href = '/cadastro'}
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Criar conta gratuita
                </button>
              </div>
            </div>
          </div>

          {/* Ajuda */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Precisa de ajuda?</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-800">Central de Ajuda</div>
                <div className="text-sm text-gray-600">Dúvidas frequentes e tutoriais</div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-800">Contato</div>
                <div className="text-sm text-gray-600">Fale conosco pelo WhatsApp ou email</div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-800">Problemas de acesso</div>
                <div className="text-sm text-gray-600">Não consegue entrar na conta?</div>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default LoginScreen;

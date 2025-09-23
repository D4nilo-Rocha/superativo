'use client'

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play, TrendingUp, Calendar, BookOpen, Trophy, Users, Bell } from 'lucide-react';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-b-3xl shadow-lg relative">
        <div className="flex items-center justify-between mb-4 relative z-10">
          {/* Foto + texto */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src="/Danilo-foto.jpg" 
                alt="Foto do Usuário" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">Bem-vindo!</h1>
          </div>

          {/* Sino */}
          <div className="relative">
            <Bell size={24} className="text-white/80" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
        </div>

        {/* Logo centralizada */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1 h- w- z-0">
          <Image
            src="/logo-superativo2.png"
            alt="Logo Super Ativo"
            width={256}
            height={80}
            className="h-full w-full object-fill drop-shadow-[0_10px_5px_rgba(0,123,255,0.8)]"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 relative z-10">
          <h2 className="text-lg font-medium mb-2">Últimos rankings</h2>
          <p className="text-blue-100 text-sm mb-4">Precisa estar logado</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/login'}
                className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Entrar na conta
              </button>
              <button 
                onClick={() => window.location.href = '/cadastro'}
                className="border border-white/30 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Cadastrar
              </button>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="border border-white/30 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Landing Page
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Tutorials Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Tutoriais</h3>
            <ArrowRight size={20} className="text-gray-400" />
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { icon: Trophy, label: 'Futebol', color: 'bg-orange-100 text-orange-600' },
              { icon: Users, label: 'Vôlei', color: 'bg-purple-100 text-purple-600' },
              { icon: TrendingUp, label: 'Musculação', color: 'bg-green-100 text-green-600' },
              { icon: Calendar, label: 'Mais', color: 'bg-blue-100 text-blue-600' }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                    <IconComponent size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sports News Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Notícias esportivas</h3>
            <ArrowRight size={20} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {/* Featured News Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex p-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">Headline</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Description dura ante nunc dolor in reprehenderit in voluptate velit
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                      LIVE
                    </span>
                    <span className="text-gray-500 text-xs">• 35min</span>
                  </div>
                </div>
                <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center ml-4">
                  <Play size={24} className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* Regular News Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex p-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">Headline</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Description dura ante nunc dolor in reprehenderit in voluptate velit
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                      NEWS
                    </span>
                    <span className="text-gray-500 text-xs">• 2h</span>
                  </div>
                </div>
                <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center ml-4">
                  <BookOpen size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movies & Series Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Filmes e séries</h3>
            <ArrowRight size={20} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {/* Headline 1 */}
            <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Play size={24} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Headline</h4>
                  <p className="text-gray-600 text-sm">
                    Description dura ante nunc dolor in reprehenderit in voluptate velit
                  </p>
                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium mt-2 inline-block">
                    Futebol
                  </span>
                </div>
              </div>
            </div>

            {/* Headline 2 */}
            <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Play size={24} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Headline</h4>
                  <p className="text-gray-600 text-sm">
                    Description dura ante nunc dolor in reprehenderit in voluptate velit
                  </p>
                  <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium mt-2 inline-block">
                    Vôlei
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around items-center">
          <div onClick={() => window.location.href = '/'} className="flex flex-col items-center gap-1 cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-xs text-blue-500 font-medium">Página Inicial</span>
          </div>

          <div onClick={() => window.location.href = '/rankingGeral'} className="flex flex-col items-center gap-1 cursor-pointer">
            <TrendingUp size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Ranking Geral</span>
          </div>

          <div onClick={() => window.location.href = '/turma'} className="flex flex-col items-center gap-1 cursor-pointer">
            <Users size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Minha Turma</span>
          </div>

          <div onClick={() => window.location.href = '/perfil'} className="flex flex-col items-center gap-1 cursor-pointer">
            <Trophy size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Meu Perfil</span>
          </div>
        </div>
      </div>

      {/* Spacing for bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default HomeScreen;

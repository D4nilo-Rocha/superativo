'use client'

import React, { useState } from 'react';
import { ArrowLeft, Calendar, ChevronRight, TrendingUp, BookOpen, Trophy, Users, Plus, Minus, Smartphone, Tablet, Monitor } from 'lucide-react';

const PerfilScreen = () => {
  const [pontosAula, setPontosAula] = useState(100);
  const [pontosSaude, setPontosSaude] = useState(100);
  const [pontosPresenca, setPontosPresenca] = useState(100);

  const syncDevices = [
    { id: 1, name: 'List item', icon: Smartphone },
    { id: 2, name: 'List item', icon: Tablet },
    { id: 3, name: 'List item', icon: Monitor },
    { id: 4, name: 'List item', icon: Smartphone }
  ];

  const handlePontosChange = (tipo, operacao) => {
    const valor = operacao === 'add' ? 10 : -10;
    switch (tipo) {
      case 'aula':
        setPontosAula(prev => Math.max(0, prev + valor));
        break;
      case 'saude':
        setPontosSaude(prev => Math.max(0, prev + valor));
        break;
      case 'presenca':
        setPontosPresenca(prev => Math.max(0, prev + valor));
        break;
    }
  };

  const totalPontos = pontosAula + pontosSaude + pontosPresenca;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Meu Perfil - Aluno</h1>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-blue-100 text-sm hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all duration-200 border border-blue-200/30 hover:border-white/40"
          >
            Landing Page
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="/Renata-foto.jpg" 
              alt="Foto do Aluno" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Lorem ipsum dolor sit.</h2>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Calendar size={14} />
              <span>18 Aluno</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Users size={14} />
              <span>25 Turma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Points Balance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Meu balanço de pontos</h3>

          {/* Pontos de Aula */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Pontos de Aula</h4>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePontosChange('aula', 'subtract')}
                  className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-lg font-bold text-gray-800 min-w-[3rem] text-center">+{pontosAula}</span>
                <button 
                  onClick={() => handlePontosChange('aula', 'add')}
                  className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">01/01/2025</div>
            <div className="text-sm text-gray-600">{pontosAula}</div>
          </div>

          {/* Pontos de Saúde */}
          <div className="bg-green-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Pontos de Saúde</h4>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePontosChange('saude', 'subtract')}
                  className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-lg font-bold text-gray-800 min-w-[3rem] text-center">+{pontosSaude}</span>
                <button 
                  onClick={() => handlePontosChange('saude', 'add')}
                  className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">01/01/2025</div>
            <div className="text-sm text-gray-600">{pontosSaude}</div>
          </div>

          {/* Pontos de Presença */}
          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Pontos de Presença</h4>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePontosChange('presenca', 'subtract')}
                  className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-lg font-bold text-gray-800 min-w-[3rem] text-center">+{pontosPresenca}</span>
                <button 
                  onClick={() => handlePontosChange('presenca', 'add')}
                  className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">01/01/2025</div>
            <div className="text-sm text-gray-600">{pontosPresenca}</div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-gray-800">Total:</h4>
              <span className="text-2xl font-bold text-blue-600">{totalPontos}</span>
            </div>
          </div>
        </div>

        {/* Device Sync Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sincronize seus dispositivos</h3>
          <p className="text-gray-600 text-sm mb-6">
            Aqui você pode sincronizar suas atividades registradas em outros aplicativos que monitoram seus exercícios.
          </p>

          <div className="space-y-3">
            {syncDevices.map((device) => {
              const IconComponent = device.icon;
              return (
                <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent size={20} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{device.name}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around items-center">
          <div onClick={() => window.location.href = '/homescreen'} className="flex flex-col items-center gap-1 cursor-pointer">
            <BookOpen size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Página Inicial</span>
          </div>

          <div onClick={() => window.location.href = '/rankingGeral'} className="flex flex-col items-center gap-1 cursor-pointer">
            <TrendingUp size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Ranking Geral</span>
          </div>

          <div onClick={() => window.location.href = '/turma'} className="flex flex-col items-center gap-1 cursor-pointer">
            <Users size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Minha Turma</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Trophy size={18} className="text-white" />
            </div>
            <span className="text-xs text-blue-500 font-medium">Meu Perfil</span>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default PerfilScreen;
'use client'

import React, { useState } from 'react';
import { ArrowLeft, Trophy, TrendingUp, BookOpen, Users, Calendar, Target, ChevronRight, Award, Zap, Activity, Clock, BarChart3 } from 'lucide-react';
import Image from 'next/image';

const HistoricoScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('ultimo_mes');
  const [selectedMetric, setSelectedMetric] = useState('total');

  // Dados mock do histórico
  const historicoData = {
    ultimo_mes: [
      { data: '01/12', total: 1850, aula: 850, saude: 600, presenca: 400 },
      { data: '08/12', total: 2100, aula: 1000, saude: 700, presenca: 400 },
      { data: '15/12', total: 2350, aula: 1200, saude: 750, presenca: 400 },
      { data: '22/12', total: 2650, aula: 1400, saude: 800, presenca: 450 },
      { data: '29/12', total: 2850, aula: 1500, saude: 800, presenca: 550 }
    ],
    bimestre_atual: [
      { data: 'Sem 1', total: 1200, aula: 600, saude: 400, presenca: 200 },
      { data: 'Sem 2', total: 1600, aula: 800, saude: 500, presenca: 300 },
      { data: 'Sem 3', total: 2000, aula: 1000, saude: 600, presenca: 400 },
      { data: 'Sem 4', total: 2400, aula: 1200, saude: 700, presenca: 500 },
      { data: 'Sem 5', total: 2850, aula: 1500, saude: 800, presenca: 550 }
    ]
  };

  const metasData = [
    {
      id: 1,
      titulo: 'Meta Bimestral',
      atual: 2850,
      objetivo: 3000,
      progresso: 95,
      categoria: 'total',
      prazo: '15 dias restantes',
      status: 'em_andamento'
    },
    {
      id: 2,
      titulo: 'Pontos de Aula',
      atual: 1500,
      objetivo: 1600,
      progresso: 94,
      categoria: 'aula',
      prazo: '15 dias restantes',
      status: 'quase_completa'
    },
    {
      id: 3,
      titulo: 'Atividade Diária',
      atual: 28,
      objetivo: 30,
      progresso: 93,
      categoria: 'saude',
      prazo: '2 dias restantes',
      status: 'em_andamento'
    }
  ];

  const conquistasRecentes = [
    { nome: 'Streak 7 dias', data: '22/12', tipo: 'presenca', icone: '🔥' },
    { nome: 'Top 3 da Turma', data: '20/12', tipo: 'ranking', icone: '🏆' },
    { nome: '1000 Pontos Aula', data: '15/12', tipo: 'milestone', icone: '⭐' },
    { nome: 'Atleta da Semana', data: '10/12', tipo: 'especial', icone: '🥇' }
  ];

  const dados = historicoData[selectedPeriod] || [];
  const maxValue = Math.max(...dados.map(d => d[selectedMetric]));

  const getProgressColor = (progresso) => {
    if (progresso >= 95) return 'text-green-600 bg-green-100';
    if (progresso >= 75) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completa':
        return <Trophy size={16} className="text-green-500" />;
      case 'quase_completa':
        return <Target size={16} className="text-blue-500" />;
      default:
        return <Activity size={16} className="text-orange-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 text-gray-300 p-6">
        {/* Logo Superativo2 Centralizada */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 h-20 w-40 z-0 drop-shadow-[0_10px_5px_rgba(0,123,255,0.8)]">
          <Image
            src="/logo-superativo2.png"
            alt="Logo Superativo2"
            width={256}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <ArrowLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
            <h1 className="text-xl font-semibold">Histórico & Progresso</h1>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 hover:bg-white/30 transition-colors">
              <img
                src="/Liana-foto.png"
                alt="Foto de Liana"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-blue-100 font-medium">Liana</span>
          </div>
        </div>
        <div className="flex items-center justify-between relative z-10">
          <p className="text-gray-300">Acompanhe sua evolução e metas</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-blue-100 text-sm hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all duration-200 border border-blue-200/30 hover:border-white/40"
          >
            Landing Page
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Resumo Atual */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-500" />
            Situação Atual
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">2.850</div>
              <div className="text-sm text-blue-700 mb-2">Pontos Totais</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                <TrendingUp size={12} />
                +200 esta semana
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">3º</div>
              <div className="text-sm text-green-700 mb-2">Posição Atual</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                <Trophy size={12} />
                Subiu 2 posições
              </div>
            </div>
          </div>
        </div>

        {/* Controles do Gráfico */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ultimo_mes">Último Mês</option>
                <option value="bimestre_atual">Bimestre Atual</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Métrica</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="total">Pontos Totais</option>
                <option value="aula">Pontos de Aula</option>
                <option value="saude">Pontos de Saúde</option>
                <option value="presenca">Pontos de Presença</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gráfico Simples */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução dos Pontos</h3>
          <div className="relative h-40 mb-4">
            <div className="flex items-end justify-between h-full border-l-2 border-b-2 border-gray-200 px-2">
              {dados.map((item, index) => {
                const height = (item[selectedMetric] / maxValue) * 100;
                const colors = {
                  total: 'bg-blue-500',
                  aula: 'bg-blue-500',
                  saude: 'bg-green-500',
                  presenca: 'bg-orange-500'
                };
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-8 ${colors[selectedMetric]} rounded-t transition-all duration-500 mb-2`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-600 transform -rotate-45 origin-left">
                      {item.data}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Maior valor: <span className="font-semibold">{maxValue}</span> pontos
            </span>
          </div>
        </div>

        {/* Metas e Objetivos */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target size={20} className="text-green-500" />
            Metas Ativas
          </h3>
          
          <div className="space-y-4">
            {metasData.map((meta) => (
              <div key={meta.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(meta.status)}
                    <span className="font-semibold text-gray-800">{meta.titulo}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getProgressColor(meta.progresso)}`}>
                    {meta.progresso}%
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{meta.atual} / {meta.objetivo}</span>
                    <span>{meta.prazo}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        meta.progresso >= 95 ? 'bg-green-500' : 
                        meta.progresso >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${meta.progresso}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conquistas Recentes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Award size={20} className="text-yellow-500" />
              Conquistas Recentes
            </h3>
            <ChevronRight size={16} className="text-gray-400 cursor-pointer" />
          </div>
          
          <div className="space-y-3">
            {conquistasRecentes.map((conquista, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-2xl">{conquista.icone}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{conquista.nome}</div>
                  <div className="text-sm text-gray-600">{conquista.data}</div>
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {conquista.tipo}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas de Atividade */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-purple-500" />
            Estatísticas de Atividade
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap size={20} className="text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">28</span>
              </div>
              <div className="text-sm text-purple-700">Dias Consecutivos</div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={20} className="text-indigo-600" />
                <span className="text-2xl font-bold text-indigo-600">156</span>
              </div>
              <div className="text-sm text-indigo-700">Horas de Atividade</div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy size={20} className="text-teal-600" />
                <span className="text-2xl font-bold text-teal-600">12</span>
              </div>
              <div className="text-sm text-teal-700">Conquistas Este Mês</div>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target size={20} className="text-pink-600" />
                <span className="text-2xl font-bold text-pink-600">89%</span>
              </div>
              <div className="text-sm text-pink-700">Metas Cumpridas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => window.location.href = '/homescreen'}>
            <BookOpen size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Página Inicial</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-xs text-blue-500 font-medium">Ranking Geral</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => window.location.href = '/turma'}>
            <Users size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Minha Turma</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => window.location.href = '/perfil'}>
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

export default HistoricoScreen;

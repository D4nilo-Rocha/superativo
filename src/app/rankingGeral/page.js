'use client'

import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Crown, TrendingUp, BookOpen, Users, Filter, Calendar, Target, User, BarChart3, ChevronRight } from 'lucide-react';

const RankingScreen = () => {
  const [filterType, setFilterType] = useState('geral');
  const [timePeriod, setTimePeriod] = useState('bimestre');

  // Dados mock dos rankings
  const rankingData = [
    {
      id: 1,
      nome: 'Liana',
      turma: '9º A',
      pontos: {
        total: 2850,
        aula: 1500,
        saude: 800,
        presenca: 550
      },
      posicao: 1,
      avatar: '👦',
      nivel: 'Ouro'
    },
    {
      id: 2,
      nome: 'Aiimé Mariana',
      turma: '8º B',
      pontos: {
        total: 2720,
        aula: 1400,
        saude: 920,
        presenca: 400
      },
      posicao: 2,
      avatar: '👧',
      nivel: 'Ouro'
    },
    {
      id: 3,
      nome: 'Renata Akemi',
      turma: '9º A',
      pontos: {
        total: 2650,
        aula: 1350,
        saude: 750,
        presenca: 550
      },
      posicao: 3,
      avatar: '👦',
      nivel: 'Prata'
    },
    {
      id: 4,
      nome: 'Ana Oliveira',
      turma: '7º C',
      pontos: {
        total: 2480,
        aula: 1200,
        saude: 880,
        presenca: 400
      },
      posicao: 4,
      avatar: '👧',
      nivel: 'Prata'
    },
    {
      id: 5,
      nome: 'Carlos Lima',
      turma: '8º A',
      pontos: {
        total: 2350,
        aula: 1100,
        saude: 700,
        presenca: 550
      },
      posicao: 5,
      avatar: '👦',
      nivel: 'Bronze'
    },
    {
      id: 6,
      nome: 'Lucia Ferreira',
      turma: '9º B',
      pontos: {
        total: 2280,
        aula: 1050,
        saude: 830,
        presenca: 400
      },
      posicao: 6,
      avatar: '👧',
      nivel: 'Bronze'
    },
    {
      id: 7,
      nome: 'Rafael Souza',
      turma: '8º C',
      pontos: {
        total: 2180,
        aula: 950,
        saude: 730,
        presenca: 500
      },
      posicao: 7,
      avatar: '👦',
      nivel: 'Bronze'
    }
  ];

  const getPodiumIcon = (posicao) => {
    switch (posicao) {
      case 1:
        return <Crown size={24} className="text-yellow-500" />;
      case 2:
        return <Medal size={24} className="text-gray-400" />;
      case 3:
        return <Trophy size={24} className="text-orange-600" />;
      default:
        return <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">{posicao}</div>;
    }
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'Ouro':
        return 'bg-yellow-100 text-yellow-800';
      case 'Prata':
        return 'bg-gray-100 text-gray-800';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredData = rankingData.filter(item => {
    if (filterType === 'geral') return true;
    if (filterType === 'turma') return item.turma === '9º A'; // Exemplo
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            
            <h1 className="text-xl font-semibold">Ranking Geral</h1>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 hover:bg-white/30 transition-colors">
              <img 
                src="/Liana-foto.png" 
                alt="Foto do usuário" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-blue-100 font-medium">Liana</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-blue-100">Competição entre todos os alunos da escola</p>
          <button 
           onClick={() => window.location.href = '/'}
            className="text-blue-100 text-sm hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all duration-200 border border-blue-200/30 hover:border-white/40"
          >
            Landing Page
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="p-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="geral">Ranking Geral</option>
                <option value="turma">Minha Turma</option>
                <option value="serie">Por Série</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bimestre">Este Bimestre</option>
                <option value="mes">Este Mês</option>
                <option value="semana">Esta Semana</option>
                <option value="ano">Ano Letivo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card Histórico & Progresso */}
        <div 
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-sm cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-colors" 
          onClick={() => window.location.href = '/rankingGeral/historico&progresso'}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <BarChart3 size={24} />
              <div>
                <h3 className="text-lg font-semibold">Histórico & Progresso</h3>
                <p className="text-blue-100 text-sm">Veja sua evolução detalhada e metas</p>
              </div>
            </div>
            <ChevronRight size={24} />
          </div>
        </div>

        {/* Pódio Top 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Top 3 SuperAtivos
          </h3>
          
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* 2º Lugar */}
            {filteredData[1] && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-2xl mb-2">
                  {filteredData[1].avatar}
                </div>
                <div className="bg-gray-400 text-white px-3 py-6 rounded-t-lg text-center min-w-[80px]">
                  <div className="text-xs font-medium mb-1">{filteredData[1].nome.split(' ')[0]}</div>
                  <div className="text-lg font-bold">{filteredData[1].pontos.total}</div>
                  <Medal size={20} className="mx-auto mt-1" />
                </div>
              </div>
            )}

            {/* 1º Lugar */}
            {filteredData[0] && (
              <div className="flex flex-col items-center">
                <Crown size={24} className="text-yellow-500 mb-2" />
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl mb-2">
                  {filteredData[0].avatar}
                </div>
                <div className="bg-yellow-500 text-white px-4 py-8 rounded-t-lg text-center min-w-[90px]">
                  <div className="text-xs font-medium mb-1">{filteredData[0].nome.split(' ')[0]}</div>
                  <div className="text-xl font-bold">{filteredData[0].pontos.total}</div>
                  <Trophy size={24} className="mx-auto mt-1" />
                </div>
              </div>
            )}

            {/* 3º Lugar */}
            {filteredData[2] && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl mb-2">
                  {filteredData[2].avatar}
                </div>
                <div className="bg-orange-600 text-white px-3 py-4 rounded-t-lg text-center min-w-[80px]">
                  <div className="text-xs font-medium mb-1">{filteredData[2].nome.split(' ')[0]}</div>
                  <div className="text-lg font-bold">{filteredData[2].pontos.total}</div>
                  <Trophy size={18} className="mx-auto mt-1" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lista Completa */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Classificação Completa</h3>
          
          <div className="space-y-3">
            {filteredData.map((aluno, index) => (
              <div key={aluno.id} className={`p-4 rounded-lg border transition-all ${
                aluno.posicao <= 3 
                  ? 'border-yellow-200 bg-yellow-50' 
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getPodiumIcon(aluno.posicao)}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-lg">
                        {aluno.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{aluno.nome}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          {aluno.turma}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getNivelColor(aluno.nivel)}`}>
                            {aluno.nivel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">{aluno.pontos.total}</div>
                    <div className="text-xs text-gray-500">pontos totais</div>
                  </div>
                </div>

                {/* Detalhamento dos Pontos */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{aluno.pontos.aula}</div>
                      <div className="text-gray-500">Aula</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{aluno.pontos.saude}</div>
                      <div className="text-gray-500">Saúde</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">{aluno.pontos.presenca}</div>
                      <div className="text-gray-500">Presença</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target size={20} />
            Estatísticas do Período
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">2.850</div>
              <div className="text-sm text-blue-700">Maior Pontuação</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">2.247</div>
              <div className="text-sm text-green-700">Média Geral</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <div className="text-sm text-orange-700">Alunos Ativos</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">23</div>
              <div className="text-sm text-purple-700">Turmas</div>
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

export default RankingScreen;
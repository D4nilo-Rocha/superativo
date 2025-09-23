'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, User, Calendar, ChevronLeft, ChevronRight, TrendingUp, BookOpen, Trophy, Users, Edit2 } from 'lucide-react';

const TurmaScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 17)); 

  const activities = [
    { id: 1, title: 'List item', progress: 100, type: 'completed' },
    { id: 2, title: 'List item', progress: 100, type: 'completed' },
    { id: 3, title: 'List item', progress: 100, type: 'completed' },
    { id: 4, title: 'List item', progress: 100, type: 'pending' },
    { id: 5, title: 'List item', progress: 100, type: 'pending' },
    { id: 6, title: 'List item', progress: 100, type: 'pending' },
    { id: 7, title: 'List item', progress: 100, type: 'pending' },
    { id: 8, title: 'List item', progress: 100, type: 'pending' },
    { id: 9, title: 'List item', progress: 100, type: 'pending' },
    { id: 10, title: 'List item', progress: 100, type: 'pending' }
  ];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 17;
      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center text-sm cursor-pointer rounded-full ${
            isToday 
              ? 'bg-blue-500 text-white font-semibold' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 relative rounded-b-3xl">
        {/* Logo centralizada */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 h- w- z-0">
          <Image
            src="/logo-superativo2.png"
            alt="Logo Super Ativo"
            width={256}
            height={80}
            className="h-full w-full object-fill drop-shadow-[0_10px_5px_rgba(0,123,255,0.8)]"
          />
        </div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Minha Turma - Aluno</h1>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-blue-100 text-sm hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all duration-200 border border-blue-200/30 hover:border-white/40"
          >
            Landing Page
          </button>
        </div>
        
        {/* Profile Section */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="/Aiimé-foto.jpg" 
              alt="Foto da Turma" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Turma X</h2>
            <p className="text-blue-100 text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ut massa mi
            </p>
          </div>

          <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Activities List */}
        <div className="mb-8">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'completed' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <span className={`text-sm ${
                        activity.type === 'completed' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-800 font-medium">{activity.title}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{activity.progress}%</span>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Calendário de Aulas</h3>
            <h2 className="text-xl font-semibold text-gray-800">Ter, 8 Ago</h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div 
                key={day + index} 
                className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
            {renderCalendar()}
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

          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <span className="text-xs text-blue-500 font-medium">Minha Turma</span>
          </div>

          <div onClick={() => window.location.href = '/perfil'} className="flex flex-col items-center gap-1 cursor-pointer">
            <Trophy size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Meu Perfil</span>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default TurmaScreen;

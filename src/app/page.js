'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, FileText, Clapperboard } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      {/* Header Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Educação Física Conectada</h1>
        <div className="flex gap-8">
          <Link href="/homescreen" className="hover:text-blue-200 transition-colors">Home</Link>
          <Link href="/rankingGeral" className="hover:text-blue-200 transition-colors">Ranking</Link>
          <Link href="/turma" className="hover:text-blue-200 transition-colors">Minha Turma</Link>
          <Link href="/perfil" className="hover:text-blue-200 transition-colors">Meu Perfil</Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 relative">
        {/* Central Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-17 h-20 w-40 z-0 ">
          <Image
            src="/logo-superativo2.png" // Coloque a imagem na pasta public
            alt="Logo Super Ativo"
            className="h-full w-full object-fill drop-shadow-[0_10px_5px_rgba(255,165,0,0.95)]"
            width={256}   // largura real, não afeta object-fill
            height={80}   // altura real, não afeta object-fill
          />
        </div>

        {/* Main Content - Mensagem de Impacto */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-7xl font-bold mb-6">
            Transforme a Educação Física na sua escola
          </h1>
          <p className="text-2xl mb-12 text-blue-100">
            Inspire, motive e conecte alunos através de tecnologia e esporte.
          </p>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Últimos Rankings Card */}
          <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
            <div className="bg-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Últimos rankings</h3>
            <p className="text-gray-900 text-lg leading-relaxed">
              Veja os rankings atualizados da sua turma
            </p>
          </div>

          {/* Notícias Esportivas Card */}
          <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
            <div className="bg-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Notícias Esportivas</h3>
            <p className="text-gray-900 text-lg leading-relaxed">
              Acompanhe as novidades do esporte
            </p>
          </div>

          {/* Filmes & Séries Card */}
          <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
            <div className="bg-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clapperboard size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Filmes & Séries</h3>
            <p className="text-gray-900 text-lg leading-relaxed">
              Dicas de conteúdos para aprender se divertindo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

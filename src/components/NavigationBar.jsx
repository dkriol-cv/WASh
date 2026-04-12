import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationBar({ 
  canAdvance, 
  handleNext, 
  handlePrev, 
  isFirst, 
  isLast,
  currentGlobalSlide,
  totalGlobalSlides
}) {
  return (
    <footer className="h-16 sm:h-20 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] shrink-0 flex items-center justify-between px-4 sm:px-8 z-20">
      <button 
        onClick={handlePrev} 
        disabled={isFirst}
        className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded transition-all duration-200 font-bold ${
          isFirst 
            ? 'opacity-50 cursor-not-allowed text-gray-400 bg-gray-100' 
            : 'text-[#0f1f36] bg-[#3ac4ee]/10 hover:bg-[#3ac4ee]/20 border border-[#3ac4ee]'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        Anterior
      </button>

      {/* Slide Counter */}
      <div className="flex flex-col items-center">
        <div className="text-[10px] font-black uppercase tracking-widest text-[#3ac4ee] mb-1">Progresso</div>
        <div className="bg-[#0f1f36] text-[#fdec00] px-4 py-1 rounded-full font-black text-sm border-2 border-[#fdec00] shadow-sm">
          {currentGlobalSlide} - {totalGlobalSlides}
        </div>
      </div>

      <button 
        onClick={handleNext} 
        disabled={isLast || !canAdvance}
        className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded transition-all duration-200 font-bold ${
          (isLast || !canAdvance)
            ? 'opacity-50 cursor-not-allowed text-gray-400 bg-gray-100' 
            : 'text-[#0f1f36] bg-[#fdec00] hover:bg-[#eedb00] shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        Seguinte
        <ChevronRight className="w-5 h-5" />
      </button>
    </footer>
  );
}

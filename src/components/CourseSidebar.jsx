import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { modulesData } from '../data/courseData';

export default function CourseSidebar({ 
  isOpen, 
  onClose, 
  currentModuleId, 
  currentSlideInModule,
  maxUnlockedModule, 
  maxUnlockedSlide,
  onSelectSlide 
}) {
  const [expandedModules, setExpandedModules] = useState([currentModuleId]);

  const toggleModule = (id) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[280px] sm:max-w-md bg-white text-[#0f1f36] shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-[#0f1f36] text-white flex items-center justify-between border-b-4 border-[#fdec00] shrink-0">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">Caminho de Aprendizagem</h2>
                <p className="text-[10px] text-[#3ac4ee] font-bold uppercase tracking-widest mt-1">Navegação Detalhada</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fechar Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Module List with Slides */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {modulesData.map((module) => {
                const isUnlocked = module.id <= maxUnlockedModule;
                const isExpanded = expandedModules.includes(module.id);
                const isActive = module.id === currentModuleId;

                return (
                  <div key={module.id} className="space-y-2">
                    {/* Module Header Button */}
                    <button
                      disabled={!isUnlocked}
                      onClick={() => toggleModule(module.id)}
                      className={`w-full text-left p-4 rounded-[var(--brand-radius-sm)] border-2 transition-all flex items-center gap-3 relative overflow-hidden ${
                        isActive 
                          ? 'border-[#3ac4ee] bg-[#3ac4ee]/5' 
                          : isUnlocked 
                            ? 'border-gray-100 hover:border-gray-300 bg-gray-50/50' 
                            : 'border-gray-50 bg-gray-50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#3ac4ee]" />}
                      
                      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-black text-xs ${
                        isActive ? 'bg-[#3ac4ee] text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {module.id}
                      </div>

                      <div className="flex-1">
                        <h3 className={`font-bold text-sm ${isActive ? 'text-[#0f1f36]' : 'text-gray-600'}`}>
                          {module.title}
                        </h3>
                      </div>

                      <div className="shrink-0">
                        {!isUnlocked ? (
                          <Lock className="w-4 h-4 text-gray-300" />
                        ) : (
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        )}
                      </div>
                    </button>

                    {/* Slides Sub-menu */}
                    <AnimatePresence>
                      {isExpanded && isUnlocked && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-1 ml-4 border-l-2 border-gray-100 pl-4"
                        >
                          {module.slides.map((slide) => {
                            const isCurrentSlide = isActive && slide.id === currentSlideInModule;
                            const isSlideUnlocked = isActive 
                              ? slide.id <= maxUnlockedSlide 
                              : module.id < maxUnlockedModule;

                            return (
                              <button
                                key={slide.id}
                                disabled={!isSlideUnlocked}
                                onClick={() => onSelectSlide(module.id, slide.id)}
                                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between group ${
                                  isCurrentSlide 
                                    ? 'text-[#3ac4ee] bg-[#3ac4ee]/10' 
                                    : isSlideUnlocked 
                                      ? 'text-gray-500 hover:text-[#0f1f36] hover:bg-gray-50'
                                      : 'text-gray-300 cursor-not-allowed'
                                }`}
                              >
                                <span className="truncate flex items-center gap-2">
                                  {!isSlideUnlocked && <Lock className="w-3 h-3" />}
                                  {slide.id}. {slide.title}
                                </span>
                                {isCurrentSlide && <ChevronRight className="w-3 h-3 shrink-0" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Global Progress Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] font-black uppercase text-gray-400">Progresso Geral</span>
                 <span className="text-sm font-black text-[#3ac4ee]">
                    {Math.round(((maxUnlockedModule - 1 + (currentSlideInModule / modulesData[currentModuleId-1]?.slidesCount || 0)) / modulesData.length * 100))}%
                 </span>
               </div>
               <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (maxUnlockedModule / modulesData.length) * 100)}%` }}
                    className="h-full bg-[#fdec00] shadow-[0_0_8px_rgba(253,236,0,0.5)]" 
                  />
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


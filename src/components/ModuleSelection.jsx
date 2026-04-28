import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle2, Droplets, Home, Layout, BookOpen, BarChart3, HelpCircle } from 'lucide-react';
import { modulesData } from '../data/courseData';

const moduleIcons = {
  1: Droplets,
  2: Layout,
  3: BookOpen,
  4: BarChart3,
  5: HelpCircle
};

export default function ModuleSelection({ maxUnlockedModule, onSelectModule, resumeModuleId, resumeSlideId }) {
  return (
    <div className="h-full flex flex-col py-6">
      <div className="text-center mb-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black text-[#fdec00] uppercase tracking-tight mb-2"
        >
          Escolha o seu Módulo
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 font-medium"
        >
          Siga a sequência para desbloquear todo o conhecimento
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full px-4">
        {modulesData.map((module, index) => {
          const isUnlocked = module.id <= maxUnlockedModule;
          const isResume = module.id === resumeModuleId && resumeSlideId > 1;
          const Icon = moduleIcons[module.id] || Droplets;
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                disabled={!isUnlocked}
                onClick={() => onSelectModule(module.id)}
                className={`relative w-full h-full group p-8 rounded-[var(--brand-radius)] border-4 transition-all flex flex-col items-center text-center overflow-hidden h-[320px] ${
                  isUnlocked 
                    ? 'bg-white border-[#fdec00] hover:border-[#3ac4ee] hover:-translate-y-2 shadow-xl' 
                    : 'bg-white/10 border-white/10 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors ${isUnlocked ? 'bg-[#3ac4ee]' : 'bg-gray-400'}`} />
                
                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${
                  isUnlocked ? 'bg-[#0f1f36] text-[#fdec00]' : 'bg-white/10 text-white/50'
                }`}>
                  <Icon className="w-10 h-10" />
                </div>

                <div className="flex-1">
                  <h3 className={`text-xl font-black uppercase leading-tight mb-3 ${isUnlocked ? 'text-[#0f1f36]' : 'text-white/50'}`}>
                    {module.title}
                  </h3>
                  <p className={`text-sm font-medium ${isUnlocked ? 'text-gray-500' : 'text-white/30'}`}>
                    {module.slidesCount} Lições Interativas
                  </p>
                </div>

                {/* Status / Button */}
                <div className="mt-auto w-full pt-6">
                  {isUnlocked ? (
                    <div className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-colors ${
                      isResume
                        ? 'bg-[#fdec00] text-[#0f1f36] group-hover:bg-[#3ac4ee] group-hover:text-white'
                        : 'bg-[#0f1f36] text-white group-hover:bg-[#3ac4ee]'
                    }`}>
                      {isResume ? (
                        <><span>Retomar · Lição {resumeSlideId}</span><Play className="w-3 h-3 fill-current" /></>
                      ) : (
                        <><span>Entrar na Aventura</span><Play className="w-3 h-3 fill-white" /></>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-white/30 py-3 rounded-xl font-bold uppercase text-xs tracking-widest border border-white/10">
                      <Lock className="w-4 h-4" />
                      <span>Bloqueado</span>
                    </div>
                  )}
                </div>

                {!isUnlocked && (
                   <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto pt-10 text-center">
         <button 
           onClick={() => onSelectModule(0)} // Return to welcome
           className="text-white/50 hover:text-white flex items-center gap-2 mx-auto font-bold uppercase text-xs tracking-widest transition-colors"
         >
           <Home className="w-4 h-4" />
           Voltar ao Início
         </button>
      </div>
    </div>
  );
}

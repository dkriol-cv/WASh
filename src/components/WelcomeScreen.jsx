import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, BookOpen, RotateCcw, ChevronRight } from 'lucide-react';
import { modulesData } from '../data/courseData';

export default function WelcomeScreen({ onStart, onResume, onStartFresh, resumeInfo }) {
  const hasResume = !!onResume && !!resumeInfo;

  const getResumeLabel = () => {
    if (!resumeInfo) return '';
    const mod = modulesData.find(m => m.id === resumeInfo.moduleId);
    const slide = mod?.slides?.find(s => s.id === resumeInfo.slideId);
    return `Módulo ${resumeInfo.moduleId}${slide ? ` · ${slide.title}` : ''}`;
  };

  return (
    <div className="flex flex-col items-center justify-between h-full py-8 px-6 text-center">

      {/* Hero */}
      <motion.div
        className="relative w-48 h-48 sm:w-64 sm:h-64 mb-4"
        animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="./assets/Heroi Wash-01.png"
          alt="Herói WASH"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-black/20 blur-xl rounded-full" />
      </motion.div>

      {/* Title */}
      <div className="max-w-2xl mb-6">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src="./assets/AVENTURA_WASH_LOGO.png"
          alt="Aventura WASH"
          className="h-20 sm:h-28 mx-auto mb-4 object-contain"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-3xl font-black text-[#fdec00] uppercase tracking-tighter drop-shadow-md mb-3"
        >
          Bem-vindo à Jornada "Escola Amiga do WASH"!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg font-medium text-white/80 leading-relaxed"
        >
          Transforme a sua escola num ambiente mais saudável, seguro e digno.
          Aprenda os pilares de Água, Saneamento e Higiene.
        </motion.p>
      </div>

      {/* Action buttons */}
      <AnimatePresence mode="wait">
        {hasResume ? (
          /* ── Returning user ── */
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-sm flex flex-col gap-3"
          >
            {/* Resume banner */}
            <div className="bg-white/10 border-2 border-[#fdec00]/40 rounded-2xl p-4 text-left flex items-center gap-3">
              <BookOpen className="text-[#fdec00] shrink-0 w-5 h-5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#fdec00]/70 mb-0.5">
                  Progresso guardado
                </p>
                <p className="text-sm font-bold text-white leading-tight truncate">
                  {getResumeLabel()}
                </p>
              </div>
            </div>

            {/* Continue button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onResume}
              className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#fdec00] text-[#0f1f36] rounded-full font-black text-lg uppercase tracking-wide shadow-[0_0_20px_rgba(253,236,0,0.3)] hover:shadow-[0_0_30px_rgba(253,236,0,0.5)] transition-all"
            >
              <Play className="fill-[#0f1f36] w-5 h-5" />
              Continuar
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Start fresh link */}
            <button
              onClick={onStartFresh}
              className="flex items-center justify-center gap-2 text-white/50 hover:text-white/80 font-bold text-sm transition-colors py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Recomeçar do início
            </button>
          </motion.div>
        ) : (
          /* ── First visit ── */
          <motion.button
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative flex items-center gap-3 px-10 py-5 bg-[#fdec00] text-[#0f1f36] rounded-full font-black text-xl uppercase tracking-wider shadow-[0_0_20px_rgba(253,236,0,0.3)] hover:shadow-[0_0_30px_rgba(253,236,0,0.5)] transition-all"
          >
            <span>Começar Aventura</span>
            <Play className="fill-[#0f1f36] w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

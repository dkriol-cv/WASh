import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlideContainer({ children, title, subtitle }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col bg-white rounded-[var(--brand-radius)] shadow-2xl p-6 sm:p-10 overflow-hidden"
      >
        <div className="mb-8 border-b-4 border-gray-50 pb-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-[#0f1f36] text-[#fdec00] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Capítulo Ativo</span>
               <div className="h-px flex-1 bg-gray-100" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f1f36] leading-none mb-3">{title}</h2>
            {subtitle && (
              <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3ac4ee]" />
                {subtitle}
              </div>
            )}
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="shrink-0 bg-gray-50 p-2 rounded-2xl border-2 border-gray-100 shadow-sm"
          >
            <img src="./assets/Heroi Wash-01.png" alt="Herói" className="h-16 sm:h-20 object-contain drop-shadow-md" />
          </motion.div>
        </div>
        
        <div className="flex-1 flex flex-col text-[#0f1f36] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

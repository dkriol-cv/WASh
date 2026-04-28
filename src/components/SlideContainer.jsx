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
        className="flex-1 min-h-0 flex flex-col bg-white rounded-[var(--brand-radius)] shadow-2xl p-3 sm:p-4 overflow-hidden"
      >
        <div className="mb-2 border-b-4 border-gray-50 pb-2 flex items-start justify-between shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
               <span className="bg-[#0f1f36] text-[#fdec00] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest whitespace-nowrap">Capítulo Ativo</span>
               <div className="h-px flex-1 bg-gray-100" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0f1f36] leading-tight mb-0.5 truncate">{title}</h2>
            {subtitle && (
              <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3ac4ee] shrink-0" />
                {subtitle}
              </div>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="shrink-0 bg-gray-50 p-1 rounded-2xl border-2 border-gray-100 shadow-sm ml-2"
          >
            <img src="./assets/Heroi Wash-01.png" alt="Herói" className="h-10 sm:h-12 object-contain drop-shadow-md" />
          </motion.div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col text-[#0f1f36] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

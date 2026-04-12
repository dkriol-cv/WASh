import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-between h-full py-12 px-6 text-center">
      {/* Floating Hero Section */}
      <motion.div 
        className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [-1, 1, -1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <img 
          src="./assets/Heroi Wash-01.png" 
          alt="Herói WASH" 
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-xl rounded-full" />
      </motion.div>

      {/* Title & Description */}
      <div className="max-w-3xl mb-12">
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src="./assets/AVENTURA_WASH_LOGO.png" 
          alt="Aventura WASH" 
          className="h-24 sm:h-32 mx-auto mb-6 object-contain"
        />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-4xl font-black text-[#fdec00] uppercase tracking-tighter drop-shadow-md mb-4"
        >
          Bem-vindo à Jornada "Escola Amiga do WASH"!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl font-medium text-white/90 leading-relaxed"
        >
          Prepare-se para transformar a sua escola num ambiente mais saudável, 
          seguro e digno para todos. Vamos aprender juntos os pilares de Água, Saneamento e Higiene.
        </motion.p>
      </div>

      {/* Start Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative flex items-center gap-3 px-10 py-5 bg-[#fdec00] text-[#0f1f36] rounded-full font-black text-xl uppercase tracking-wider shadow-[0_0_20px_rgba(253,236,0,0.3)] hover:shadow-[0_0_30px_rgba(253,236,0,0.5)] transition-all"
      >
        <span>Começar Aventura</span>
        <Play className="fill-[#0f1f36] w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}

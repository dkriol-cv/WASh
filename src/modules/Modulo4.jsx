import React, { useState, useEffect } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, BarChart3, ClipboardList, Target, HardHat, 
  Handshake, Users2, Trophy, ArrowRight, CheckCircle, 
  PieChart, Activity
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function Modulo4({ currentSlide, onSlideComplete }) {
  const [planoAcao, setPlanoAcao] = useState({ prob: '', acao: '', tempo: '' });

  useEffect(() => {
    onSlideComplete();
  }, [currentSlide, onSlideComplete]);

  const renderSlide1 = () => (
    <SlideContainer title="4.1 Manutenção e Gestão" subtitle="Garantindo a Durabilidade dos Serviços">
       <div className="h-full flex flex-col gap-10">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row gap-8 items-center">
             <motion.div variants={itemVariants} className="flex-1 space-y-6">
                <p className="text-xl text-gray-400 font-bold italic leading-tight">
                   "Uma casa de banho construída é 10% do trabalho. Mantê-la funcional todos os dias é os outros 90%."
                </p>
                <div className="bg-[#3ac4ee]/10 border-l-[12px] border-[#3ac4ee] p-8 rounded-2xl">
                   <h4 className="text-[#0f1f36] font-black text-2xl uppercase italic mb-2">Compromisso Escolar</h4>
                   <p className="text-[#0f1f36] font-medium text-lg leading-relaxed">
                      A gestão eficaz exige o envolvimento da Direção, Professores, Alunos e Comunidade. Sem um plano de manutenção, o investimento perde-se rapidamente.
                   </p>
                </div>
             </motion.div>
             <motion.div variants={itemVariants} className="shrink-0 w-64 h-64 bg-gray-50 rounded-[4rem] flex items-center justify-center border-4 border-dashed border-gray-200">
                <PieChart className="w-32 h-32 text-gray-200" />
             </motion.div>
          </motion.div>
       </div>
    </SlideContainer>
  );

  const renderSlide2 = () => (
    <SlideContainer title="4.2 Indicadores de Monitorização" subtitle="Transformando Dados em Ação">
       <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-8">
          <motion.div variants={itemVariants} className="bg-[#fdec00] text-[#0f1f36] font-black text-2xl p-8 text-center rounded-[3rem] shadow-xl border-4 border-white transform rotate-1">
             <Activity className="mx-auto mb-2" />
             "Monitorizar não é fiscalizar: é cuidar para proteger a saúde de todos."
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { t: 'Funcionalidade', d: 'Descargas ok? Há avarias visíveis?', i: HardHat },
               { t: 'Disponibilidade', d: 'Há sabão e papel suficientes?', i: ClipboardList },
               { t: 'Uso Prático', d: 'Os alunos lavam as mãos no lanche?', i: Users2 },
               { t: 'Limpeza Diária', d: 'A escala está preenchida hoje?', i: CheckCircle }
             ].map((ind, i) => {
               const Icon = ind.i;
               return (
                 <motion.div 
                   key={i} 
                   variants={itemVariants}
                   whileHover={{ y: -10 }}
                   className="p-8 rounded-[2rem] bg-white border-4 border-gray-50 shadow-lg flex flex-col items-center text-center group hover:border-[#3ac4ee] transition-all"
                 >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-[#3ac4ee] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                       <Icon />
                    </div>
                    <h4 className="font-black text-xl italic text-[#0f1f36] uppercase tracking-tighter mb-2 leading-none">{ind.t}</h4>
                    <p className="text-sm font-bold text-gray-400 leading-tight">{ind.d}</p>
                 </motion.div>
               );
             })}
          </div>
       </motion.div>
    </SlideContainer>
  );

  const renderSlide3 = () => (
     <SlideContainer title="4.3 Miniplano de Ação" subtitle="Passos Simples para Soluções Reais">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-8">
           <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium">Um plano eficaz é direto e foca-se no mais <span className="text-[#0f1f36] font-black underline decoration-[#3ac4ee] decoration-4">Urgente</span>.</motion.p>
           
           <motion.div variants={itemVariants} className="bg-[#0f1f36] p-10 rounded-[3rem] text-white shadow-2xl relative border-t-8 border-[#fdec00]">
              <div className="space-y-6">
                 {[
                   { q: '1. Problema Prioritário', f: 'prob', o: [
                      {v:'trincos', t: 'Falta de trincos (Privacidade)'},
                      {v:'sabao', t: 'Reposição irregular de sabão'},
                      {v:'limpeza', t: 'Rotina de limpeza não cumprida'}
                   ]},
                   { q: '2. Ação Imediata', f: 'acao', o: [
                      {v:'reparos', t: 'Agendar reparos técnicos'},
                      {v:'escala', t: 'Criar escala visível e lúdica'},
                      {v:'direção', t: 'Alocar orçamento na Direção'}
                   ]},
                   { q: '3. Prazo de Execução', f: 'tempo', o: [
                      {v:'1s', t: '1 Semana'},
                      {v:'1m', t: '1 Mês'},
                      {v:'peri', t: 'Até final do período'}
                   ]}
                 ].map((field, i) => (
                    <div key={i}>
                       <label className="text-[#fdec00] font-black uppercase text-xs tracking-widest mb-2 block">{field.q}</label>
                       <div className="relative group">
                          <select 
                             className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white font-bold outline-none focus:border-[#3ac4ee] transition-all appearance-none cursor-pointer"
                             onChange={(e) => setPlanoAcao(p=>({...p, [field.f]: e.target.value}))}
                          >
                             <option value="" className="text-black">Selecione...</option>
                             {field.o.map(opt => <option key={opt.v} value={opt.v} className="text-black">{opt.t}</option>)}
                          </select>
                          <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-[#3ac4ee]" />
                       </div>
                    </div>
                ))}
              </div>
           </motion.div>
           
           <AnimatePresence>
              {planoAcao.prob && planoAcao.acao && planoAcao.tempo && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                   className="mt-auto bg-green-500 text-[#0f1f36] p-6 rounded-2xl flex items-center justify-between shadow-xl"
                 >
                    <div className="flex items-center gap-4">
                       <CheckCircle className="w-8 h-8" />
                       <span className="font-black uppercase tracking-tight italic">Miniplano Estruturado! Siga para a conclusão.</span>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </motion.div>
     </SlideContainer>
  );

  const renderSlide4 = () => (
     <SlideContainer title="4.4 Sustentabilidade" subtitle="Parcerias que Fortalecem a Escola">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-6">
           {[
             { t: 'Sociedade Civil', i: Handshake, c: 'bg-[#0f1f36] text-white', a: 'Envolva as famílias nas campanhas de higiene.' },
             { t: 'Redes Locais', i: Target, c: 'bg-white text-[#0f1f36] border-gray-100', a: 'Empresas e Delegacias de Saúde como aliadas.' },
             { t: 'WASH Clubes', i: Trophy, c: 'bg-[#3ac4ee] text-[#0f1f36]', a: 'Alunos como fiscais do desperdício e uso correto.' }
           ].map((item, i) => {
             const Icon = item.i;
             return (
               <motion.div 
                 key={i} 
                 variants={itemVariants}
                 whileHover={{ x: 10 }}
                 className={`p-10 rounded-[3rem] border-4 shadow-2xl flex gap-8 items-center ${item.c}`}
               >
                  <div className={`w-16 h-16 rounded-2xl ${item.c.includes('bg-white') ? 'bg-[#3ac4ee] text-white' : 'bg-white/10 text-white'} flex items-center justify-center shrink-0 shadow-lg`}>
                     <Icon className="w-8 h-8" />
                  </div>
                  <div>
                     <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-1">{item.t}</h4>
                     <p className="font-bold opacity-80 leading-tight">{item.a}</p>
                  </div>
               </motion.div>
             );
           })}
        </motion.div>
     </SlideContainer>
  );

  const renderSlide5 = () => (
     <SlideContainer title="4.5 Compromisso Final" subtitle="O Fim é o Apenas o Começo">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-full flex flex-col items-center justify-center text-center">
           <motion.div variants={itemVariants} className="relative mb-10 group">
              <img 
                src="./assets/WASH-Cover-01.jpg" 
                alt="Conclusão" 
                className="w-full max-w-xl rounded-[4rem] border-8 border-white shadow-2xl h-80 object-cover transform -rotate-1 group-hover:rotate-0 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-[#3ac4ee]/10 rounded-[4rem] mix-blend-multiply" />
              <div className="absolute -bottom-6 -right-6 bg-[#fdec00] text-[#0f1f36] p-6 rounded-3xl shadow-2xl font-black uppercase text-xl transform rotate-3 flex items-center gap-2">
                 <Target /> 100% Pronto
              </div>
           </motion.div>
           
           <motion.h3 variants={itemVariants} className="text-4xl font-black text-[#0f1f36] uppercase tracking-tighter italic mb-4 leading-none">
              O seu compromisso diário <br/>transforma o futuro!
           </motion.h3>
           
           <motion.p variants={itemVariants} className="text-xl text-gray-500 font-bold mb-10 max-w-2xl leading-snug">
              Parabéns por concluir a jornada de aprendizagem. Agora, prove o seu conhecimento no **Quiz Final**.
           </motion.p>
           
           <motion.div variants={itemVariants} className="bg-green-100 text-green-800 p-8 rounded-[2rem] border-4 border-dashed border-green-300 flex gap-6 items-center shadow-inner">
              <BarChart3 className="shrink-0 w-10 h-10" />
              <p className="text-left font-bold text-lg leading-tight">
                 Atenção: A certificação requer 70% de acerto. <br/>
                 Respire fundo e mostre o que aprendeu!
              </p>
           </motion.div>
        </motion.div>
     </SlideContainer>
  );

  return (
    <AnimatePresence mode="wait">
      <div key={currentSlide} className="h-full flex flex-col">
        {currentSlide === 1 && renderSlide1()}
        {currentSlide === 2 && renderSlide2()}
        {currentSlide === 3 && renderSlide3()}
        {currentSlide === 4 && renderSlide4()}
        {currentSlide === 5 && renderSlide5()}
      </div>
    </AnimatePresence>
  );
}

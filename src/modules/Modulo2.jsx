import React, { useState, useEffect } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench, Pipette, Droplets, Users, ShieldAlert, Heart,
  CheckCircle2, Trash2, ShieldCheck, ClipboardCheck,
  Droplet, ChevronRight, Star, HelpCircle
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export default function Modulo2({ currentSlide, setCanAdvance }) {
  const [ghmChecklist, setGhmChecklist] = useState({ 1: false, 2: false, 3: false });
  const [panelView, setPanelView] = useState(0);

  useEffect(() => {
    if (currentSlide === 1) setCanAdvance(true);
    else if (currentSlide === 2) setCanAdvance(panelView >= 4);
    else if (currentSlide === 3) setCanAdvance(Object.values(ghmChecklist).every(Boolean));
    else if (currentSlide === 4) setCanAdvance(true);
    else if (currentSlide === 5) setCanAdvance(true);
    else if (currentSlide === 6) setCanAdvance(true);
    else setCanAdvance(true);
  }, [currentSlide, panelView, ghmChecklist, setCanAdvance]);

  const renderSlide1 = () => (
    <SlideContainer title="2.1 Diagnóstico das Instalações" subtitle="Metas e Padrões de Qualidade">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full">
        <motion.p variants={itemVariants} className="text-base mb-4 text-gray-500 font-medium">
          Uma <span className="text-[#0f1f36] font-black underline decoration-[#fdec00] decoration-4">Escola Amiga do WASH</span> garante saúde e dignidade através de infraestrutura adequada.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { t: 'Sanitas', d: '1 / 25 raparigas\n1 / 50 rapazes', i: Trash2, c: 'bg-[#fdec00]', tc: 'text-[#0f1f36]' },
             { t: 'Água', d: '1 ponto / 12-20 alunos', i: Droplets, c: 'bg-[#3ac4ee]', tc: 'text-[#0f1f36]' },
             { t: 'Lavatórios', d: '1 ponto / 8-15 alunos', i: Users, c: 'bg-white', tc: 'text-[#0f1f36]' }
           ].map((box, i) => {
             const Icon = box.i;
             return (
               <motion.div
                 key={i}
                 variants={itemVariants}
                 whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                 className={`p-5 rounded-[var(--brand-radius)] border-4 border-[#0f1f36] shadow-xl ${box.c} ${box.tc} flex flex-col items-center text-center`}
               >
                  <div className="w-12 h-12 rounded-2xl bg-[#0f1f36] text-white flex items-center justify-center mb-3 shadow-lg">
                     <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black mb-2 uppercase tracking-tighter italic">{box.t}</h4>
                  <p className="text-base font-bold leading-tight whitespace-pre-line opacity-80">{box.d}</p>
               </motion.div>
             );
           })}
        </div>

        <motion.div variants={itemVariants} className="mt-auto bg-[#0f1f36] text-white p-4 rounded-2xl border-l-[8px] border-[#3ac4ee] shadow-2xl flex gap-4 items-center mt-4">
           <div className="bg-[#3ac4ee] p-2 rounded-xl text-[#0f1f36] shrink-0"><ShieldAlert className="w-5 h-5" /></div>
           <p className="font-bold text-sm">
              <strong>Nota Técnica:</strong> Deve haver sempre pelo menos 1 ponto de lavagem das mãos por cada sanita e acesso 100% inclusivo.
           </p>
        </motion.div>
      </motion.div>
    </SlideContainer>
  );

  const renderSlide2 = () => {
    const items = [
       { id: 1, title: 'Fonte de Água', desc: 'Segura, potável e livre de bactérias.', icon: Droplet },
       { id: 2, title: 'Armazenamento', desc: 'Reservatórios vedados e higienizados.', icon: ShieldCheck },
       { id: 3, title: 'Tratamento', desc: 'Cloro residual entre 0,5 e 1,0 mg/L.', icon: Pipette },
       { id: 4, title: 'Insumos', desc: 'Sabão e papel sempre disponíveis.', icon: Heart }
    ];
    return (
      <SlideContainer title="2.2 O Coração da Escola WASH" subtitle="Vitalidade e Sustentabilidade">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-base text-gray-400 font-medium">
          O que é inegociável para uma escola referência. <span className="text-[#3ac4ee] font-black uppercase text-xs tracking-widest px-2 py-0.5 bg-[#3ac4ee]/10 rounded ml-1">Clique para explorar</span>
        </motion.p>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {items.map(item => {
              const Icon = item.icon;
              return (
                <motion.button
                   key={item.id}
                   variants={itemVariants}
                   whileHover={{ scale: 1.02 }}
                   onClick={() => setPanelView(Math.max(panelView, item.id))}
                   className={`p-4 rounded-[var(--brand-radius-md)] text-left border-4 transition-all flex gap-4 items-start relative overflow-hidden ${
                      panelView >= item.id
                        ? 'bg-white border-[#3ac4ee] shadow-2xl'
                        : 'bg-gray-50 border-gray-100 opacity-60'
                   }`}
                >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${panelView >= item.id ? 'bg-[#3ac4ee] text-white' : 'bg-white text-gray-300'}`}>
                      <Icon className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className={`font-black text-lg uppercase tracking-tighter italic ${panelView >= item.id ? 'text-[#0f1f36]' : 'text-gray-300'}`}>{item.title}</h4>
                      <AnimatePresence>
                         {panelView >= item.id && (
                            <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-bold text-gray-500 leading-tight text-sm">
                               {item.desc}
                            </motion.p>
                         )}
                      </AnimatePresence>
                   </div>
                   {panelView >= item.id && (
                      <div className="absolute top-2 right-2"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                   )}
                </motion.button>
              );
           })}
        </motion.div>
      </SlideContainer>
    );
  };

  const renderSlide3 = () => (
    <SlideContainer title="2.3 Higiene Menstrual (GHM)" subtitle="Privacidade e Dignidade para Todos">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full">
        <motion.p variants={itemVariants} className="text-base mb-4 text-gray-500 leading-relaxed italic">
          Garantir que as raparigas não faltem à escola é uma questão de <span className="text-[#0f1f36] font-black">Justiça e Equidade</span>.
        </motion.p>

        <motion.div variants={itemVariants} className="bg-[#0f1f36] text-white p-5 rounded-[var(--brand-radius)] shadow-2xl relative overflow-hidden border-b-8 border-[#fdec00]">
           <div className="absolute top-0 right-0 w-36 h-36 bg-[#fdec00]/5 blur-3xl rounded-full" />
           <h3 className="font-black text-lg mb-4 text-[#fdec00] uppercase italic flex items-center gap-2 tracking-tighter">
              <ClipboardCheck className="text-[#3ac4ee] w-5 h-5" />
              Checklist de Adequação
           </h3>
           <div className="space-y-4">
              {[
                { k: 1, t: 'Portas com trincos funcionais.', d: 'Segurança e Privacidade' },
                { k: 2, t: 'Lixeiras com tampa dentro da cabine.', d: 'Gestão de Resíduos' },
                { k: 3, t: 'Água e sabão na zona privada.', d: 'Higiene de Saúde' }
              ].map((item) => (
                <label key={item.k} className="flex items-center gap-4 cursor-pointer group">
                   <div className="relative shrink-0">
                      <input
                         type="checkbox"
                         checked={ghmChecklist[item.k]}
                         onChange={(e) => setGhmChecklist(p => ({...p, [item.k]: e.target.checked}))}
                         className="peer sr-only"
                      />
                      <div className="w-9 h-9 rounded-xl bg-white/10 border-2 border-white/20 peer-checked:bg-[#3ac4ee] peer-checked:border-[#3ac4ee] transition-all flex items-center justify-center">
                         {ghmChecklist[item.k] && <CheckCircle2 className="text-[#0f1f36] w-5 h-5" />}
                      </div>
                   </div>
                   <div>
                      <span className={`text-lg font-black transition-colors ${ghmChecklist[item.k] ? 'text-[#3ac4ee]' : 'text-white/70 group-hover:text-white'}`}>
                        {item.t}
                      </span>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/30">{item.d}</p>
                   </div>
                </label>
              ))}
           </div>
        </motion.div>

        <AnimatePresence>
           {Object.values(ghmChecklist).every(Boolean) && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-auto bg-[#3ac4ee]/10 text-[#0f1f36] font-black p-4 rounded-3xl text-center border-4 border-dashed border-[#3ac4ee] mt-4">
                 <Star className="mx-auto mb-1 text-[#fdec00] fill-[#fdec00] w-5 h-5" />
                 "A GHM melhora a autoestima e reduz drasticamente o abandono escolar!"
              </motion.div>
           )}
        </AnimatePresence>
      </motion.div>
    </SlideContainer>
  );

  const renderSlide4 = () => (
     <SlideContainer title="2.4 Operação e Manutenção" subtitle="A Responsabilidade é de Todos">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-4">
           <motion.p variants={itemVariants} className="text-base font-medium text-gray-500">
             Não basta construir; é preciso zelar. O WASH exige uma <span className="text-[#0f1f36] font-black">Gestão Partilhada</span>.
           </motion.p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: '1. Limpeza', d: 'Escala diária visível e respeitada.', i: Trash2, c: 'border-[#3ac4ee]' },
                { t: '2. Monitorizar', d: 'Identificar fugas e avarias hoje.', i: Wrench, c: 'border-[#fdec00]' },
                { t: '3. Reposição', d: 'Canal rápido para sabão e papel.', i: ClipboardCheck, c: 'border-[#0f1f36]' }
              ].map((box, i) => {
                const Icon = box.i;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className={`p-5 bg-white rounded-[2rem] border-t-[8px] ${box.c} shadow-2xl flex flex-col items-center text-center group`}
                  >
                     <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-[#0f1f36] group-hover:text-white transition-colors flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6" />
                     </div>
                     <h4 className="font-black text-xl mb-2 text-[#0f1f36] uppercase italic tracking-tighter">{box.t}</h4>
                     <p className="text-gray-500 font-bold leading-tight text-sm">{box.d}</p>
                  </motion.div>
                );
              })}
           </div>

           <motion.div variants={itemVariants} className="mt-auto text-center p-4 bg-gray-50 rounded-full border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Compromisso Escolar Integrado</p>
           </motion.div>
        </motion.div>
     </SlideContainer>
  );

  const renderSlide5 = () => (
     <SlideContainer title="2.5 Código de Conduta" subtitle="Pequenas Ações, Grandes Impactos">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 mt-2">
           {[
             { t: 'Lavar mãos com sabão sempre.', d: 'Prevenção de Doenças', i: Heart, c: 'bg-[#3ac4ee]' },
             { t: 'Papel higiénico sem desperdício.', d: 'Sustentabilidade', i: Star, c: 'bg-gray-400' },
             { t: 'Lixo apenas nos recipientes.', d: 'Cuidado Ambiental', i: Trash2, c: 'bg-[#fdec00]' },
             { t: 'Respeito total aos equipamentos.', d: 'Zelar pelo Patrimônio', i: ShieldCheck, c: 'bg-[#0f1f36]' }
           ].map((item, i) => {
             const Icon = item.i;
             return (
               <motion.li
                 key={i}
                 variants={itemVariants}
                 whileHover={{ x: 10 }}
                 className="list-none bg-white p-4 rounded-[var(--brand-radius-md)] border-4 border-gray-50 shadow-lg flex gap-4 items-center group hover:border-[#3ac4ee] transition-all"
               >
                  <div className={`w-12 h-12 rounded-2xl ${item.c} text-white flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform shrink-0`}>
                     <Icon className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-base font-black text-[#0f1f36] uppercase tracking-tight leading-none mb-0.5">{item.t}</h4>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-30">{item.d}</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-100 group-hover:text-[#3ac4ee] transition-colors" />
               </motion.li>
             );
           })}
        </motion.div>
     </SlideContainer>
  );

  const renderSlide6 = () => (
    <SlideContainer title="2.6 Desafio: Plano de Ação" subtitle="Do Diagnóstico à Solução">
       <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full">
          <motion.p variants={itemVariants} className="text-base font-medium text-gray-500 mb-4 leading-relaxed">
            Hora de olhar para a sua escola. <span className="text-[#0f1f36] font-black underline decoration-[#3ac4ee] decoration-4">Não ignore os sinais.</span>
          </motion.p>

          <motion.div variants={itemVariants} className="bg-[#0f1f36] p-5 rounded-[2rem] text-white shadow-2xl relative border-t-8 border-[#fdec00]">
             <div className="absolute top-3 right-6 bg-[#3ac4ee] text-[#0f1f36] px-3 py-0.5 rounded-full font-black text-[10px] uppercase tracking-widest">Workshop Prático</div>
             <h3 className="text-[#fdec00] font-black text-lg mb-3 uppercase italic flex items-center gap-2">
                <HelpCircle className="w-5 h-5" /> Exercício de Reflexão
             </h3>
             <p className="mb-4 font-bold text-white/70 italic">"Quais são os 2 problemas mais urgentes da sua escola hoje? E quais seriam as soluções?"</p>
             <textarea
               className="w-full h-28 p-4 rounded-2xl bg-white/5 border-4 border-white/10 text-white font-bold placeholder:text-white/20 focus:border-[#3ac4ee] focus:bg-white/10 outline-none transition-all shadow-inner text-sm"
               placeholder="Ex: Problema 1: Falta de trincos. Solução: Acionamento da FICASE..."
             ></textarea>
             <div className="flex items-center gap-2 mt-4">
                <ShieldCheck className="text-green-400 w-4 h-4" />
                <span className="font-black uppercase text-[10px] tracking-widest text-white/30">Reflexão para o seu Plano de Melhoria Interno</span>
             </div>
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
        {currentSlide === 6 && renderSlide6()}
      </div>
    </AnimatePresence>
  );
}

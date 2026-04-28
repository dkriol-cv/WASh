import React, { useState, useEffect } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Gamepad2, Theater, Users, Music,
  CheckCircle2, AlertCircle, Star, Sparkles, GraduationCap,
  Library, Lightbulb, HandMetal, ChevronRight,
  ShieldCheck, Droplets, Trash2, BarChart3
} from 'lucide-react';

const HAND_STEPS_ORDER = ['Palma', 'Dorso', 'Entre Dedos', 'Unhas', 'Polegar', 'Punho', 'Enxaguar'];
const HAND_STEPS_SCRAMBLED = ['Dorso', 'Unhas', 'Palma', 'Punho', 'Entre Dedos', 'Enxaguar', 'Polegar'];

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
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Modulo3({ currentSlide, setCanAdvance }) {
  const [q8Answer, setQ8Answer] = useState(null);
  const [jogoAnswer, setJogoAnswer] = useState(null);
  const [stepSlots, setStepSlots] = useState(Array(7).fill(null));
  const [dragOverSlot, setDragOverSlot] = useState(null);

  const isHandStepsCorrect = stepSlots.join(',') === HAND_STEPS_ORDER.join(',');

  useEffect(() => {
    if (currentSlide === 2) {
      setCanAdvance(jogoAnswer === 'C');
    } else if (currentSlide === 5) {
      setCanAdvance(isHandStepsCorrect);
    } else if (currentSlide === 8) {
      setCanAdvance(q8Answer === 'B');
    } else {
      setCanAdvance(true);
    }
  }, [currentSlide, q8Answer, jogoAnswer, isHandStepsCorrect, setCanAdvance]);

  const renderSlide1 = () => (
    <SlideContainer title="3.1 Materiais Educativos" subtitle="Abordagem Multidisciplinar nas Aulas">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-8">
        <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium leading-relaxed">
          O WASH integra-se em diversas áreas do currículo, transformando temas técnicos em aprendizagens <span className="text-[#3ac4ee] font-black underline decoration-4 underline-offset-4">Significativas</span>.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { t: 'Ciências', d: 'Contaminação e tratamento da água.', i: Droplets, c: 'bg-[#3ac4ee]/10 border-[#3ac4ee]' },
             { t: 'Matemática', d: 'Estimativa de resíduos e estatística.', i: BarChart3, c: 'bg-[#fdec00]/20 border-[#fdec00]' },
             { t: 'Línguas', d: 'Histórias, rimas e mensagens.', i: BookOpen, c: 'bg-gray-100 border-gray-200' },
             { t: 'Artes', d: 'Cartazes e bandas desenhadas.', i: Sparkles, c: 'bg-[#0f1f36] text-white border-[#0f1f36]' }
           ].map((sub, i) => {
             const Icon = sub.i;
             return (
               <motion.div 
                 key={i} 
                 variants={itemVariants}
                 whileHover={{ y: -10 }}
                 className={`p-6 rounded-[var(--brand-radius)] border-4 shadow-xl flex flex-col items-center text-center group ${sub.c}`}
               >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                     <Icon className={`w-6 h-6 ${sub.i === Sparkles ? 'text-[#0f1f36]' : 'text-[#3ac4ee]'}`} />
                  </div>
                  <h4 className="font-black text-xl mb-2 uppercase tracking-tight italic">{sub.t}</h4>
                  <p className="text-sm font-bold opacity-70 leading-tight">{sub.d}</p>
               </motion.div>
             );
           })}
        </div>
      </motion.div>
    </SlideContainer>
  );

  const renderSlide2 = () => {
    const passos = [
      { icon: '🎨', t: 'Materiais', d: 'Tinta lavável ou pó de giz colorido.' },
      { icon: '🤝', t: 'Ação', d: 'Um aluno aplica o pó e cumprimenta colegas em cadeia.' },
      { icon: '👁️', t: 'Observação', d: 'A turma vê quantos ficaram "marcados".' },
      { icon: '💡', t: 'Aprendizagem', d: 'Reforça a importância da lavagem correta das mãos.' },
    ];
    const opcoes = [
      { l: 'A', t: 'Os micróbios espalham-se rapidamente.', c: false },
      { l: 'B', t: 'Lavar as mãos interrompe a transmissão.', c: false },
      { l: 'C', t: 'Ambas as anteriores.', c: true },
    ];
    return (
      <SlideContainer title="3.2 O Jogo da Mão Limpa" subtitle="Simulação: Como os Micróbios se Espalham">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-8">
          <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium leading-relaxed">
            Uma simulação simples mostra como os micróbios se espalham <span className="text-[#0f1f36] font-black underline decoration-[#fdec00] decoration-4">sem serem vistos</span>.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {passos.map((p, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white border-4 border-gray-50 rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg hover:border-[#3ac4ee] transition-all"
              >
                <div className="text-4xl mb-3">{p.icon}</div>
                <div className="w-7 h-7 rounded-full bg-[#0f1f36] text-[#fdec00] font-black text-sm flex items-center justify-center mb-2">{i + 1}</div>
                <h4 className="font-black text-[#0f1f36] uppercase text-sm tracking-tight mb-1">{p.t}</h4>
                <p className="text-xs font-bold text-gray-400 leading-tight">{p.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="bg-[#0f1f36] p-8 rounded-[2rem] text-white shadow-2xl">
            <h3 className="font-black text-lg text-[#fdec00] uppercase tracking-widest mb-4">
              Que mensagem esta atividade ajuda a transmitir?
            </h3>
            <div className="space-y-3">
              {opcoes.map((op) => {
                const chosen = jogoAnswer === op.l;
                const resolved = jogoAnswer !== null;
                return (
                  <button
                    key={op.l}
                    onClick={() => setJogoAnswer(op.l)}
                    disabled={jogoAnswer === 'C'}
                    className={`w-full text-left p-5 rounded-xl border-4 font-black text-lg transition-all flex items-center justify-between
                      ${jogoAnswer === 'C' && op.c ? 'bg-green-500 border-green-400 text-white' :
                        jogoAnswer && jogoAnswer === op.l && !op.c ? 'bg-red-500/30 border-red-400 text-red-200' :
                        jogoAnswer === 'C' ? 'bg-white/5 border-white/10 opacity-30' :
                        'bg-white/10 border-white/20 hover:bg-white/20 hover:border-[#3ac4ee]'}`}
                  >
                    <span>{op.l}) {op.t}</span>
                    {jogoAnswer === 'C' && op.c && <CheckCircle2 className="text-white w-6 h-6 shrink-0" />}
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {jogoAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 rounded-xl p-4 flex items-center justify-between gap-4 ${jogoAnswer === 'C' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                >
                  <p className={`font-bold text-base ${jogoAnswer === 'C' ? 'text-green-300' : 'text-red-300'}`}>
                    {jogoAnswer === 'C'
                      ? '✅ Exato! Os micróbios espalham-se por contacto e lavar as mãos interrompe essa cadeia.'
                      : '❌ Não é bem isso — pense de novo e tente outra opção.'}
                  </p>
                  {jogoAnswer !== 'C' && (
                    <button
                      onClick={() => setJogoAnswer(null)}
                      className="shrink-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs uppercase tracking-widest rounded-lg transition-all"
                    >
                      Tentar novamente
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </SlideContainer>
    );
  };

  const renderSlide3 = () => (
    <SlideContainer title="3.3 Heróis do WASH" subtitle="Teatro e Dramatização Educativa">
       <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-8">
          <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium">O teatro cria empatia, reforça mensagens e transforma alunos em multiplicadores.</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { t: 'Teatro de Fantoches', d: 'A gotinha de água limpa; Super-heróis da higiene.', i: Theater, c: 'bg-[#fdec00] border-[#0f1f36]' },
               { t: 'Encenação de Heróis', d: 'Personagens que cuidam das casas de banho e apoiam colegas.', i: ShieldCheck, c: 'bg-[#3ac4ee] border-[#0f1f36]' }
             ].map((card, i) => {
               const Icon = card.i;
               return (
                 <motion.div 
                   key={i} 
                   variants={itemVariants}
                   whileHover={{ scale: 1.05 }}
                   className={`p-10 rounded-[3rem] border-4 shadow-2xl ${card.c} text-[#0f1f36] relative overflow-hidden`}
                 >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full" />
                    <div className="w-16 h-16 rounded-2xl bg-[#0f1f36] text-white flex items-center justify-center mb-6 shadow-xl">
                       <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-black text-3xl mb-4 uppercase italic tracking-tighter">{card.t}</h3>
                    <p className="font-bold text-lg opacity-80 leading-snug">{card.d}</p>
                 </motion.div>
               );
             })}
          </div>
       </motion.div>
    </SlideContainer>
  );

  const renderSlide4 = () => (
    <SlideContainer title="3.4 Dinâmicas de Grupo" subtitle="Jogando por um Ambiente Saudável">
       <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-10">
          <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium leading-relaxed">
             Jogos e circuitos consolidam conceitos complexos através da <span className="text-[#3ac4ee] font-black underline decoration-4 underline-offset-4">Participação Ativa</span>.
          </motion.p>
          <motion.div variants={itemVariants} className="bg-white border-8 border-gray-50 p-10 rounded-[4rem] shadow-2xl relative">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0f1f36] text-[#fdec00] px-8 py-2 rounded-full font-black uppercase text-xs tracking-widest border-4 border-white shadow-lg">Circuito da Higiene</div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-gray-100">
                {[
                  { t: 'Estação Água', d: 'Identificar água limpa vs suja.', i: Droplets, tc: 'text-[#3ac4ee]' },
                  { t: 'Estação Sabão', d: 'Praticar com música animada.', i: Music, tc: 'text-[#fdec00]' },
                  { t: 'Estação Saneamento', d: 'Jogo de separar resíduos.', i: Trash2, tc: 'text-[#0f1f36]' }
                ].map((st, i) => {
                  const Icon = st.i;
                  return (
                    <div key={i} className="pt-8 sm:pt-0 sm:px-4 flex flex-col items-center text-center">
                       <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${st.tc} bg-gray-50 shadow-inner`}>
                          <Icon />
                       </div>
                       <h4 className={`font-black text-xl mb-2 italic ${st.tc}`}>{st.t}</h4>
                       <p className="font-bold text-gray-400 text-sm leading-tight">{st.d}</p>
                    </div>
                  );
                })}
             </div>
          </motion.div>
       </motion.div>
    </SlideContainer>
  );

  const renderSlide5 = () => {
    const stepBank = HAND_STEPS_SCRAMBLED.filter(s => !stepSlots.includes(s));
    const allPlaced = stepSlots.every(Boolean);
    const isCorrect = isHandStepsCorrect;

    const handleDropOnSlot = (slotIdx, e) => {
      e.preventDefault();
      setDragOverSlot(null);
      let data;
      try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
      const newSlots = [...stepSlots];
      if (data.from === 'bank') {
        if (newSlots[slotIdx]) return; // slot occupied — drop rejected
        newSlots[slotIdx] = data.step;
      } else if (data.from === 'slot') {
        const temp = newSlots[slotIdx];
        newSlots[slotIdx] = newSlots[data.index];
        newSlots[data.index] = temp;
      }
      setStepSlots(newSlots);
    };

    const handleDropOnBank = (e) => {
      e.preventDefault();
      let data;
      try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
      if (data.from === 'slot') {
        const newSlots = [...stepSlots];
        newSlots[data.index] = null;
        setStepSlots(newSlots);
      }
    };

    return (
      <SlideContainer title="3.5 Os 7 Passos de Higiene" subtitle="Coloque os passos na ordem correta">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-3">

          {/* Bank */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl p-3 flex flex-wrap gap-2 min-h-[56px]"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDropOnBank}
          >
            {stepBank.length > 0 ? (
              <>
                <p className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400">Passos disponíveis — arraste para o número:</p>
                {stepBank.map(step => (
                  <div
                    key={step}
                    draggable
                    onDragStart={e => e.dataTransfer.setData('text/plain', JSON.stringify({ from: 'bank', step }))}
                    className="px-3 py-1.5 bg-white border-4 border-[#3ac4ee] rounded-xl font-black text-sm text-[#0f1f36] cursor-grab hover:scale-105 transition-all shadow-sm select-none"
                  >
                    {step}
                  </div>
                ))}
              </>
            ) : (
              <p className="text-xs font-bold text-gray-400 italic w-full text-center">
                {isCorrect ? '✅ Ordem perfeita!' : 'Todos os passos foram colocados — verifique se estão certos.'}
              </p>
            )}
          </motion.div>

          {/* Numbered slots */}
          <motion.div variants={itemVariants} className="grid grid-cols-7 gap-2 flex-1">
            {stepSlots.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1"
                onDragOver={e => { e.preventDefault(); setDragOverSlot(i); }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={e => handleDropOnSlot(i, e)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow transition-all ${dragOverSlot === i ? 'bg-[#3ac4ee] text-white scale-110' : 'bg-[#0f1f36] text-[#fdec00]'}`}>
                  {i + 1}
                </div>
                {step ? (
                  <div
                    draggable
                    onDragStart={e => e.dataTransfer.setData('text/plain', JSON.stringify({ from: 'slot', index: i, step }))}
                    className={`flex-1 w-full flex items-center justify-center text-center rounded-xl border-4 p-1 text-[10px] font-black uppercase tracking-tight cursor-grab select-none transition-all ${
                      isCorrect ? 'bg-green-100 border-green-400 text-green-800' :
                      allPlaced && step !== HAND_STEPS_ORDER[i] ? 'bg-red-50 border-red-300 text-red-700' :
                      dragOverSlot === i ? 'border-[#3ac4ee] bg-[#3ac4ee]/10' :
                      'bg-white border-[#3ac4ee]/50 text-[#0f1f36]'
                    }`}
                  >
                    {step}
                  </div>
                ) : (
                  <div className={`flex-1 w-full rounded-xl border-4 border-dashed flex items-center justify-center text-xs font-bold transition-all ${
                    dragOverSlot === i ? 'border-[#3ac4ee] bg-[#3ac4ee]/10 text-[#3ac4ee]' : 'border-gray-200 bg-gray-50 text-gray-300'
                  }`}>
                    ?
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Feedback */}
          <AnimatePresence mode="wait">
            {isCorrect ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#3ac4ee] text-[#0f1f36] p-3 rounded-2xl font-black text-center shadow-xl flex items-center gap-3 justify-center text-sm">
                <HandMetal className="w-5 h-5 shrink-0" />
                Perfeito! Estes 7 passos, feitos em 20 segundos, eliminam 99% dos germes.
              </motion.div>
            ) : allPlaced ? (
              <motion.div key="wrong" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-orange-50 border-4 border-orange-200 p-3 rounded-xl text-orange-700 font-bold text-sm text-center">
                Algum passo está fora de ordem — arraste para reorganizar ou volte os passos ao banco.
              </motion.div>
            ) : (
              <motion.div key="hint" variants={itemVariants} className="bg-[#3ac4ee]/10 border-2 border-[#3ac4ee]/20 p-2.5 rounded-xl flex items-center gap-2 text-[#0f1f36] text-xs font-bold">
                <HandMetal className="w-4 h-4 text-[#3ac4ee] shrink-0" />
                Regra dos 20 Segundos: lavar as mãos deve durar o tempo de cantar "Parabéns a Você" duas vezes.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </SlideContainer>
    );
  };

  const renderSlide6 = () => (
    <SlideContainer title="3.6 Protagonismo Estudantil" subtitle="Formando Líderes para a Saúde">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-8">
         <div className="flex items-center gap-10">
            <motion.img 
              variants={itemVariants}
              src="./assets/Heroi Wash-01.png" 
              alt="Heroi" 
              className="h-48 object-contain hidden md:block drop-shadow-2xl" 
            />
            <motion.div variants={itemVariants} className="flex-1">
               <p className="text-2xl font-black text-[#0f1f36] italic leading-tight mb-4">
                  “Quando os alunos lideram, o WASH torna-se a nova cultura da escola.”
               </p>
               <p className="text-lg text-gray-500 font-bold">A criação de <span className="text-[#3ac4ee] underline decoration-4 underline-offset-4">WASH Clubes</span> é o motor desta mudança.</p>
            </motion.div>
         </div>
         
         <motion.div variants={itemVariants} className="bg-gray-50 border-4 border-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#3ac4ee]" />
            <h3 className="font-black text-2xl mb-8 text-[#0f1f36] uppercase italic tracking-tighter">Ser um Herói WASH é:</h3>
            <ul className="space-y-6">
               {[
                 { t: 'Promover hábitos de saúde na comunidade.', v: true },
                 { t: 'Apoiar colegas (educação por pares).', v: true },
                 { t: 'Relatar avarias de imediato.', v: true },
                 { t: 'Fazer reparos técnicos pesados.', v: false }
               ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className={`flex items-center gap-4 text-xl font-black ${item.v ? 'text-[#0f1f36]' : 'text-red-400 opacity-40 line-through'}`}
                  >
                     {item.v ? <CheckCircle2 className="text-green-500 shrink-0" /> : <AlertCircle className="shrink-0" />}
                     {item.t}
                  </motion.li>
               ))}
            </ul>
         </motion.div>
      </motion.div>
    </SlideContainer>
  );

  const renderSlide7 = () => (
    <SlideContainer title="3.7 Recursos Recomendados" subtitle="Biblioteca de Apoio ao Professor">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full">
         <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium mb-10">Use estes materiais para dinamizar as suas aulas:</motion.p>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { t: 'Cartazes e Autocolantes', d: 'Visualização rápida e constante.', i: Library, c: 'bg-[#3ac4ee]/20 border-[#3ac4ee]' },
              { t: 'Puzzle & Jogos', d: 'Aprendizagem tátil e lúdica.', i: Gamepad2, c: 'bg-[#fdec00]/30 border-[#fdec00]' },
              { t: 'Caderno de Atividades', d: 'Exercícios de consolidação.', i: GraduationCap, c: 'bg-white border-gray-100' },
              { t: 'Guias Mundiais UNICEF', d: 'Referencial técnico oficial.', i: Library, c: 'bg-[#0f1f36] text-white border-[#0f1f36]' }
            ].map((box, i) => {
               const Icon = box.i;
               return (
                 <motion.div 
                   key={i} 
                   variants={itemVariants}
                   whileHover={{ scale: 1.02 }}
                   className={`p-8 rounded-[3rem] border-4 shadow-xl flex gap-6 items-center ${box.c}`}
                 >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                       <Icon className={`w-8 h-8 ${box.c.includes('0f1f36') ? 'text-[#0f1f36]' : 'text-[#3ac4ee]'}`} />
                    </div>
                    <div>
                       <h4 className="font-black text-xl uppercase italic tracking-tighter">{box.t}</h4>
                       <p className="text-sm font-bold opacity-60 leading-tight">{box.d}</p>
                    </div>
                 </motion.div>
               );
            })}
         </div>
      </motion.div>
    </SlideContainer>
  );

  const renderSlide8 = () => (
    <SlideContainer title="3.8 Consolidação" subtitle="Avalie a sua Aprendizagem">
       <div className="h-full flex flex-col justify-center max-w-4xl mx-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gray-50 border-4 border-white p-12 rounded-[4rem] shadow-2xl relative">
             <div className="absolute -top-6 left-10 bg-[#0f1f36] text-[#fdec00] px-8 py-2 rounded-full font-black uppercase text-xs tracking-widest border-4 border-white">Pergunta de Acompanhamento</div>
             <h2 className="text-2xl sm:text-3xl font-black mb-10 text-[#0f1f36] leading-tight">
                "Ao criar um WASH Clube na sua escola, qual é o principal objetivo pedagógico e prático?"
             </h2>
             <div className="space-y-4">
                {[
                  { l: 'A', t: 'Poder substituir o pessoal da limpeza.', c: false },
                  { l: 'B', t: 'Aumentar o protagonismo estudantil na gestão e fiscalização dos serviços.', c: true },
                  { l: 'C', t: 'Apenas ganhar concursos escolares.', c: false }
                ].map((opt) => {
                   const isSelected = q8Answer === opt.l;
                   const isCorrect = opt.c;
                   return (
                     <button
                        key={opt.l}
                        onClick={() => setQ8Answer(opt.l)}
                        disabled={q8Answer === 'B'}
                        className={`w-full text-left p-6 rounded-[2rem] border-4 font-black text-xl transition-all flex items-center justify-between group ${
                           isSelected && isCorrect ? 'bg-green-100 border-green-500 text-green-900 shadow-md' :
                           isSelected && !isCorrect ? 'bg-red-50 border-red-500 opacity-50' :
                           q8Answer === 'B' ? 'opacity-30 border-gray-100' :
                           'bg-white border-gray-100 hover:border-[#3ac4ee] hover:shadow-xl'
                        }`}
                     >
                        <span className="flex gap-4">
                           <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-[#3ac4ee] group-hover:text-white transition-colors">{opt.l}</span>
                           {opt.t}
                        </span>
                        {isSelected && isCorrect && <CheckCircle2 className="text-green-600" />}
                     </button>
                   );
                })}
             </div>
             <AnimatePresence>
                {q8Answer && (
                   <motion.div initial={{opacity:0, height: 0}} animate={{opacity:1, height: 'auto'}} className={`mt-8 p-6 rounded-r-2xl text-lg font-black shadow-sm flex items-center justify-between gap-4 ${q8Answer === 'B' ? 'bg-[#3ac4ee]/10 border-l-8 border-[#3ac4ee] text-[#0f1f36] italic' : 'bg-red-50 border-l-8 border-red-400 text-red-800'}`}>
                      {q8Answer === 'B' ? (
                        <div>
                          <div className="flex gap-3 items-center mb-1"><Sparkles className="w-5 h-5 text-[#3ac4ee] fill-[#3ac4ee]" /> <span>Precisamente!</span></div>
                          O WASH Clube reforça a responsabilidade e torna as práticas sustentáveis a longo prazo.
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full gap-4">
                          <span>❌ Não é bem isso — pense no papel dos alunos. Tente outra resposta.</span>
                          <button
                            onClick={() => setQ8Answer(null)}
                            className="shrink-0 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-lg transition-all"
                          >
                            Tentar novamente
                          </button>
                        </div>
                      )}
                   </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
       </div>
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
        {currentSlide === 7 && renderSlide7()}
        {currentSlide === 8 && renderSlide8()}
      </div>
    </AnimatePresence>
  );
}

import React, { useEffect, useState } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Droplets, Trash2, Users, Heart, Star, ShieldCheck, Globe, HelpCircle, CheckCircle, Lock, BookOpen } from 'lucide-react';

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

export default function Modulo1({ currentSlide, setCanAdvance }) {

  const [q1Answered, setQ1Answered] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);
  const [q13Answered, setQ13Answered] = useState(false);
  const [odsMatches, setOdsMatches] = useState({});
  const [classifications, setClassifications] = useState({});
  const [q17Answered, setQ17Answered] = useState(false);

  const [selectedOds, setSelectedOds] = useState(null);
  const [odsMsg, setOdsMsg] = useState('');

  const [dragOverCat, setDragOverCat] = useState(null);
  const [wrongClassId, setWrongClassId] = useState(null);

  const [showFeedbackCheck, setShowFeedbackCheck] = useState(false);
  const [isCorrectCheck, setIsCorrectCheck] = useState(false);

  useEffect(() => {
    if (currentSlide === 1) setCanAdvance(q1Answered);
    else if (currentSlide === 2) setCanAdvance(expandedCards.length === 3);
    else if (currentSlide === 3) setCanAdvance(q13Answered);
    else if (currentSlide === 4) setCanAdvance(true);
    else if (currentSlide === 5) setCanAdvance(Object.keys(odsMatches).length === 3);
    else if (currentSlide === 6) {
      const situacoes = [
        { id: 1, correta: 'Saúde' },
        { id: 2, correta: 'Aprendizagem' },
        { id: 3, correta: 'Dignidade & Inclusão' },
      ];
      setCanAdvance(situacoes.every(s => classifications[s.id] === s.correta));
    }
    else if (currentSlide === 7) setCanAdvance(q17Answered);
    else setCanAdvance(true);
  }, [currentSlide, q1Answered, expandedCards, q13Answered, odsMatches, classifications, q17Answered, setCanAdvance]);

  const renderSlide1 = () => (
    <SlideContainer title="1.1 Bem-vindo à Viagem WASH!" subtitle="O Início da Transformação">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-4">
        <motion.p variants={itemVariants} className="text-base leading-relaxed bg-[#fdec00]/20 p-4 rounded-2xl font-bold border-l-8 border-[#fdec00] text-[#0f1f36] shadow-sm">
          "O WASH na escola não é apenas infraestrutura, é saúde, dignidade e melhores oportunidades de aprendizagem."
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="font-black text-lg text-[#0f1f36] flex items-center gap-2">
            <HelpCircle className="text-[#3ac4ee] w-5 h-5" />
            Qual o maior desafio hoje?
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { t: 'Água potável disponível e constante', i: Droplets },
              { t: 'Saneamento adequado', i: Trash2 },
              { t: 'Hábitos de higiene (ex.: lavagem das mãos)', i: Users }
            ].map((opt, i) => {
              const Icon = opt.i;
              return (
                <button
                  key={i}
                  onClick={() => setQ1Answered(true)}
                  className={`group w-full text-left p-3 rounded-xl border-4 transition-all flex items-center justify-between ${
                    q1Answered ? 'border-gray-100 bg-gray-50 opacity-60' : 'border-[#3ac4ee]/20 hover:border-[#3ac4ee] hover:bg-[#3ac4ee]/5 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="text-[#3ac4ee] w-4 h-4" />
                    </div>
                    <span className="font-black text-[#0f1f36] text-sm">{opt.t}</span>
                  </div>
                  {q1Answered && <CheckCircle2 className="text-[#3ac4ee] w-5 h-5 animate-in zoom-in shrink-0" />}
                </button>
              );
            })}
          </div>
          {q1Answered && (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-3 bg-green-50 text-green-800 rounded-xl flex items-center gap-3 font-bold border-2 border-green-200 text-sm">
               <CheckCircle className="shrink-0 w-4 h-4" />
               Obrigado pela sua reflexão! Pode avançar para a próxima lição.
             </motion.div>
          )}
        </motion.div>
      </motion.div>
    </SlideContainer>
  );

  const renderSlide2 = () => {
    const cards = [
      { id: 1, title: 'Água', text: 'Acesso universal e seguro a água potável.', icon: Droplets, color: 'bg-blue-500' },
      { id: 2, title: 'Saneamento', text: 'Instalações adequadas e gestão de resíduos.', icon: Trash2, color: 'bg-green-500' },
      { id: 3, title: 'Higiene', text: 'Lavagem das mãos e gestão menstrual.', icon: Heart, color: 'bg-red-500' }
    ];

    return (
      <SlideContainer title="1.2 O que é o WASH?" subtitle="Os Três Pilares Essenciais">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-base font-medium text-gray-500">
          WASH significa Água, Saneamento e Higiene. <span className="text-[#3ac4ee] font-black underline decoration-2">Clique nos blocos</span> para explorar cada um.
        </motion.p>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map(c => {
             const isExpanded = expandedCards.includes(c.id);
             const Icon = c.icon;
             return (
               <motion.button
                 key={c.id}
                 variants={itemVariants}
                 whileHover={{ y: -6 }}
                 onClick={() => setExpandedCards(prev => prev.includes(c.id) ? prev : [...prev, c.id])}
                 className={`relative flex flex-col items-center justify-center p-5 rounded-[var(--brand-radius)] border-4 transition-all duration-500 min-h-[140px] shadow-xl overflow-hidden ${
                   isExpanded
                     ? 'bg-[#0f1f36] border-[#0f1f36] text-white'
                     : 'bg-white border-gray-100 text-[#0f1f36] hover:border-[#3ac4ee]'
                 }`}
               >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-lg ${isExpanded ? 'bg-[#3ac4ee] text-[#0f1f36]' : 'bg-gray-50 text-[#3ac4ee]'}`}>
                    <Icon className="w-6 h-6" />
                 </div>
                 <h4 className="font-black text-lg tracking-tight mb-1 uppercase">{c.title}</h4>
                 <AnimatePresence mode="wait">
                   {isExpanded ? (
                     <motion.p
                       key="expanded"
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className="mt-2 text-center font-medium leading-relaxed opacity-90 text-sm"
                     >
                       {c.text}
                     </motion.p>
                   ) : (
                     <motion.div
                       key="collapsed"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 0.5 }}
                       exit={{ opacity: 0 }}
                       className="mt-2 flex items-center gap-1 uppercase text-[10px] font-black tracking-widest bg-gray-100 px-3 py-1 rounded-full"
                     >
                        <Lock className="w-2.5 h-2.5" /> Clique para Abrir
                     </motion.div>
                   )}
                 </AnimatePresence>
                 {isExpanded && <div className="absolute top-2 right-2"><CheckCircle2 className="w-5 h-5 text-[#3ac4ee]" /></div>}
               </motion.button>
             );
          })}
        </motion.div>
      </SlideContainer>
    );
  };

  const renderSlide3 = () => (
     <SlideContainer title="1.3 O Cenário Local" subtitle="A Realidade em Cabo Verde">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full">
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-base font-medium text-gray-600 leading-relaxed italic">"Muitos alunos ainda não têm acesso a condições básicas de saúde. Juntos, podemos mudar isto."</p>
            <div className="bg-white border-4 border-[#3ac4ee] p-4 rounded-2xl shadow-xl flex gap-4 items-start transform -rotate-1">
               <div className="p-3 bg-[#3ac4ee]/10 rounded-xl shrink-0"><ShieldCheck className="text-[#3ac4ee] w-6 h-6"/></div>
               <div>
                  <h4 className="font-black text-lg text-[#0f1f36] mb-1 uppercase italic tracking-tight">O Direito</h4>
                  <p className="font-medium text-gray-500 text-sm">Todo o estudante tem direito a aprender num ambiente saudável, seguro e digno.</p>
               </div>
            </div>
            <div className="bg-[#fdec00] p-4 rounded-2xl shadow-xl flex gap-4 items-start transform rotate-1">
               <div className="p-3 bg-[#0f1f36]/10 rounded-xl shrink-0"><Globe className="text-[#0f1f36] w-6 h-6"/></div>
               <div>
                  <h4 className="font-black text-lg text-[#0f1f36] mb-1 uppercase italic tracking-tight">O Desafio</h4>
                  <p className="font-bold text-[#0f1f36]/70 text-sm">Nalgumas escolas de Cabo Verde, o acesso a água e saneamento ainda é limitado.</p>
               </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded-[var(--brand-radius)] flex flex-col justify-center border-4 border-white shadow-inner">
             <h3 className="font-black text-lg mb-4 text-[#0f1f36] text-center">Como descreveria a sua escola hoje?</h3>
             <div className="space-y-3">
              {[
                { t: 'Adequada (funcional)', c: 'border-green-400 bg-green-50' },
                { t: 'Parcial (com falhas)', c: 'border-orange-400 bg-orange-50' },
                { t: 'Insuficiente (faltam condições)', c: 'border-red-400 bg-red-50' }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQ13Answered(true)}
                  className={`w-full text-left p-3 rounded-2xl border-4 transition-all font-black text-base ${
                    q13Answered ? 'opacity-40 grayscale pointer-events-none' : 'bg-white border-gray-100 hover:border-[#3ac4ee] hover:shadow-md'
                  }`}
                >
                  {opt.t}
                </button>
              ))}
            </div>
            {q13Answered && (
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center font-black text-[#3ac4ee] uppercase tracking-widest text-xs">
                 "Identificar é o primeiro passo para avançar!"
               </motion.p>
            )}
          </motion.div>
        </motion.div>
     </SlideContainer>
  );

  const renderSlide4 = () => {
     const pilares = [
       {t: 'Saúde', d: 'Reduz doenças e parasitoses.', i: Heart},
       {t: 'Gênero', d: 'Privacidade para a GHM.', i: Users},
       {t: 'Estudo', d: 'Alunos concentram-se mais.', i: BookOpen},
       {t: 'Direitos', d: 'Ambiente seguro e digno.', i: ShieldCheck},
       {t: 'Frequência', d: 'Reduz faltas escolares.', i: CheckCircle},
       {t: 'ODS', d: 'Agenda 2030 (3, 4, 6).', i: Globe}
     ];
     return (
        <SlideContainer title="1.4 Porquê a Escola?" subtitle="Os 6 Pilares de Impacto do WASH">
           <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {pilares.map((p, i) => {
                 const Icon = p.i;
                 return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white border-4 border-gray-50 hover:border-[#3ac4ee]/30 p-4 rounded-[var(--brand-radius)] flex flex-col items-center justify-center text-center shadow-lg transition-all"
                    >
                       <div className="w-10 h-10 bg-[#3ac4ee]/10 text-[#3ac4ee] rounded-xl flex items-center justify-center mb-2">
                          <Icon className="w-5 h-5" />
                       </div>
                       <h4 className="text-[#0f1f36] font-black text-base mb-1 uppercase italic">{p.t}</h4>
                       <p className="text-xs font-bold text-gray-400 leading-tight">{p.d}</p>
                    </motion.div>
                 );
              })}
           </motion.div>
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center font-black text-lg text-[#0f1f36] bg-[#fdec00] p-4 rounded-2xl shadow-xl border-4 border-white mt-auto">
             "WASH é saúde e aprendizagem na prática!"
           </motion.div>
        </SlideContainer>
     );
  };

   const renderSlide5 = () => {
     const odsList = [
        { id: 3, label: 'ODS 3', name: 'Saúde e Bem-Estar', desc: 'Redução de doenças e melhoria da condição física dos alunos.' },
        { id: 4, label: 'ODS 4', name: 'Educação de Qualidade', desc: 'Melhoria da concentração e do aproveitamento escolar.' },
        { id: 6, label: 'ODS 6', name: 'Água e Saneamento', desc: 'Garantia de água e instalações sanitárias seguras e sustentáveis.' }
     ];

     return (
       <SlideContainer title="1.5 ODS e WASH" subtitle="Conectando Metas Globais com a Escola">
          <p className="mb-4 text-sm font-medium text-gray-400 italic">
            Selecione um ODS para ver o seu impacto direto na escola.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {odsList.map(o => {
              const isSelected = selectedOds === o.id;
              const isMatched = !!odsMatches[o.id];
              return (
                <motion.button
                  key={o.id}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    if (isMatched) return;
                    setSelectedOds(isSelected ? null : o.id);
                    setOdsMsg('');
                  }}
                  className={`p-4 rounded-[var(--brand-radius-md)] border-4 text-left transition-all shadow-lg flex flex-col gap-1.5 ${
                    isMatched ? 'border-green-500 bg-green-50 opacity-60 cursor-default' :
                    isSelected ? 'border-[#3ac4ee] bg-[#3ac4ee]/10 shadow-xl' :
                    'border-gray-100 bg-white hover:border-[#3ac4ee]'
                  }`}
                >
                  <span className={`text-xl font-black ${isMatched ? 'text-green-700' : 'text-[#0f1f36]'}`}>{o.label}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-[#3ac4ee]">{o.name}</span>
                  {isMatched && <CheckCircle2 className="text-green-500 w-4 h-4" />}
                </motion.button>
              );
            })}
          </div>

          {selectedOds && !odsMatches[selectedOds] && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
              <p className="font-black text-[#0f1f36] uppercase text-xs tracking-widest mb-2">
                Qual é o impacto do <span className="text-[#3ac4ee]">ODS {selectedOds}</span> na escola?
              </p>
              <div className="space-y-2">
                {odsList.map(o => (
                  <button
                    key={o.id}
                    onClick={() => {
                      if (o.id === selectedOds) {
                        setOdsMatches(p => ({ ...p, [selectedOds]: true }));
                        setOdsMsg('Certo — este ODS está diretamente ligado ao impacto do WASH na escola.');
                        setSelectedOds(null);
                      } else {
                        setOdsMsg('Quase — tente novamente e pense no efeito mais direto na vida escolar.');
                        setTimeout(() => setOdsMsg(''), 2500);
                      }
                    }}
                    className="w-full text-left p-3 rounded-xl border-4 border-gray-100 bg-white hover:border-[#3ac4ee] font-bold text-gray-700 transition-all hover:shadow-md text-sm"
                  >
                    {o.desc}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {odsMsg && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3 rounded-xl font-bold text-sm border-4 ${
                  odsMsg.includes('Certo') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-orange-50 border-orange-200 text-orange-800'
                }`}
              >
                {odsMsg}
              </motion.div>
            )}
          </AnimatePresence>
       </SlideContainer>
     );
   };

  const renderSlide6 = () => {
     const situacoes = [
       { id: 1, t: 'Um aluno falta porque tem diarreia recorrente.', correta: 'Saúde', feedback: 'WASH reduz doenças e faltas.' },
       { id: 2, t: 'A turma perde tempo por idas constantes à casa de banho.', correta: 'Aprendizagem', feedback: 'Condições adequadas melhoram concentração e tempo útil.' },
       { id: 3, t: 'Uma rapariga evita ir à escola durante o período menstrual.', correta: 'Dignidade & Inclusão', feedback: 'Privacidade e GHM garantem participação e igualdade.' },
     ];
     const categorias = [
       { name: 'Saúde', icon: '💙', border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-800' },
       { name: 'Aprendizagem', icon: '📚', border: 'border-[#3ac4ee]', bg: 'bg-[#3ac4ee]/10', text: 'text-[#0f1f36]' },
       { name: 'Dignidade & Inclusão', icon: '🌟', border: 'border-[#fdec00]', bg: 'bg-[#fdec00]/20', text: 'text-[#0f1f36]' },
     ];

     const allCorrect = situacoes.every(s => classifications[s.id] === s.correta);
     const unplaced = situacoes.filter(s => !classifications[s.id]);

     const handleDropOnCat = (catName, e) => {
       e.preventDefault();
       setDragOverCat(null);
       const sitId = parseInt(e.dataTransfer.getData('text/plain'));
       const sit = situacoes.find(s => s.id === sitId);
       if (!sit || classifications[sit.id]) return;
       if (sit.correta === catName) {
         setClassifications(p => ({ ...p, [sit.id]: catName }));
       } else {
         setWrongClassId(sitId);
         setTimeout(() => setWrongClassId(null), 1000);
       }
     };

     return (
       <SlideContainer title="1.6 O Valor do Investimento" subtitle="Arraste cada situação para a categoria certa">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full gap-3">

            {/* Bank of draggable cards */}
            <div
              className="flex flex-wrap gap-2 min-h-[48px]"
              onDragOver={e => e.preventDefault()}
            >
              {unplaced.length > 0 && (
                <p className="w-full text-xs font-black uppercase tracking-widest text-gray-400 mb-1">
                  Arraste cada situação para a categoria certa ↓
                </p>
              )}
              {unplaced.map(s => (
                <motion.div
                  key={s.id}
                  layout
                  draggable
                  onDragStart={e => { e.dataTransfer.setData('text/plain', s.id.toString()); }}
                  animate={wrongClassId === s.id ? { x: [-8, 8, -8, 8, 0], transition: { duration: 0.4 } } : {}}
                  className={`cursor-grab active:cursor-grabbing select-none p-2.5 rounded-xl border-4 shadow-md font-bold text-[#0f1f36] text-xs leading-snug flex-1 min-w-[160px] transition-colors ${
                    wrongClassId === s.id
                      ? 'border-red-400 bg-red-50'
                      : 'bg-white border-gray-200 hover:border-[#3ac4ee]'
                  }`}
                >
                  <span className="text-gray-400 mr-1">⠿</span>
                  "{s.t}"
                </motion.div>
              ))}
              {unplaced.length === 0 && !allCorrect && (
                <p className="text-xs font-bold text-orange-500 italic">Alguma situação foi colocada errada — não aparece aqui.</p>
              )}
            </div>

            {/* Drop zones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 min-h-0">
              {categorias.map(cat => {
                const placed = situacoes.filter(s => classifications[s.id] === cat.name);
                const isOver = dragOverCat === cat.name;
                return (
                  <div
                    key={cat.name}
                    onDragOver={e => { e.preventDefault(); setDragOverCat(cat.name); }}
                    onDragLeave={() => setDragOverCat(null)}
                    onDrop={e => handleDropOnCat(cat.name, e)}
                    className={`rounded-2xl border-4 p-3 flex flex-col gap-2 transition-all ${cat.bg} ${cat.border} ${isOver ? 'scale-[1.02] shadow-xl ring-4 ring-[#3ac4ee]/30' : ''}`}
                  >
                    <h4 className={`font-black text-xs uppercase tracking-widest flex items-center gap-1.5 ${cat.text}`}>
                      <span>{cat.icon}</span> {cat.name}
                    </h4>
                    <AnimatePresence>
                      {placed.map(s => {
                        const sit = situacoes.find(x => x.id === s.id);
                        return (
                          <motion.div
                            key={s.id}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-lg p-2 text-xs font-bold text-[#0f1f36] shadow border-2 border-green-300 flex items-start gap-1.5"
                          >
                            <CheckCircle2 className="text-green-500 shrink-0 w-3 h-3 mt-0.5" />
                            <span>"{sit.t}"</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    {placed.length === 0 && (
                      <div className={`flex-1 flex items-center justify-center text-xs font-black uppercase tracking-widest opacity-30 ${cat.text}`}>
                        {isOver ? '✨ Soltar aqui' : 'Arrastar aqui'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <AnimatePresence>
              {allCorrect && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f1f36] text-white p-3 rounded-2xl font-black text-center shadow-xl text-xs">
                  🌟 "Excelente — WASH remove barreiras e cria condições para que ninguém fique para trás."
                </motion.div>
              )}
              {wrongClassId && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-orange-50 border-4 border-orange-200 p-2 rounded-xl text-orange-700 font-bold text-xs text-center">
                  ❌ Categoria errada — tente outra!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
       </SlideContainer>
     );
  };

  const renderSlide7 = () => {
     const handleAnswer = (correct) => {
        setIsCorrectCheck(correct);
        setShowFeedbackCheck(true);
        if(correct) setQ17Answered(true);
     };

     return (
       <SlideContainer title="1.7 Desafio Final" subtitle="Teste os seus conhecimentos">
          <div className="h-full flex flex-col justify-center max-w-4xl mx-auto">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gray-50 border-4 border-white p-5 rounded-[2rem] shadow-2xl relative">
                <div className="absolute -top-5 left-8 bg-[#0f1f36] text-[#fdec00] px-4 py-1 rounded-full font-black uppercase text-xs tracking-widest border-4 border-white">Pergunta de Acompanhamento</div>
                <p className="text-lg sm:text-xl font-black mb-5 text-[#0f1f36] leading-tight">
                   De que forma o WASH atua como ferramenta de inclusão para as raparigas?
                </p>
                <div className="space-y-3">
                   {[
                     { t: 'Garantindo hidratação constante.', c: false },
                     { t: 'Privacidade e higiene (GHM) evitam faltas escolares.', c: true },
                     { t: 'Reforçando punições por falta de higiene.', c: false }
                   ].map((ans, i) => (
                      <button
                        key={i}
                        onClick={() => !isCorrectCheck && handleAnswer(ans.c)}
                        disabled={isCorrectCheck}
                        className={`w-full p-4 border-4 text-left rounded-[var(--brand-radius-md)] text-base font-black transition-all flex items-center justify-between ${
                          isCorrectCheck && ans.c ? 'bg-green-100 border-green-500 text-green-900 shadow-md' :
                          isCorrectCheck && !ans.c ? 'opacity-30 border-gray-100' :
                          showFeedbackCheck && !ans.c ? 'opacity-40 border-red-200 bg-red-50' :
                          'bg-white border-gray-100 hover:border-[#3ac4ee] hover:shadow-xl'
                        }`}
                      >
                         <span>{String.fromCharCode(65+i)}) {ans.t}</span>
                         {isCorrectCheck && ans.c && <CheckCircle2 className="text-green-600 w-5 h-5" />}
                      </button>
                   ))}
                </div>
                <AnimatePresence>
                   {showFeedbackCheck && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`mt-4 p-4 rounded-2xl flex items-center justify-between gap-4 text-base font-bold border-4 ${isCorrectCheck ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                         <div className="flex items-center gap-3">
                           <div className={`p-1.5 rounded-lg ${isCorrectCheck ? 'bg-green-500' : 'bg-red-500'} text-white shrink-0`}>
                             {isCorrectCheck ? <Star className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                           </div>
                           <p className="text-sm">{isCorrectCheck ? 'Fantástico! Compreendeu o impacto social e de género do WASH.' : 'Reveja o impacto do WASH na privacidade e GHM das raparigas.'}</p>
                         </div>
                         {!isCorrectCheck && (
                           <button
                             onClick={() => setShowFeedbackCheck(false)}
                             className="shrink-0 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-lg transition-all"
                           >
                             Tentar novamente
                           </button>
                         )}
                      </motion.div>
                   )}
                </AnimatePresence>
             </motion.div>
          </div>
       </SlideContainer>
     );
  };

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
      </div>
    </AnimatePresence>
  );
}

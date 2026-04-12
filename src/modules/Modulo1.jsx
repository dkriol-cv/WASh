import React, { useEffect, useState } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Droplets, Trash2, Users, Heart, Star, ShieldCheck, Globe, HelpCircle, CheckCircle, Lock, BookOpen } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Modulo1({ currentSlide, setCanAdvance }) {
  
  // States to track interactions and auto-unlock Next button
  const [q1Answered, setQ1Answered] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);
  const [q13Answered, setQ13Answered] = useState(false);
  const [odsMatches, setOdsMatches] = useState({}); // {odsId: "matched"} 
  const [classifications, setClassifications] = useState({});
  const [q17Answered, setQ17Answered] = useState(false);
  
  // State for Slide 5 Matching
  const [selectedOds, setSelectedOds] = useState(null);
  const [odsMsg, setOdsMsg] = useState('');
  
  // State for Slide 7 Knowledge Check
  const [showFeedbackCheck, setShowFeedbackCheck] = useState(false);
  const [isCorrectCheck, setIsCorrectCheck] = useState(false);
  
  useEffect(() => {
    // Determine if canAdvance based on currentSlide interactions
    if (currentSlide === 1) setCanAdvance(q1Answered);
    else if (currentSlide === 2) setCanAdvance(expandedCards.length === 3);
    else if (currentSlide === 3) setCanAdvance(q13Answered);
    else if (currentSlide === 4) setCanAdvance(true); 
    else if (currentSlide === 5) setCanAdvance(Object.keys(odsMatches).length === 3);
    else if (currentSlide === 6) setCanAdvance(Object.keys(classifications).length === 3);
    else if (currentSlide === 7) setCanAdvance(q17Answered);
    else setCanAdvance(true);
  }, [currentSlide, q1Answered, expandedCards, q13Answered, odsMatches, classifications, q17Answered, setCanAdvance]);

  const renderSlide1 = () => (
    <SlideContainer title="1.1 Bem-vindo à Viagem WASH!" subtitle="O Início da Transformação">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row gap-10 items-center h-full">
        <div className="flex-1">
          <motion.p variants={itemVariants} className="text-xl leading-relaxed bg-[#fdec00]/20 p-6 rounded-[1.5rem] font-bold border-l-8 border-[#fdec00] text-[#0f1f36] shadow-sm mb-8">
            “O WASH na escola não é apenas infraestrutura, é saúde, dignidade e melhores oportunidades de aprendizagem.”
          </motion.p>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-black text-2xl text-[#0f1f36] flex items-center gap-3">
              <HelpCircle className="text-[#3ac4ee]" />
              Qual o maior desafio hoje?
            </h3>
            <div className="grid grid-cols-1 gap-4">
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
                    className={`group w-full text-left p-6 rounded-[var(--brand-radius-md)] border-4 transition-all flex items-center justify-between ${
                      q1Answered ? 'border-gray-100 bg-gray-50 opacity-60' : 'border-[#3ac4ee]/20 hover:border-[#3ac4ee] hover:bg-[#3ac4ee]/5 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="text-[#3ac4ee] w-5 h-5" />
                      </div>
                      <span className="font-black text-[#0f1f36]">{opt.t}</span>
                    </div>
                    {q1Answered && <CheckCircle2 className="text-[#3ac4ee] w-6 h-6 animate-in zoom-in" />}
                  </button>
                );
              })}
            </div>
            {q1Answered && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-green-50 text-green-800 rounded-xl flex items-center gap-3 font-bold border-2 border-green-200">
                 <CheckCircle className="shrink-0" />
                 Obrigado pela sua reflexão! Pode avançar para a próxima lição.
               </motion.div>
            )}
          </motion.div>
        </div>
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
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-xl font-medium text-gray-500">
          WASH significa Água, Saneamento e Higiene. <span className="text-[#3ac4ee] font-black underline decoration-2">Clique nos blocos</span> para explorar cada um.
        </motion.p>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(c => {
             const isExpanded = expandedCards.includes(c.id);
             const Icon = c.icon;
             return (
               <motion.button 
                 key={c.id}
                 variants={itemVariants}
                 whileHover={{ y: -10 }}
                 onClick={() => setExpandedCards(prev => prev.includes(c.id) ? prev : [...prev, c.id])}
                 className={`relative flex flex-col items-center justify-center p-8 rounded-[var(--brand-radius)] border-4 transition-all duration-500 min-h-[250px] shadow-xl overflow-hidden ${
                   isExpanded 
                     ? 'bg-[#0f1f36] border-[#0f1f36] text-white' 
                     : 'bg-white border-gray-100 text-[#0f1f36] hover:border-[#3ac4ee]'
                 }`}
               >
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${isExpanded ? 'bg-[#3ac4ee] text-[#0f1f36]' : 'bg-gray-50 text-[#3ac4ee]'}`}>
                    <Icon className="w-8 h-8" />
                 </div>
                 <h4 className="font-black text-2xl tracking-tight mb-2 uppercase">{c.title}</h4>
                 <AnimatePresence mode="wait">
                   {isExpanded ? (
                     <motion.p 
                       key="expanded"
                       initial={{ opacity: 0, height: 0 }} 
                       animate={{ opacity: 1, height: 'auto' }} 
                       exit={{ opacity: 0, height: 0 }}
                       className="mt-4 text-center font-medium leading-relaxed opacity-90"
                     >
                       {c.text}
                     </motion.p>
                   ) : (
                     <motion.div 
                       key="collapsed"
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 0.5 }} 
                       exit={{ opacity: 0 }}
                       className="mt-4 flex items-center gap-1 uppercase text-[10px] font-black tracking-widest bg-gray-100 px-3 py-1 rounded-full"
                     >
                        <Lock className="w-2.5 h-2.5" /> Clique para Abrir
                     </motion.div>
                   )}
                 </AnimatePresence>
                 {isExpanded && <div className="absolute top-2 right-2"><CheckCircle2 className="w-6 h-6 text-[#3ac4ee]" /></div>}
               </motion.button>
             )
          })}
        </motion.div>
      </SlideContainer>
    );
  };

  const renderSlide3 = () => (
     <SlideContainer title="1.3 O Cenário Local" subtitle="A Realidade em Cabo Verde">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-xl font-medium text-gray-600 leading-relaxed italic">"Muitos alunos ainda não têm acesso a condições básicas de saúde. Juntos, podemos mudar isto."</p>
            <div className="bg-white border-4 border-[#3ac4ee] p-8 rounded-[2rem] shadow-xl flex gap-6 items-start transform -rotate-1">
               <div className="p-4 bg-[#3ac4ee]/10 rounded-2xl"><ShieldCheck className="text-[#3ac4ee] w-8 h-8"/></div>
               <div>
                  <h4 className="font-black text-2xl text-[#0f1f36] mb-2 uppercase italic tracking-tight">O Direito</h4>
                  <p className="font-medium text-gray-500">Todo o estudante tem direito a aprender num ambiente saudável, seguro e digno.</p>
               </div>
            </div>
            <div className="bg-[#fdec00] p-8 rounded-[2rem] shadow-xl flex gap-6 items-start transform rotate-1">
               <div className="p-4 bg-[#0f1f36]/10 rounded-2xl"><Globe className="text-[#0f1f36] w-8 h-8"/></div>
               <div>
                  <h4 className="font-black text-2xl text-[#0f1f36] mb-2 uppercase italic tracking-tight">O Desafio</h4>
                  <p className="font-bold text-[#0f1f36]/70">Nalgumas escolas de Cabo Verde, o acesso a água e saneamento ainda é limitado.</p>
               </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-[var(--brand-radius)] flex flex-col justify-center border-4 border-white shadow-inner">
             <h3 className="font-black text-2xl mb-8 text-[#0f1f36] text-center">Como descreveria a sua escola hoje?</h3>
             <div className="space-y-4">
              {[
                { t: 'Adequada (funcional)', c: 'border-green-400 bg-green-50' },
                { t: 'Parcial (com falhas)', c: 'border-orange-400 bg-orange-50' },
                { t: 'Insuficiente (faltam condições)', c: 'border-red-400 bg-red-50' }
              ].map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => setQ13Answered(true)}
                  className={`w-full text-left p-6 rounded-2xl border-4 transition-all font-black text-lg ${
                    q13Answered ? 'opacity-40 grayscale pointer-events-none' : 'bg-white border-gray-100 hover:border-[#3ac4ee] hover:shadow-md'
                  }`}
                >
                  {opt.t}
                </button>
              ))}
            </div>
            {q13Answered && (
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center font-black text-[#3ac4ee] uppercase tracking-widest text-sm">
                 “Identificar é o primeiro passo para avançar!”
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
           <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pilares.map((p, i) => {
                 const Icon = p.i;
                 return (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white border-4 border-gray-50 hover:border-[#3ac4ee]/30 p-8 rounded-[var(--brand-radius)] flex flex-col items-center justify-center text-center shadow-lg transition-all"
                    >
                       <div className="w-12 h-12 bg-[#3ac4ee]/10 text-[#3ac4ee] rounded-xl flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6" />
                       </div>
                       <h4 className="text-[#0f1f36] font-black text-xl mb-2 uppercase italic">{p.t}</h4>
                       <p className="text-sm font-bold text-gray-400 leading-tight">{p.d}</p>
                    </motion.div>
                 );
              })}
           </motion.div>
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center font-black text-2xl text-[#0f1f36] bg-[#fdec00] p-6 rounded-[2rem] shadow-xl border-4 border-white mt-auto">
             “WASH é saúde e aprendizagem na prática!”
           </motion.div>
        </SlideContainer>
     );
  };

  const renderSlide5 = () => {
    const odsList = [
       { id: 3, label: 'ODS 3 (Saúde)', desc: 'Saúde e Bem-Estar' },
       { id: 4, label: 'ODS 4 (Educação)', desc: 'Educação de Qualidade' },
       { id: 6, label: 'ODS 6 (Água)', desc: 'Água e Saneamento' }
    ];
    const descList = [
       { id: 4, text: 'Melhoria na concentração e desempenho.' },
       { id: 6, text: 'Instalações de rede seguras.' },
       { id: 3, text: 'Redução drástica de infeções.' }
    ];

    const handleOdsClick = (id) => setSelectedOds(id);
    const handleDescClick = (id) => {
       if (!selectedOds) return;
       if (selectedOds === id) {
          setOdsMatches(p => ({...p, [id]: true}));
          setOdsMsg('Excelente! Ligação correta.');
          setSelectedOds(null);
       } else {
          setOdsMsg('Quase! Tente outro bloco.');
          setTimeout(() => setOdsMsg(''), 2000);
          setSelectedOds(null);
       }
    };

    return (
      <SlideContainer title="1.5 ODS e WASH" subtitle="Conectando Metas Globais">
         <p className="mb-8 text-xl font-medium text-gray-400">Arraste mentalmente: Escolha um ODS e depois a sua consequência.</p>
         
         <div className="flex gap-10 mt-4 h-full pb-10">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-1/2 flex flex-col gap-6">
               {odsList.map(o => (
                  <motion.button 
                    key={o.id} 
                    variants={itemVariants}
                    onClick={() => !odsMatches[o.id] && handleOdsClick(o.id)}
                    className={`p-6 rounded-[var(--brand-radius-md)] border-4 text-left font-black transition-all flex flex-col ${
                       odsMatches[o.id] ? 'bg-green-100 border-green-500 opacity-50' :
                       selectedOds === o.id ? 'bg-[#3ac4ee] text-white border-[#3ac4ee] shadow-2xl scale-105' : 'bg-white border-gray-100 shadow-lg hover:border-[#3ac4ee]'
                    }`}
                  >
                     <span className="text-2xl">{o.label}</span>
                     <span className={`text-xs uppercase tracking-widest mt-1 ${selectedOds === o.id ? 'text-white/80' : 'text-[#3ac4ee]'}`}>{o.desc}</span>
                  </motion.button>
               ))}
            </motion.div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-1/2 flex flex-col gap-6">
               {descList.map(d => (
                  <motion.button 
                    key={d.id} 
                    variants={itemVariants}
                    onClick={() => !odsMatches[d.id] && handleDescClick(d.id)}
                    className={`p-6 rounded-[var(--brand-radius-md)] border-4 text-left transition-all h-full shadow-lg ${
                       odsMatches[d.id] ? 'bg-green-100 border-green-500 opacity-50' : 'bg-gray-50 border-gray-100 hover:border-[#3ac4ee] font-bold text-gray-700'
                    }`}
                  >
                     {d.text}
                     {odsMatches[d.id] && <CheckCircle2 className="mt-4 text-green-600" />}
                  </motion.button>
               ))}
             </motion.div>
          </div>
         <AnimatePresence>
            {odsMsg && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full font-black uppercase text-sm border-4 shadow-xl ${odsMsg.includes('Quase') ? 'bg-red-500 text-white border-red-400' : 'bg-[#3ac4ee] text-[#0f1f36] border-white'}`}>
                {odsMsg}
              </motion.div>
            )}
         </AnimatePresence>
      </SlideContainer>
    );
  };

  const renderSlide6 = () => {
     return (
       <SlideContainer title="1.6 O Valor do Investimento" subtitle="Retorno Social e Humano">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0f1f36] text-white p-10 rounded-[3rem] border-8 border-[#3ac4ee]/20 shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#3ac4ee]/10 blur-3xl rounded-full" />
             <h3 className="text-3xl font-black mb-8 text-[#fdec00] uppercase tracking-tighter italic">Classifique os benefícios:</h3>
             <div className="space-y-6">
                {[
                  { t: 'Redução de gastos com saúde familiar.', g: 'Saúde' },
                  { t: 'Inclusão e dignidade para as raparigas.', g: 'Equidade' },
                  { t: 'Melhoria direta no aproveitamento.', g: 'Educação' }
                ].map((b, i) => (
                  <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border-2 border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-[#fdec00] text-[#0f1f36] flex items-center justify-center font-black shadow-lg group-hover:bg-[#3ac4ee] transition-colors">{i+1}</div>
                     <div className="flex-1">
                        <p className="text-xl font-bold leading-tight">{b.t}</p>
                        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#3ac4ee]">{b.g}</span>
                     </div>
                  </motion.div>
                ))}
             </div>
             <button 
               className="mt-12 w-full py-5 bg-[#3ac4ee] text-[#0f1f36] rounded-2xl font-black uppercase text-lg tracking-widest hover:bg-[#fdec00] transition-colors shadow-xl"
               onClick={()=> setClassifications({1:true,2:true,3:true})}
             >
                Validar Benefícios
             </button>
          </motion.div>
       </SlideContainer>
     );
  }

  const renderSlide7 = () => {
     const handleAnswer = (correct) => {
        setIsCorrectCheck(correct);
        setShowFeedbackCheck(true);
        if(correct) setQ17Answered(true);
     }

     return (
       <SlideContainer title="1.7 Desafio Final" subtitle="Teste os seus conhecimentos">
          <div className="h-full flex flex-col justify-center max-w-4xl mx-auto">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gray-50 border-4 border-white p-10 rounded-[3rem] shadow-2xl relative">
                <div className="absolute -top-6 left-10 bg-[#0f1f36] text-[#fdec00] px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest border-4 border-white">Pergunta Final</div>
                <p className="text-2xl sm:text-3xl font-black mb-10 text-[#0f1f36] leading-tight">
                   De que forma o WASH atua como ferramenta de inclusão para as raparigas?
                </p>
                <div className="space-y-4">
                   {[
                     { t: 'Garantindo hidratação constante.', c: false },
                     { t: 'Privacidade e higiene (GHM) evitam faltas escolares.', c: true },
                     { t: 'Reforçando punições por falta de higiene.', c: false }
                   ].map((ans, i) => (
                      <button 
                        key={i}
                        onClick={()=>handleAnswer(ans.c)}
                        disabled={showFeedbackCheck && isCorrectCheck}
                        className={`w-full p-6 border-4 text-left rounded-[var(--brand-radius-md)] text-xl font-black transition-all flex items-center justify-between ${
                          showFeedbackCheck && ans.c ? 'bg-green-100 border-green-500 text-green-900 shadow-md' :
                          showFeedbackCheck && !ans.c ? 'opacity-30 border-gray-100' :
                          'bg-white border-gray-100 hover:border-[#3ac4ee] hover:shadow-xl'
                        }`}
                      >
                         <span>{String.fromCharCode(65+i)}) {ans.t}</span>
                         {showFeedbackCheck && ans.c && <CheckCircle2 className="text-green-600" />}
                      </button>
                   ))}
                </div>
                <AnimatePresence>
                   {showFeedbackCheck && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`mt-8 p-6 rounded-2xl flex items-center gap-4 text-lg font-bold border-4 ${isCorrectCheck ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                         <div className={`p-2 rounded-lg ${isCorrectCheck ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                           {isCorrectCheck ? <Star /> : <AlertCircle />}
                         </div>
                         <p>{isCorrectCheck ? 'Fantástico! Compreendeu o impacto social e de gênero do projeto.' : 'Reveja o impacto do WASH na privacidade e GHM.'}</p>
                      </motion.div>
                   )}
                </AnimatePresence>
             </motion.div>
          </div>
       </SlideContainer>
     );
  }

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


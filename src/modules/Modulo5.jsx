import React, { useState, useEffect } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, AlertCircle, CheckCircle2, RotateCcw,
  ArrowRight, Star, HelpCircle, Target, ShieldCheck,
  CheckCircle, XCircle, ShieldAlert
} from 'lucide-react';

const quizQuestions = [
  {
    q: "1. O que significa WASH?",
    options: ["Água, Saúde e Higiene", "Água, Saneamento e Higiene", "Água, Segurança e Saúde", "Água, Resíduos e Higiene"],
    correct: 1,
    feedbackCorrect: "Certo — WASH integra água, saneamento e higiene.",
    feedbackIncorrect: "Reveja a definição: WASH = água + saneamento + higiene."
  },
  {
    q: "2. Em contexto escolar, por que o WASH é também um tema de equidade?",
    options: ["Reduz o tempo de recreio", "Melhora apenas as notas de matemática", "Remove barreiras que afetam especialmente as raparigas (ex.: GHM)", "Substitui o currículo escolar"],
    correct: 2,
    feedbackCorrect: "Certo — privacidade e condições de higiene reduzem faltas.",
    feedbackIncorrect: "O foco está em remover barreiras à participação escolar."
  },
  {
    q: "3. Qual é o rácio recomendado de sanitas para raparigas?",
    options: ["1 para 10", "1 para 25", "1 para 40", "1 para 50"],
    correct: 1,
    feedbackCorrect: "Certo — o rácio recomendado é 1 para 25 raparigas.",
    feedbackIncorrect: "Consulte os rácios: raparigas 1/25, rapazes 1/50."
  },
  {
    q: "4. Se faltar sabão na escola, qual é a consequência mais imediata?",
    options: ["A água deixa de ser potável", "A lavagem das mãos perde eficácia", "As casas de banho deixam de existir", "A escola passa automaticamente para 3 Estrelas"],
    correct: 1,
    feedbackCorrect: "Certo — sem sabão, a prevenção de transmissão de germes fica comprometida.",
    feedbackIncorrect: "Pense no objetivo: interromper a transmissão de micróbios com lavagem eficaz."
  },
  {
    q: "5. Para uma GHM adequada, o que é essencial na zona da cabine?",
    options: ["Apenas Trinco", "Apenas Água", "Privacidade + Lixeira + Água/Sabão", "Cartaz decorativo obrigatório"],
    correct: 2,
    feedbackCorrect: "Certo — privacidade, gestão de resíduos e higiene são essenciais.",
    feedbackIncorrect: "O essencial é privacidade + lixeira fechada + água/sabão."
  },
  {
    q: "6. O que significa dizer que WASH é tema transversal?",
    options: ["É uma disciplina separada", "Deve ser ensinado apenas em Ciências", "Pode ser integrado em várias disciplinas sem sobrecarregar o currículo", "Substitui conteúdos existentes"],
    correct: 2,
    feedbackCorrect: "Certo — integra-se no currículo existente com exemplos práticos.",
    feedbackIncorrect: "Transversal = integrado em várias áreas e no quotidiano escolar."
  },
  {
    q: "7. Qual é o principal objetivo do \"Jogo da Mão Limpa\"?",
    options: ["Ensinar a escrever melhor", "Mostrar como os micróbios se espalham silenciosamente", "Avaliar a disciplina", "Medir a qualidade da água"],
    correct: 1,
    feedbackCorrect: "Certo — a atividade torna visível a transmissão por contacto.",
    feedbackIncorrect: "A ideia é evidenciar a propagação e reforçar a lavagem correta."
  },
  {
    q: "8. O objetivo principal de um WASH Clube é:",
    options: ["Substituir o pessoal da limpeza", "Organizar competições", "Aumentar protagonismo dos alunos e apoiar monitorização", "Fazer reparos técnicos"],
    correct: 2,
    feedbackCorrect: "Certo — o clube reforça participação, cuidado e continuidade.",
    feedbackIncorrect: "O clube apoia hábitos e monitorização."
  },
  {
    q: "9. \"Monitorização não é fiscalização\". Isto significa:",
    options: ["Serve para punir quem erra", "Serve para manter o sistema a funcionar e prevenir falhas", "É opcional e raro", "Substitui manutenção"],
    correct: 1,
    feedbackCorrect: "Certo — monitorizar ajuda a corrigir cedo e manter continuidade.",
    feedbackIncorrect: "Monitorização é acompanhamento regular."
  },
  {
    q: "10. Um plano de ação realista deve:",
    options: ["Ter muitos objetivos sem prazos", "Começar por uma prioridade, definir ação, responsáveis e prazo", "Depender de recursos externos", "Evitar envolver a comunidade"],
    correct: 1,
    feedbackCorrect: "Certo — foco + ação concreta + responsáveis + prazo = viável.",
    feedbackIncorrect: "Plano eficaz é simples, com prioridades e responsabilidades claras."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export default function Modulo5({ setCanAdvance, saveScore, completeCourse }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setCanAdvance(false);
  }, [setCanAdvance]);

  const handleSelect = (optionIndex) => {
    if (showFeedback) return;
    const isCorrect = optionIndex === quizQuestions[currentQIndex].correct;
    setUserAnswers(prev => [...prev, isCorrect]);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const correctCount = userAnswers.filter(a => a).length;
    const scoreVal = Math.round((correctCount / quizQuestions.length) * 100);
    saveScore(scoreVal);
    if (scoreVal >= 70) completeCourse(scoreVal);
    setQuizFinished(true);
    setCanAdvance(true);
  };

  if (quizFinished) {
    const correctCount = userAnswers.filter(a => a).length;
    const passed = correctCount >= 7;

    return (
      <SlideContainer title="Resultados Finais" subtitle="Conclusão da Jornada WASH">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-4 h-full text-center gap-4"
        >
          <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl relative ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
             {passed ? <Trophy className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
             <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg">
                <Target className="w-5 h-5 text-[#0f1f36]" />
             </div>
          </div>

          <h2 className="text-3xl font-black text-[#0f1f36] uppercase tracking-tighter italic">
             Pontuação: {correctCount * 10}%
          </h2>
          <p className="text-base font-bold text-gray-400">({correctCount} de {quizQuestions.length} questões corretas)</p>

          <AnimatePresence mode="wait">
            {passed ? (
              <motion.div
                key="passed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#0f1f36] text-white p-6 rounded-[2rem] border-8 border-green-500 shadow-2xl max-w-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black uppercase mb-3 text-[#fdec00] italic">Parabéns, Campeão!</h3>
                <p className="text-base opacity-90 leading-relaxed font-medium">
                   Você demonstrou domínio total sobre os pilares do WASH.
                   A certificação foi aprovada e registada com sucesso.
                </p>
                <div className="mt-5 flex items-center gap-3 justify-center text-green-400 font-bold uppercase tracking-widest text-xs">
                   <ShieldCheck className="w-4 h-4" /> Certificado Validado
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="failed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-50 text-red-900 p-6 rounded-[2rem] border-8 border-red-200 shadow-2xl max-w-lg"
              >
                <h3 className="text-2xl font-black uppercase mb-3 italic">Quase lá!</h3>
                <p className="text-base font-bold opacity-70 mb-5 leading-relaxed">
                   Para obter o certificado é necessário pelo menos 70%. <br/>Revise os conteúdos e tente novamente.
                </p>
                <button
                  className="w-full bg-[#0f1f36] text-white py-4 rounded-2xl font-black uppercase text-base flex items-center justify-center gap-3 hover:bg-[#1a3052] transition-colors shadow-lg"
                  onClick={() => {
                     setCurrentQIndex(0);
                     setUserAnswers([]);
                     setShowFeedback(false);
                     setQuizFinished(false);
                     saveScore(0);
                  }}
                >
                  <RotateCcw className="w-5 h-5" /> Tentar Novamente
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </SlideContainer>
    );
  }

  const q = quizQuestions[currentQIndex];
  const choseCorrectly = showFeedback && userAnswers[currentQIndex];

  return (
    <SlideContainer title="Avaliação de Saída" subtitle={`Desafio ${currentQIndex + 1} de ${quizQuestions.length}`}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-3">
        <motion.div variants={itemVariants} className="relative self-start max-w-2xl">
           <div className="absolute -left-3 -top-3 w-10 h-10 bg-[#fdec00] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 z-10">
              <HelpCircle className="text-[#0f1f36] w-5 h-5" />
           </div>
           <h3 className="text-lg font-black text-[#0f1f36] leading-tight bg-gray-50 p-5 rounded-2xl border-4 border-white shadow-xl italic tracking-tight">
             {q.q}
           </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {q.options.map((opt, i) => (
            <motion.button
              key={i}
              variants={itemVariants}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              onClick={() => handleSelect(i)}
              className={`p-4 border-4 rounded-[var(--brand-radius-md)] text-left text-base font-black transition-all flex items-center justify-between relative overflow-hidden ${
                 showFeedback && i === q.correct ? 'bg-green-50 border-green-500 shadow-inner' :
                 showFeedback && userAnswers[currentQIndex] === false && i !== q.correct ? 'opacity-20 border-gray-100' :
                 showFeedback && userAnswers[currentQIndex] === false && i === q.correct ? 'bg-green-50 border-green-500' :
                 'bg-white border-gray-100 hover:border-[#3ac4ee] hover:shadow-xl'
              }`}
            >
              <span className="flex gap-3">
                 <span className="opacity-30 italic shrink-0">{String.fromCharCode(65+i)}</span>
                 {opt}
              </span>
              {showFeedback && i === q.correct && <CheckCircle className="text-green-600 shrink-0 w-5 h-5 ml-2" />}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`fixed bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl z-50 p-5 rounded-[2rem] border-8 shadow-2xl flex flex-col sm:flex-row items-center gap-5 ${choseCorrectly ? 'bg-white border-green-500 shadow-green-500/10' : 'bg-white border-red-500 shadow-red-500/10'}`}
            >
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${choseCorrectly ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {choseCorrectly ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
               </div>
               <div className="flex-1 text-center sm:text-left">
                  <h4 className={`font-black uppercase text-xs tracking-[0.2em] mb-0.5 ${choseCorrectly ? 'text-green-600' : 'text-red-400'}`}>
                    {choseCorrectly ? 'Resposta Exata' : 'Feedback Construtivo'}
                  </h4>
                  <p className="text-base font-bold text-[#0f1f36] leading-tight">
                    {choseCorrectly ? q.feedbackCorrect : q.feedbackIncorrect}
                  </p>
               </div>
               <button
                 onClick={nextQuestion}
                 className="bg-[#0f1f36] text-white px-7 py-3 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#3ac4ee] transition-all flex items-center gap-2 group shadow-lg shrink-0"
               >
                 {currentQIndex < quizQuestions.length - 1 ? 'Próxima' : 'Resultado'}
                 <ArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4" />
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SlideContainer>
  );
}

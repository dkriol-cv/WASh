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
  const [estrelaChecks, setEstrelaChecks] = useState({});
  const [monitorFreq, setMonitorFreq] = useState(null);

  const totalChecks = Object.values(estrelaChecks).filter(Boolean).length;

  useEffect(() => {
    if (currentSlide === 1) {
      if (totalChecks >= 1) onSlideComplete();
    } else if (currentSlide === 2) {
      if (monitorFreq !== null) onSlideComplete();
    } else {
      onSlideComplete();
    }
  }, [currentSlide, totalChecks, monitorFreq, onSlideComplete]);

  const renderSlide1 = () => {
    const criterios = [
      { id: 'b1', nivel: 1, t: 'Lavagem das mãos com sabão em momentos-chave.' },
      { id: 'b2', nivel: 1, t: 'Água potável disponível durante o turno.' },
      { id: 'b3', nivel: 1, t: 'Pelo menos 1 ponto de lavagem próximo das casas de banho.' },
      { id: 's1', nivel: 2, t: 'Casas de banho com privacidade (portas e trincos funcionais).' },
      { id: 's2', nivel: 2, t: 'Rotinas de limpeza definidas e cumpridas.' },
      { id: 's3', nivel: 2, t: 'Sabão e materiais básicos repostos com regularidade.' },
      { id: 's4', nivel: 2, t: 'Condições mínimas para GHM (privacidade + gestão de resíduos).' },
      { id: 'e1', nivel: 3, t: 'Acesso adaptado e inclusivo (acessibilidade e segurança).' },
    ];

    const base = criterios.filter(c => c.nivel === 1);
    const servico = criterios.filter(c => c.nivel === 2);
    const excel = criterios.filter(c => c.nivel === 3);

    const checkedBase = base.every(c => estrelaChecks[c.id]);
    const checkedServico = servico.every(c => estrelaChecks[c.id]);
    const checkedExcel = excel.every(c => estrelaChecks[c.id]);

    const nivel = checkedExcel && checkedServico && checkedBase ? 3
      : checkedServico && checkedBase ? 2
      : checkedBase ? 1 : 0;

    const nivelMsg = [
      'Assinale os critérios que a sua escola já cumpre.',
      '⭐ Nível Básico atingido! Avance para os critérios de Serviço.',
      '⭐⭐ Serviço garantido! Um passo para a Excelência.',
      '⭐⭐⭐ Excelência WASH! A sua escola é uma referência.',
    ];

    const grupos = [
      { label: '⭐ Base (1 Estrela)', items: base, color: 'border-[#fdec00] bg-[#fdec00]/10' },
      { label: '⭐⭐ Serviço (2 Estrelas)', items: servico, color: 'border-[#3ac4ee] bg-[#3ac4ee]/10' },
      { label: '⭐⭐⭐ Excelência (3 Estrelas)', items: excel, color: 'border-[#0f1f36] bg-[#0f1f36]/5' },
    ];

    return (
      <SlideContainer title='4.1 A Abordagem "Três Estrelas"' subtitle="Avalie o Nível da Sua Escola">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-6">
          <motion.p variants={itemVariants} className="text-lg text-gray-500 font-medium">
            A escola avança <span className="text-[#0f1f36] font-black">gradualmente</span>, consolidando o básico antes de investir em melhorias mais exigentes. Assinale o que já cumpre:
          </motion.p>

          <div className="flex flex-col gap-4 overflow-y-auto flex-1 pr-1">
            {grupos.map((grupo) => (
              <motion.div key={grupo.label} variants={itemVariants} className={`rounded-2xl border-4 p-5 ${grupo.color}`}>
                <h4 className="font-black text-sm uppercase tracking-widest text-[#0f1f36] mb-3">{grupo.label}</h4>
                <div className="space-y-2">
                  {grupo.items.map(c => (
                    <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative shrink-0">
                        <input
                          type="checkbox"
                          checked={!!estrelaChecks[c.id]}
                          onChange={e => setEstrelaChecks(p => ({ ...p, [c.id]: e.target.checked }))}
                          className="peer sr-only"
                        />
                        <div className="w-8 h-8 rounded-lg border-2 border-gray-300 peer-checked:bg-[#0f1f36] peer-checked:border-[#0f1f36] flex items-center justify-center transition-all">
                          {estrelaChecks[c.id] && <CheckCircle className="text-[#fdec00] w-5 h-5" />}
                        </div>
                      </div>
                      <span className={`font-bold text-base leading-tight transition-colors ${estrelaChecks[c.id] ? 'text-[#0f1f36]' : 'text-gray-500'}`}>{c.t}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {totalChecks >= 1 && (
              <motion.div
                key={nivel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f1f36] text-white p-5 rounded-2xl font-black text-center text-lg shadow-xl"
              >
                {nivelMsg[nivel]}
                {nivel > 0 && (
                  <p className="text-[#3ac4ee] font-medium text-sm mt-1">
                    Próximo passo: {nivel < 3 ? `consolidar critérios de ${nivel === 1 ? 'Serviço' : 'Excelência'}.` : 'manter e partilhar as boas práticas!'}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </SlideContainer>
    );
  };

  const renderSlide2 = () => (
    <SlideContainer title="4.2 Indicadores de Monitorização" subtitle="Transformando Dados em Ação">
       <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-6">
          <motion.div variants={itemVariants} className="bg-[#fdec00] text-[#0f1f36] font-black text-xl p-6 text-center rounded-[2rem] shadow-xl border-4 border-white">
             <Activity className="mx-auto mb-2" />
             "Monitorizar não é fiscalizar: é cuidar para proteger a saúde de todos."
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                   whileHover={{ y: -8 }}
                   className="p-6 rounded-[2rem] bg-white border-4 border-gray-50 shadow-lg flex flex-col items-center text-center group hover:border-[#3ac4ee] transition-all"
                 >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-[#3ac4ee] group-hover:text-white transition-colors flex items-center justify-center mb-4">
                       <Icon />
                    </div>
                    <h4 className="font-black text-lg italic text-[#0f1f36] uppercase tracking-tighter mb-1 leading-none">{ind.t}</h4>
                    <p className="text-sm font-bold text-gray-400 leading-tight">{ind.d}</p>
                 </motion.div>
               );
             })}
          </div>

          <motion.div variants={itemVariants} className="bg-gray-50 border-4 border-white rounded-2xl p-5 shadow-inner">
            <p className="font-black text-[#0f1f36] uppercase text-sm tracking-widest mb-3">
              Quando faz mais sentido monitorizar na sua escola?
            </p>
            <div className="flex flex-wrap gap-3">
              {['Diariamente', 'Semanalmente', 'Quinzenalmente', 'Mensalmente'].map(op => (
                <button
                  key={op}
                  onClick={() => setMonitorFreq(op)}
                  className={`px-5 py-2 rounded-full font-black text-sm uppercase tracking-wide border-4 transition-all ${
                    monitorFreq === op
                      ? 'bg-[#0f1f36] text-[#fdec00] border-[#0f1f36]'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-[#3ac4ee]'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {monitorFreq && (
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-sm font-bold text-[#3ac4ee]">
                  ✅ Boa escolha! A consistência é o que garante resultados duradouros.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
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

import React, { useState, useEffect } from 'react';
import SlideContainer from '../components/SlideContainer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, BarChart3, ClipboardList, Target, HardHat,
  Handshake, Users2, Trophy, ArrowRight, CheckCircle,
  Activity
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { x: 15, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function Modulo4({ currentSlide, setCanAdvance }) {
  const [planoAcao, setPlanoAcao] = useState({ prob: '', acao: '', tempo: '' });
  const [estrelaChecks, setEstrelaChecks] = useState({});
  const [monitorFreq, setMonitorFreq] = useState(null);

  const totalChecks = Object.values(estrelaChecks).filter(Boolean).length;

  useEffect(() => {
    if (currentSlide === 1) {
      setCanAdvance(totalChecks >= 1);
    } else if (currentSlide === 2) {
      setCanAdvance(monitorFreq !== null);
    } else {
      setCanAdvance(true);
    }
  }, [currentSlide, totalChecks, monitorFreq, setCanAdvance]);

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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-3">
          <motion.p variants={itemVariants} className="text-sm text-gray-500 font-medium">
            A escola avança <span className="text-[#0f1f36] font-black">gradualmente</span>, consolidando o básico antes de investir em melhorias mais exigentes. Assinale o que já cumpre:
          </motion.p>

          <div className="flex flex-col gap-3 overflow-y-auto flex-1 min-h-0 pr-1">
            {grupos.map((grupo) => (
              <motion.div key={grupo.label} variants={itemVariants} className={`rounded-2xl border-4 p-4 ${grupo.color}`}>
                <h4 className="font-black text-xs uppercase tracking-widest text-[#0f1f36] mb-2">{grupo.label}</h4>
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
                        <div className="w-7 h-7 rounded-lg border-2 border-gray-300 peer-checked:bg-[#0f1f36] peer-checked:border-[#0f1f36] flex items-center justify-center transition-all">
                          {estrelaChecks[c.id] && <CheckCircle className="text-[#fdec00] w-4 h-4" />}
                        </div>
                      </div>
                      <span className={`font-bold text-sm leading-tight transition-colors ${estrelaChecks[c.id] ? 'text-[#0f1f36]' : 'text-gray-500'}`}>{c.t}</span>
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
                className="bg-[#0f1f36] text-white p-4 rounded-2xl font-black text-center text-base shadow-xl shrink-0"
              >
                {nivelMsg[nivel]}
                {nivel > 0 && (
                  <p className="text-[#3ac4ee] font-medium text-xs mt-1">
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
       <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-4">
          <motion.div variants={itemVariants} className="bg-[#fdec00] text-[#0f1f36] font-black text-base p-4 text-center rounded-2xl shadow-xl border-4 border-white flex items-center justify-center gap-3">
             <Activity className="shrink-0 w-5 h-5" />
             "Monitorizar não é fiscalizar: é cuidar para proteger a saúde de todos."
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                   whileHover={{ y: -6 }}
                   className="p-4 rounded-2xl bg-white border-4 border-gray-50 shadow-lg flex flex-col items-center text-center group hover:border-[#3ac4ee] transition-all"
                 >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-[#3ac4ee] group-hover:text-white transition-colors flex items-center justify-center mb-3">
                       <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-black text-base italic text-[#0f1f36] uppercase tracking-tighter mb-1 leading-none">{ind.t}</h4>
                    <p className="text-xs font-bold text-gray-400 leading-tight">{ind.d}</p>
                 </motion.div>
               );
             })}
          </div>

          <motion.div variants={itemVariants} className="bg-gray-50 border-4 border-white rounded-2xl p-4 shadow-inner">
            <p className="font-black text-[#0f1f36] uppercase text-xs tracking-widest mb-3">
              Quando faz mais sentido monitorizar na sua escola?
            </p>
            <div className="flex flex-wrap gap-2">
              {['Diariamente', 'Semanalmente', 'Quinzenalmente', 'Mensalmente'].map(op => (
                <button
                  key={op}
                  onClick={() => setMonitorFreq(op)}
                  className={`px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-wide border-4 transition-all ${
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
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm font-bold text-[#3ac4ee]">
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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-4">
           <motion.p variants={itemVariants} className="text-base text-gray-500 font-medium">Um plano eficaz é direto e foca-se no mais <span className="text-[#0f1f36] font-black underline decoration-[#3ac4ee] decoration-4">Urgente</span>.</motion.p>

           <motion.div variants={itemVariants} className="bg-[#0f1f36] p-5 rounded-[2rem] text-white shadow-2xl relative border-t-8 border-[#fdec00]">
              <div className="space-y-4">
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
                       <label className="text-[#fdec00] font-black uppercase text-xs tracking-widest mb-1.5 block">{field.q}</label>
                       <div className="relative group">
                          <select
                             className="w-full p-3 rounded-xl bg-white/10 border-2 border-white/20 text-white font-bold outline-none focus:border-[#3ac4ee] transition-all appearance-none cursor-pointer text-sm"
                             onChange={(e) => setPlanoAcao(p=>({...p, [field.f]: e.target.value}))}
                          >
                             <option value="" className="text-black">Selecione...</option>
                             {field.o.map(opt => <option key={opt.v} value={opt.v} className="text-black">{opt.t}</option>)}
                          </select>
                          <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-[#3ac4ee]" />
                       </div>
                    </div>
                ))}
              </div>
           </motion.div>

           <AnimatePresence>
              {planoAcao.prob && planoAcao.acao && planoAcao.tempo && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="mt-auto bg-green-500 text-[#0f1f36] p-4 rounded-2xl flex items-center gap-4 shadow-xl"
                 >
                    <CheckCircle className="w-6 h-6 shrink-0" />
                    <span className="font-black uppercase tracking-tight italic text-sm">Miniplano Estruturado! Siga para a conclusão.</span>
                 </motion.div>
              )}
           </AnimatePresence>
        </motion.div>
     </SlideContainer>
  );

  const renderSlide4 = () => (
     <SlideContainer title="4.4 Sustentabilidade" subtitle="Parcerias que Fortalecem a Escola">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full gap-4">
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
                 whileHover={{ x: 8 }}
                 className={`p-5 rounded-[2rem] border-4 shadow-2xl flex gap-5 items-center ${item.c}`}
               >
                  <div className={`w-14 h-14 rounded-2xl ${item.c.includes('bg-white') ? 'bg-[#3ac4ee] text-white' : 'bg-white/10 text-white'} flex items-center justify-center shrink-0 shadow-lg`}>
                     <Icon className="w-7 h-7" />
                  </div>
                  <div>
                     <h4 className="font-black text-xl uppercase italic tracking-tighter mb-0.5">{item.t}</h4>
                     <p className="font-bold opacity-80 leading-tight text-sm">{item.a}</p>
                  </div>
               </motion.div>
             );
           })}
        </motion.div>
     </SlideContainer>
  );

  const renderSlide5 = () => (
     <SlideContainer title="4.5 Compromisso Final" subtitle="O Fim é Apenas o Começo">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-full flex flex-col items-center justify-center text-center gap-4">
           <motion.div variants={itemVariants} className="relative group">
              <img
                src="./assets/WASH-Cover-01.jpg"
                alt="Conclusão"
                className="w-full max-w-sm rounded-[3rem] border-8 border-white shadow-2xl h-44 object-cover transform -rotate-1 group-hover:rotate-0 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#3ac4ee]/10 rounded-[3rem] mix-blend-multiply" />
              <div className="absolute -bottom-4 -right-4 bg-[#fdec00] text-[#0f1f36] p-4 rounded-2xl shadow-2xl font-black uppercase text-base transform rotate-3 flex items-center gap-2">
                 <Target className="w-5 h-5" /> 100% Pronto
              </div>
           </motion.div>

           <motion.h3 variants={itemVariants} className="text-2xl font-black text-[#0f1f36] uppercase tracking-tighter italic leading-tight">
              O seu compromisso diário transforma o futuro!
           </motion.h3>

           <motion.p variants={itemVariants} className="text-base text-gray-500 font-bold max-w-lg leading-snug">
              Parabéns por concluir a jornada de aprendizagem. Agora, prove o seu conhecimento no Quiz Final.
           </motion.p>

           <motion.div variants={itemVariants} className="bg-green-100 text-green-800 p-5 rounded-[2rem] border-4 border-dashed border-green-300 flex gap-4 items-center shadow-inner">
              <BarChart3 className="shrink-0 w-8 h-8" />
              <p className="text-left font-bold text-base leading-tight">
                 Atenção: A certificação requer 70% de acerto. Respire fundo e mostre o que aprendeu!
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

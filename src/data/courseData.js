export const modulesData = [
  {
    id: 1,
    title: "Módulo 1: O Conceito WASH e a Sua Urgência",
    slidesCount: 7,
    slides: [
      { id: 1, title: "Bem-vindo à Viagem WASH" },
      { id: 2, title: "O que é o WASH?" },
      { id: 3, title: "O Cenário Local" },
      { id: 4, title: "Porquê a Escola?" },
      { id: 5, title: "ODS e WASH (Associação)" },
      { id: 6, title: "O Valor do Investimento (Classificação)" },
      { id: 7, title: "Knowledge Check" }
    ]
  },
  {
    id: 2,
    title: "Módulo 2: A Infraestrutura e a Escola Amiga do WASH",
    slidesCount: 6,
    slides: [
      { id: 1, title: "Diagnóstico das Instalações (Rácios)" },
      { id: 2, title: "O Coração da Escola WASH" },
      { id: 3, title: "Gestão da Higiene Menstrual" },
      { id: 4, title: "Operação e Manutenção" },
      { id: 5, title: "Código de Conduta" },
      { id: 6, title: "Desafio de Diagnóstico" }
    ]
  },
  {
    id: 3,
    title: "Módulo 3: Práticas Educativas e o Protagonismo Estudantil",
    slidesCount: 8,
    slides: [
      { id: 1, title: "O WASH como Tema Transversal" },
      { id: 2, title: "O Jogo da Mão Limpa (Simulação)" },
      { id: 3, title: "Dramatização e Heróis" },
      { id: 4, title: "Dinâmicas de Grupo" },
      { id: 5, title: "Lavagem das Mãos: 7 Passos" },
      { id: 6, title: "Protagonismo Estudantil" },
      { id: 7, title: "Biblioteca de Recursos" },
      { id: 8, title: "Exercício de Consolidação" }
    ]
  },
  {
    id: 4,
    title: "Módulo 4: Monitorização, Sustentabilidade e Plano de Ação",
    slidesCount: 5,
    slides: [
      { id: 1, title: 'A Abordagem “Três Estrelas” (Autoavaliação)' },
      { id: 2, title: "Monitorização e Indicadores" },
      { id: 3, title: "Elaboração do Miniplano" },
      { id: 4, title: "Sustentabilidade e Parcerias" },
      { id: 5, title: "Compromisso Final" }
    ]
  },
  {
    id: 5,
    title: "Módulo 5: Quiz Final de Conclusão",
    slidesCount: 1,
    slides: [
      { id: 1, title: "Quiz de Avaliação" }
    ]
  }
];

export const getTotalSlides = () => {
    return modulesData.reduce((acc, curr) => acc + curr.slidesCount, 0);
};

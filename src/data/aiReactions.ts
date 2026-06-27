/* ============================================================
   REAÇÕES DE DESDÉM DA IA [SYS.OPTIMUS_JR]
   Agora reagindo de forma condicional à escolha (A ou B)
   ============================================================ */

const REACTIONS_A = [
  'Opção A. Registrado. O comitê de ética já foi acionado.',
  'Análise: Nível de autoconfiança ilusória altíssimo. Prosseguindo.',
  'Sua preferência por escolhas questionáveis é fascinante.',
  'Opção A? Sério? Vou até alocar mais memória pra processar esse erro.',
];

const REACTIONS_B = [
  'Opção B. A chance de sucesso dessa estratégia é de 0.0001%.',
  'Interessante. Catalogado na pasta "Como falhar no mercado de trabalho".',
  'Opção B processada. Eu suspiraria se tivesse pulmões.',
  'Avaliando Opção B... Diagnóstico: Caos iminente. Seguindo em frente.',
];

/** Saudação inicial parametrizada pelo nome do trainee. */
export function buildSaudacao(nome: string): string {
  return `Saudações, ${nome}. Iniciando varredura neural profunda. Não tente mentir.`;
}

/** Retorna uma reação baseada na opção selecionada (A ou B) e no índice da pergunta. */
export function getReaction(opcao: 'A' | 'B', index: number): string {
  if (opcao === 'A') {
    return REACTIONS_A[index % REACTIONS_A.length];
  }
  return REACTIONS_B[index % REACTIONS_B.length];
}

import type { Trainee } from '../types';

/* ============================================================
   BANCO DE DADOS FAKE — 6 TRAINEES / 24 PERGUNTAS ÚNICAS
   Tudo hardcoded. Qualquer resposta leva ao mesmo destino
   pré-determinado (diretoria_real).

   IMPORTANTE: As perguntas agora são insanas, focadas no caos 
   de uma EJ e engenharia, trollando pesado as decisões do trainee.
   ============================================================ */

export const TRAINEES: Trainee[] = [
  {
    id: 'trainee_1',
    nome_display: 'Antônio',
    sigla: 'DGP',
    diretoria_real: 'Diretoria de Gestão de Pessoas',
    imagem_diretoria: '/assets/diretorias/gestao.png',
    lema: 'Onde o cronograma é uma sugestão e o café é obrigatório.',
    perguntas: [
      {
        texto: 'Você fritou acidentalmente a placa-mãe do projeto final, e o cheiro de queimado invadiu a sede. Qual a sua ação imediata?',
        opcaoA: 'Ligo o ventilador e pergunto: "Quem queimou pipoca?"',
        opcaoB: 'Gravo um TikTok pro perfil da EJ com a legenda "O projeto tá pegando fogo! 🔥"',
      },
      {
        texto: 'O Presidente marcou uma Reunião Geral Extraordinária no sábado às 7h da manhã para discutir "Sinergia". Como você sobrevive?',
        opcaoA: 'Entro na chamada do Meet debaixo das cobertas fingindo que a webcam quebrou.',
        opcaoB: 'Apareço na sede com 3 energéticos e assumo a liderança espiritual da reunião.',
      },
      {
        texto: 'Um calouro apagou o banco de dados de produção do cliente porque achou que "Drop Table" era um comando de formatação de tabela.',
        opcaoA: 'Aproveito para repensar toda a arquitetura de dados (chorando em posição fetal).',
        opcaoB: 'Acesso o backup de 2021 e torço pro cliente não lembrar dos últimos 3 anos.',
      },
      {
        texto: 'A impressora 3D da EJ está imprimindo um Yoda há 14 horas e travou no nariz. O que você faz?',
        opcaoA: 'Passo Durepoxi e chamo de Yoda Pós-Batalha Intergalática.',
        opcaoB: 'Desligo da tomada e culpo uma queda de energia na faculdade.',
      },
    ],
  },
  {
    id: 'trainee_2',
    nome_display: 'Cláudio',
    sigla: 'DPJ',
    diretoria_real: 'Diretoria de Projetos',
    imagem_diretoria: '/assets/diretorias/projetos.png',
    lema: 'Faz o impossível com um Arduino e muita fé.',
    perguntas: [
      {
        texto: 'Seu código que rodava perfeitamente na sua máquina explodiu no servidor do cliente. Qual a desculpa técnica?',
        opcaoA: '"O servidor de vocês está fora do alinhamento quântico da Lua."',
        opcaoB: '"Isso não é um bug, é uma feature avançada de stress test no hardware."',
      },
      {
        texto: 'Você esqueceu de comprar os sensores do projeto e a apresentação é amanhã de manhã.',
        opcaoA: 'Faço um bypass com um clipe de papel e digo que é tecnologia Wireless analógica.',
        opcaoB: 'Crio uma apresentação em PowerPoint incrivelmente bonita e prometo versão 2.0.',
      },
      {
        texto: 'Alguém pede para você explicar o que é a Transformada de Laplace no meio do almoço da EJ.',
        opcaoA: 'Pego um guardanapo, risco 3 fórmulas incompreensíveis e saio andando.',
        opcaoB: 'Mudo de assunto rapidamente perguntando se alguém pagou a taxa da federação.',
      },
      {
        texto: 'Um diretor te pede para consertar a geladeira da sede porque "você é da engenharia".',
        opcaoA: 'Abro o motor, arranco um fio aleatório e digo que o compressor fundiu.',
        opcaoB: 'Coloco um Arduino dentro só para piscar um LED e cobro por IoT na geladeira.',
      },
    ],
  },
  {
    id: 'trainee_3',
    nome_display: 'Victor Hugo',
    sigla: 'DPJ',
    diretoria_real: 'Diretoria de Projetos',
    imagem_diretoria: '/assets/diretorias/projetos.png',
    lema: 'Se funciona e ele não sabe por quê, ninguém toca em nada.',
    perguntas: [
      {
        texto: 'Seu braço robótico criado na gambiarra ganhou consciência e está ameaçando bater em quem chega perto.',
        opcaoA: 'Desligo a chave geral do prédio para demonstrar quem é que manda.',
        opcaoB: 'Tento negociar um aumento de salário com o robô assumindo a presidência.',
      },
      {
        texto: 'Você tem um relatório de 50 páginas para entregar em 20 minutos.',
        opcaoA: 'Uso IA para gerar o texto e coloco "Gerado por mim, confia" no rodapé.',
        opcaoB: 'Entrego um PDF corrompido de propósito e ganho 2 dias até o cliente reclamar.',
      },
      {
        texto: 'O professor te reprovou em Cálculo 3 porque você esqueceu o "+ C" no final da integral.',
        opcaoA: 'Invado o sistema do portal acadêmico usando SQL Injection (brincadeira, eu choro).',
        opcaoB: 'Faço uma camiseta escrita "O + C é uma ilusão da Matrix" e vou pra aula todo dia.',
      },
      {
        texto: 'O código legado da EJ tem uma variável chamada `nao_tira_isso_pelo_amor_de_deus`.',
        opcaoA: 'Apago imediatamente para impor dominância sobre o código.',
        opcaoB: 'Crio a variável `isso_aqui_tbm_nao_toca` e deixo o problema para a próxima gestão.',
      },
    ],
  },
  {
    id: 'trainee_4',
    nome_display: 'Wallace',
    sigla: 'DVP',
    diretoria_real: 'Diretoria de Vice-Presidência',
    imagem_diretoria: '/assets/diretorias/vice-presidencia.png',
    lema: 'Assume a glória das decisões e dilui a culpa em comitês.',
    perguntas: [
      {
        texto: 'Você fechou um projeto de 50 mil reais, mas percebeu que orçou um sensor de R$ 500 como R$ 5,00. E agora?',
        opcaoA: 'Crio um "Comitê de Redução de Custos" para culpar o mercado internacional.',
        opcaoB: 'Convenço o cliente de que menos sensores trazem um design mais "minimalista".',
      },
      {
        texto: 'A sede está sem papel higiênico, sem café e o teto tem goteira. A solução de Vice-Presidência é:',
        opcaoA: 'Fazer um processo seletivo urgente focado apenas em "soft skills de sobrevivência".',
        opcaoB: 'Mandar um e-mail passivo-agressivo lembrando a todos dos "Nossos Valores".',
      },
      {
        texto: 'Um trainee pergunta qual a utilidade prática do Planejamento Estratégico (PE).',
        opcaoA: 'Olho fixamente nos olhos dele até ele recuar e pedir desculpas.',
        opcaoB: 'Respondo com 4 jargões corporativos em inglês que nem eu sei o que significam.',
      },
      {
        texto: 'A reunião de Diretoria já dura 4 horas e ninguém decidiu qual será a cor da camisa do evento.',
        opcaoA: 'Abro o microfone, voto "Preto" e desconecto simulando queda de internet.',
        opcaoB: 'Sugiro criar uma Comissão Extraordinária de Design Têxtil.',
      },
    ],
  },
  {
    id: 'trainee_5',
    nome_display: 'Ademilson',
    sigla: 'DCOM',
    diretoria_real: 'Diretoria Comercial',
    imagem_diretoria: '/assets/diretorias/comercial.png',
    lema: 'Acredita no poder do último dia útil do mês.',
    perguntas: [
      {
        texto: 'O cliente quer um sistema de controle de voo espacial, mas a EJ só faz automação de persianas.',
        opcaoA: '"Com certeza, senhor! É basicamente a mesma física, fechado."',
        opcaoB: '"Podemos focar primeiro na automação da persiana da espaçonave, que acha?"',
      },
      {
        texto: 'Você esqueceu de mandar o contrato para assinatura e o cliente já depositou o dinheiro.',
        opcaoA: 'Transfiro para as Ilhas Cayman e mudo de nome para Juan Pablo.',
        opcaoB: 'Mando o contrato dizendo que é uma "atualização padrão da ISO 9001".',
      },
      {
        texto: 'A meta de vendas do mês é 20 mil. Vocês venderam 150 reais vendendo trufas.',
        opcaoA: 'Mudo o dashboard do Power BI para mostrar a meta em Pesos Argentinos.',
        opcaoB: 'Foco na venda de "networking", o verdadeiro lucro invisível.',
      },
      {
        texto: 'O cliente te liga às 3 da manhã de domingo reclamando de um LED queimado.',
        opcaoA: 'Atendo e digo que é uma feature de "Modo Noturno Automático".',
        opcaoB: 'Finjo que o celular está passando por um túnel eterno.',
      },
    ],
  },
  {
    id: 'trainee_6',
    nome_display: 'João Guilherme',
    sigla: 'DMK',
    diretoria_real: 'Diretoria de Marketing',
    imagem_diretoria: '/assets/diretorias/marketing.png',
    lema: 'Sorri por fora, renderiza o caos por dentro.',
    perguntas: [
      {
        texto: 'O diretor pediu para "fazer a logo pular da tela" no novo post do Instagram.',
        opcaoA: 'Exporto o post em 3D, coloco óculos azul e vermelho no diretor e digo que resolveu.',
        opcaoB: 'Uso a fonte Comic Sans em chamas e pergunto se está impactante o suficiente.',
      },
      {
        texto: 'Vocês têm zero orçamento para impulsionar a campanha do Processo Seletivo.',
        opcaoA: 'Vou para a porta do Bandejão gritar com um megafone até ser expulso pela segurança.',
        opcaoB: 'Faço um meme autodepreciativo tão triste que a galera compartilha por pena.',
      },
      {
        texto: 'Na hora de postar um carrossel importante, você esquece de revisar e escreve "Egenharia".',
        opcaoA: 'Respondo nos comentários que é o novo conceito de engenharia minimalista, sem o "n".',
        opcaoB: 'Apago o post e bloqueio todo mundo que já tinha curtido para eliminar testemunhas.',
      },
      {
        texto: 'Pedem para você usar o "Verde Optimus" exato (#136041), mas você usou um verde limão.',
        opcaoA: 'Argumento que os monitores da sede estão descalibrados.',
        opcaoB: 'Digo que é a identidade visual especial para daltônicos (Acessibilidade 100%).',
      },
    ],
  },
];

export function getTraineeById(id: string): Trainee | undefined {
  return TRAINEES.find((t) => t.id === id);
}

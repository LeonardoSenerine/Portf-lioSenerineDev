import type { ProjectId, ProjectKind } from "./projects";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Cases em destaque têm a história completa; os outros só aparecem no índice.
type Decision = { area: string; text: string };
type CaseText = {
  client: string;
  segment: string;
  quote: string;
  concept?: string;
  challenge?: string;
  solution?: string;
  decisions?: Decision[];
};

type ProcessStep = { title: string; tags: string[]; question: string; text: string; example: string };
type Service = { name: string; description: string; features: string[]; recommended: boolean };

const pt = {
  htmlLang: "pt-BR",
  meta: {
    title: "Senerine.dev · Estúdio digital de Leonardo Senerine",
    description:
      "Estúdio digital autoral: sites e aplicações para marcas e negócios que não querem passar batido. Design, código e publicação na mesma mão.",
    keywords: ["estúdio digital", "criação de sites", "site profissional", "desenvolvimento web", "aplicações web", "design de interface", "Next.js", "React", "site para marcas"],
  },
  nav: {
    work: "Cases",
    services: "Serviços",
    process: "Processo",
    about: "Sobre",
    contact: "Contato",
    cta: "Vamos conversar",
    menu: "Menu",
    close: "Fechar",
    switchTo: "EN",
    switchLabel: "Read in English",
    themeLight: "Usar tema claro",
    themeDark: "Usar tema escuro",
  },
  whatsappMessage: "Olá, Leonardo! Vi o senerine.dev e quero conversar sobre um projeto.",
  hero: {
    meta: ["Estúdio digital autoral", "Design + código"],
    latestLabel: "Último no ar",
    titleBefore: "Sites que não passam",
    titleEm: "batido",
    lead: "O Senerine.dev faz sites e aplicações para marcas e negócios que querem ser lembrados. Um estúdio de uma pessoa só: Leonardo Senerine desenha, programa e publica.",
    credit: { name: "Leonardo Senerine", role: "quem faz o Senerine.dev" },
    primary: "Chamar no WhatsApp",
    secondary: "Ver os cases",
    photoAlt: "Leonardo Senerine dentro do ponto azul que fecha o título",
    scroll: "Role",
  },
  beliefs: {
    label: "No que eu acredito",
    items: [
      "Bonito é o mínimo. Lembrado é o objetivo.",
      "Toda escolha tem um porquê. Até o espaço vazio.",
      "Código é onde o design deixa de ser promessa.",
    ],
    closing: "Aqui, nenhum detalhe passa batido.",
  },
  why: {
    kicker: "Por que ter um site",
    title: "Rede social é vitrine. Site é endereço",
    intro: "O Instagram mostra o que você posta. O site é o lugar que é seu: onde a marca se apresenta inteira, do jeito que você decidiu.",
    points: [
      { title: "Endereço próprio", text: "Domínio seu, conteúdo seu, regras suas. Nas redes, o alcance muda toda semana." },
      { title: "Atende de madrugada", text: "Mostra quem você é, onde fica e como chamar. Às três da manhã, com a loja fechada, ele continua respondendo." },
      { title: "Aparece quando procuram", text: "Quem precisa do que você faz costuma começar pelo Google. O site é o que aparece ali." },
    ],
  },
  work: {
    kicker: "Cases",
    title: "Cada marca pediu uma resposta diferente",
    intro: "Cada case abaixo tem as cores da própria marca e as decisões que deram forma a ele.",
    kindLabel: { real: "Projeto real", concept: "Proposta conceitual" } as Record<ProjectKind, string>,
    labels: {
      concept: "Conceito",
      challenge: "Desafio",
      solution: "Solução",
      decisions: "Decisões",
      client: "Cliente",
      year: "Ano",
      role: "Papel",
      roleValue: "Design, código e publicação",
      stack: "Feito com",
      status: "Status",
      visit: "Ver no ar",
      visitCase: "Ver o site",
      cursor: "Ver no ar",
      private: "Link privado, a pedido dos noivos",
    },
    moreTitle: "Mais trabalhos",
    items: {
      suramu: {
        client: "SURAMU",
        segment: "Real sushi · delivery de quebrada",
        quote: "Uma marca de rua com voz alta e um cardápio que muda todo dia.",
        concept:
          "Grafite encontra a tradição japonesa. A marca já tinha atitude nos pôsteres; o site precisava falar alto do mesmo jeito.",
        challenge:
          "Um cardápio que muda todo dia, um público que chega pelo Instagram no celular e uma marca que se define pelo que recusa: salmão e cream cheese.",
        solution:
          "Tag em grafite pintada na tela como spray, manifesto em três telas, quadro de peixes do dia, rota do mercado ao balcão, loja, eventos e pedido pelo WhatsApp e pelo iFood.",
        decisions: [
          { area: "Marca", text: "O manifesto vem antes do cardápio. Quem chega precisa entender a atitude antes de ver o preço." },
          { area: "UX", text: "O quadro de peixes do dia mora num único arquivo. O dono troca o peixe sem mexer no site." },
          { area: "Código", text: "HTML, CSS e JavaScript puros: um delivery não precisa carregar um framework para mostrar o peixe do dia." },
        ],
      },
      meraki: {
        client: "Meraki Galleria Shop",
        segment: "Tatuagem e barbearia",
        quote: "O nome já existia no letreiro da recepção. Faltava virar site.",
        concept: "A identidade vem do real: o letreiro dourado da recepção, redesenhado em SVG e animado traço a traço.",
        challenge:
          "Tatuagem e barbearia no mesmo endereço, com públicos e jeitos de agendar diferentes, e um trabalho forte no Instagram que não aparecia no Google.",
        solution:
          "Galeria editorial em preto e branco, agendamento que muda de destino conforme a seção e HTML pré-renderizado para o Google ler o site inteiro.",
        decisions: [
          { area: "Marca", text: "O dourado saiu do próprio letreiro. As tatuagens ficam em preto e branco, a especialidade da casa." },
          { area: "UX", text: "O botão de agendar acompanha a leitura: WhatsApp do tatuador ou agenda da barbearia, conforme a parte do site." },
          { area: "Imagem", text: "Prints de 290px viraram fotos nítidas com super-resolução por IA, misturada à original para a pele não ficar de plástico." },
        ],
      },
      dconde: {
        client: "D'Conde Barbearia",
        segment: "Barbearia com hora marcada",
        quote: "Do primeiro commit ao sistema em uso em duas semanas.",
        concept:
          "Uma barbearia clássica com um sistema moderno por trás: o cliente marca em quatro passos e a equipe administra tudo num painel.",
        challenge: "17 serviços com durações diferentes, barbeiros com horários que mudam a cada dia e toda a agenda combinada à mão pelo WhatsApp.",
        solution:
          "Site, agendamento em 4 etapas, login sem senha por código no e-mail e painel com 9 módulos, de agenda a estoque. E-mails automáticos lembram o cliente 3 horas antes.",
        decisions: [
          { area: "Código", text: "Preço, horário e permissão são validados no Postgres. A tela só mostra o que o banco permite." },
          { area: "UX", text: "O cliente vê só os horários realmente livres e marca sem criar senha." },
          { area: "Segurança", text: "Dois clientes no mesmo horário? O banco recusa qualquer sobreposição, inclusive de serviços que ocupam várias horas." },
        ],
      },
      gordinho: {
        client: "Gordinho Lanches",
        segment: "Hamburgueria desde 1992",
        quote: "34 anos de história que só existiam num mural na parede.",
        concept: "A história que já existia fisicamente na parede virou o centro da experiência digital.",
        challenge: "Uma hamburgueria de 1992 com uma trajetória que ninguém encontrava na internet; quem procurava a casa achava pouca informação útil.",
        solution:
          "Linha do tempo ano a ano, do carrinho de 1992 ao salão de hoje, horários que mudam conforme o dia e pedido pelo WhatsApp e pelo iFood.",
        decisions: [
          { area: "Estratégia", text: "Sem cardápio no site: o foco é o legado, a família e o pedido pelo WhatsApp." },
          { area: "Marca", text: "O emblema foi redesenhado em SVG sem o \"self service\", que a casa não oferece mais." },
          { area: "Imagem", text: "O mascote foi recortado do logo original e virou personagem do site." },
        ],
      },
      samoa: {
        client: "Samoa Gastrobar",
        segment: "Gastrobar com música ao vivo",
        quote: "10,2 mil seguidores e, fora do Instagram, só um cardápio em PDF.",
        concept: "Casa verde, música ao vivo e drinks autorais: o site vende a noite inteira, do almoço ao show.",
        challenge:
          "Quem procurava bar, almoço ou música ao vivo não achava cardápio, preço nem agenda. O link da bio levava a PDFs pesados e invisíveis para o Google.",
        solution:
          "Cardápio em página com 42 itens do cardápio oficial, agenda de shows que se atualiza sozinha, SEO local e mapa que só carrega com consentimento.",
        decisions: [
          { area: "Estratégia", text: "Para um bar, o link mandado no WhatsApp é a vitrine. Por isso cada página sai pré-renderizada, com a prévia de imagem funcionando." },
          { area: "UX", text: "Os shows moram numa lista: os que passaram somem e os próximos sobem para o topo, sem ninguém mexer." },
          { area: "Performance", text: "As fotos vindas do Instagram somavam 7 MB e viraram 1,6 MB em WebP, no tamanho em que aparecem." },
        ],
      },
      pontoalto: {
        client: "Ponto Alto · Clube da Música",
        segment: "Casa de shows",
        quote: "Uma casa de shows que só tinha flyers.",
      },
      convite: {
        client: "Convite de casamento",
        segment: "Evento",
        quote: "Um convite que confirma presença sozinho.",
      },
    } as Record<ProjectId, CaseText>,
  },
  areas: {
    kicker: "Áreas",
    title: "Trabalho com qualquer área",
    list: ["Restaurantes", "Barbearias", "Estúdios de tatuagem", "Casas de show", "Advocacia", "Clínicas", "Construção", "Eventos", "Lojas"],
    last: "e a sua",
    note: "Do escritório de advocacia à lanchonete da esquina, começo sempre pela mesma pergunta: quem é o seu cliente e o que ele precisa ver para te chamar?",
    cta: "Me conta do seu negócio",
  },
  services: {
    kicker: "Serviços",
    title: "Três formatos, o mesmo cuidado",
    intro: "Todo projeto sai com design próprio, pensado primeiro para o celular, rápido e pronto para ser encontrado.",
    recommended: "Recomendado",
    items: [
      {
        name: "Landing page",
        description: "Uma página que apresenta a marca e leva direto ao contato.",
        features: ["Design sob medida", "Pensada primeiro para o celular", "WhatsApp, mapa e Instagram", "Publicação com domínio próprio"],
        recommended: false,
      },
      {
        name: "Site completo",
        description: "A presença digital inteira: várias páginas, o conteúdo da casa e tudo pronto para o Google.",
        features: ["Várias páginas: cardápio, agenda, eventos", "SEO e dados estruturados", "Prévia de link caprichada para o WhatsApp", "Privacidade e cookies (LGPD)"],
        recommended: true,
      },
      {
        name: "Sistema sob medida",
        description: "Quando o site precisa trabalhar: agendar, avisar e organizar.",
        features: ["Agendamento online", "Área do cliente sem senha", "Painel de gestão", "Notificações automáticas"],
        recommended: false,
      },
    ] as Service[],
    maintenance: "Manutenção mensal: mudou o cardápio, a agenda ou uma foto? Você me manda no WhatsApp e eu atualizo.",
  },
  direct: {
    kicker: "Diferencial",
    title: "Você fala com quem faz",
    intro: "Numa agência, o seu pedido passa de mão em mão. Aqui, quem ouve é quem desenha, programa e publica.",
    agencyLabel: "Numa agência",
    agencyChain: ["Você", "Atendimento", "Designer", "Desenvolvedor", "Publicação"],
    agencyNote: "cada passagem é um recado a mais",
    senerineLabel: "No Senerine.dev",
    you: "Você",
    me: "Leonardo",
    senerineNote: "um recado só",
    benefits: [
      { title: "Sem intermediário", text: "Quem ouve o pedido é quem desenha e escreve o código." },
      { title: "Decisão rápida", text: "Uma dúvida se resolve numa mensagem, direto com quem decide." },
      { title: "Um responsável", text: "Do primeiro rabisco ao deploy, você sabe exatamente com quem falar." },
      { title: "Valor fechado", text: "Proposta por escrito antes de começar. O que está nela é o que você paga." },
      { title: "Prévia ao vivo", text: "Você acompanha o site sendo feito por um link e pede ajustes no caminho." },
      { title: "Por perto depois", text: "Trocar um preço, uma foto ou um horário é só me mandar uma mensagem." },
    ],
  },
  process: {
    kicker: "Processo",
    title: "Código é a última etapa",
    intro: "Antes de abrir o editor, todo projeto passa por cinco etapas. Ao lado, o caminho da SURAMU.",
    steps: [
      {
        title: "Entender",
        tags: ["marca", "objetivo", "usuário"],
        question: "Quem é essa marca, o que ela quer e quem ela precisa alcançar?",
        text: "A personalidade e o objetivo vêm antes da paleta.",
        example: "A SURAMU se recusa a ter salmão e cream cheese. Isso virou o site inteiro.",
      },
      {
        title: "Conceber",
        tags: ["conteúdo", "roteiro", "design"],
        question: "O que a pessoa sente a cada rolagem?",
        text: "O roteiro e o sistema visual existem antes da tela.",
        example: "Na SURAMU, um manifesto por tela antes do cardápio. Primeiro a atitude, depois o peixe.",
      },
      {
        title: "Construir",
        tags: ["interface", "tecnologia"],
        question: "Qual é a ferramenta certa para o tamanho do problema?",
        text: "Só agora o código entra.",
        example: "Na SURAMU, HTML puro e um arquivo que o dono edita para trocar o peixe do dia.",
      },
      {
        title: "Refinar",
        tags: ["detalhe", "performance", "acessibilidade"],
        question: "O que ainda sobra e o que ainda falta?",
        text: "Cada tela é revisada no celular, com imagens leves e contraste de verdade.",
        example: "Quem pede chega pelo Instagram: o botão de pedir aparece primeiro e funciona a partir de 375px.",
      },
      {
        title: "Publicar",
        tags: ["domínio", "SEO", "acompanhamento"],
        question: "Como o site chega a quem precisa dele?",
        text: "Domínio, Google, prévia de link e acompanhamento depois do ar.",
        example: "Capa de link própria para o WhatsApp, versionada para nenhum cache mostrar a antiga.",
      },
    ] as ProcessStep[],
    artifacts: {
      poster: "Pôster da SURAMU: nosso sushi não tem cream cheese",
      manifesto: "O manifesto da SURAMU ocupando a tela inteira",
      code: "data/peixes-do-dia.js",
      mobile: "A primeira tela da SURAMU no celular, com o botão de pedir",
      og: "A capa de link da SURAMU no WhatsApp",
    },
  },
  about: {
    kicker: "Sobre",
    title: "Prazer, Leonardo.",
    philosophy: "Gosto do momento em que ninguém consegue dizer onde termina o design e começa o código",
    name: "Leonardo Senerine",
    role: "Full stack developer · Senerine.dev",
    paragraphs: [
      "Penso como quem desenha e construo como quem programa. Marca, arquitetura, performance e interface entram na mesma conversa, porque no fim viram uma coisa só: a experiência de quem usa.",
      "Quem ouve o seu pedido é quem escreve o código, então nada se perde no caminho. Foi assim que a D'Conde saiu do primeiro rascunho para um sistema em uso em duas semanas.",
      "Por isso o Senerine.dev é um estúdio de uma pessoa só, por escolha: cada projeto passa pelas mesmas mãos do primeiro rabisco ao deploy.",
    ],
    photoAlt: "Leonardo Senerine em preto e branco",
    skills: ["Design de interface", "Desenvolvimento full stack", "Next.js", "React", "TypeScript", "SEO técnico", "Performance web"],
  },
  tools: {
    kicker: "Ferramentas",
    title: "A ferramenta depende do problema",
    items: [
      { tools: "React e Next.js", text: "quando a interface precisa crescer sem perder velocidade.", proof: "Gordinho, D'Conde" },
      { tools: "TypeScript", text: "em tudo que precisa durar depois do lançamento.", proof: "Meraki, D'Conde, Samoa" },
      { tools: "APIs e banco de dados", text: "quando o site precisa trabalhar: agenda, login, painel e avisos.", proof: "D'Conde" },
      { tools: "Node.js e Python", text: "nos bastidores: scripts, automações e tratamento de imagem.", proof: "Meraki" },
      { tools: "Tailwind ou CSS puro", text: "o que deixar a página mais leve e mais fácil de manter.", proof: "D'Conde, SURAMU" },
    ],
    note: "Este site: Next.js, TypeScript e CSS escrito à mão.",
  },
  faq: {
    kicker: "Dúvidas",
    title: "Antes de você perguntar",
    items: [
      {
        q: "Quanto custa?",
        a: "Depende do que o site precisa fazer. Depois de uma conversa rápida, mando uma proposta com valor fechado. O que está nela é o que você paga.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Uma landing page fica pronta em poucas semanas. Sistemas levam um pouco mais. O prazo vai escrito na proposta.",
      },
      {
        q: "Preciso ter domínio e hospedagem?",
        a: "Não. Eu ajudo a registrar o domínio e cuido da publicação. Para a maioria dos sites, a hospedagem tem custo baixo ou zero.",
      },
      {
        q: "Vou conseguir atualizar o conteúdo?",
        a: "Sim. Posso fazer as trocas numa manutenção mensal ou, se fizer sentido, montar um painel para você editar sozinho.",
      },
      {
        q: "O site vai aparecer no Google?",
        a: "Ele sai preparado para a busca: endereço, horário, dados estruturados e páginas que o Google consegue ler. A posição também depende da concorrência e do seu perfil no Google.",
      },
      {
        q: "Você atende na minha cidade?",
        a: "Atendo clientes de qualquer lugar. Todo o processo funciona a distância, por vídeo ou WhatsApp.",
      },
    ],
  },
  contact: {
    kicker: "Contato",
    titleBefore: "Vamos fazer o seu não passar",
    titleEm: "batido",
    text: "Me conta da marca e do que ela precisa. Quem responde sou eu.",
    primary: "Chamar no WhatsApp",
    email: "Mandar e-mail",
  },
  footer: {
    role: "Estúdio digital autoral",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    made: "Feito à mão em Next.js. Nada aqui passou batido.",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  htmlLang: "en",
  meta: {
    title: "Senerine.dev · Leonardo Senerine's digital studio",
    description:
      "An independent digital studio: websites and apps for brands and businesses that refuse to be scrolled past. Design, code and launch in one pair of hands.",
    keywords: ["digital studio", "website design", "custom website", "web development", "web apps", "interface design", "Next.js", "React", "brand website"],
  },
  nav: {
    work: "Work",
    services: "Services",
    process: "Process",
    about: "About",
    contact: "Contact",
    cta: "Let's talk",
    menu: "Menu",
    close: "Close",
    switchTo: "PT",
    switchLabel: "Ler em português",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },
  whatsappMessage: "Hi Leonardo! I found senerine.dev and would like to talk about a project.",
  hero: {
    meta: ["Independent digital studio", "Design + code"],
    latestLabel: "Latest launch",
    titleBefore: "Websites nobody scrolls",
    titleEm: "past",
    lead: "Senerine.dev makes websites and apps for brands and businesses that want to be remembered. A one-person studio: Leonardo Senerine designs, codes and launches.",
    credit: { name: "Leonardo Senerine", role: "the person behind Senerine.dev" },
    primary: "Message on WhatsApp",
    secondary: "See the work",
    photoAlt: "Leonardo Senerine inside the blue dot that ends the headline",
    scroll: "Scroll",
  },
  beliefs: {
    label: "What I believe",
    items: [
      "Pretty is the baseline. Memorable is the goal.",
      "Every choice has a reason. Even the empty space.",
      "Code is where design stops being a promise.",
    ],
    closing: "Here, no detail goes unnoticed.",
  },
  why: {
    kicker: "Why a website",
    title: "Social media is a shop window. A website is your address",
    intro: "Instagram shows what you post. A website is the place that's yours: where the brand shows up whole, the way you decided.",
    points: [
      { title: "Your own address", text: "Your domain, your content, your rules. On social media, reach changes every week." },
      { title: "Open at 3 a.m.", text: "It shows who you are, where you are and how to reach you. At three in the morning, with the shop closed, it keeps answering." },
      { title: "Found when people search", text: "People who need what you do usually start on Google. The website is what shows up there." },
    ],
  },
  work: {
    kicker: "Work",
    title: "Every brand asked for a different answer",
    intro: "Each case below wears the brand's own colors, along with the decisions that shaped it.",
    kindLabel: { real: "Real project", concept: "Concept proposal" },
    labels: {
      concept: "Concept",
      challenge: "Challenge",
      solution: "Solution",
      decisions: "Decisions",
      client: "Client",
      year: "Year",
      role: "Role",
      roleValue: "Design, code and launch",
      stack: "Built with",
      status: "Status",
      visit: "Visit live site",
      visitCase: "Visit the site",
      cursor: "Visit live",
      private: "Private link, at the couple's request",
    },
    moreTitle: "More work",
    items: {
      suramu: {
        client: "SURAMU",
        segment: "Real sushi · street delivery",
        quote: "A street brand with a loud voice and a menu that changes every day.",
        concept: "Graffiti meets Japanese tradition. The brand already had attitude on its posters; the site had to speak just as loud.",
        challenge:
          "A menu that changes daily, customers who arrive from Instagram on their phones and a brand defined by what it refuses: salmon and cream cheese.",
        solution:
          "A graffiti tag sprayed onto the screen, a three-screen manifesto, a fish-of-the-day board, a route from market to counter, a shop, events and ordering via WhatsApp and iFood.",
        decisions: [
          { area: "Brand", text: "The manifesto comes before the menu. Visitors need to get the attitude before they see a price." },
          { area: "UX", text: "The fish-of-the-day board lives in a single file. The owner changes the fish without touching the site." },
          { area: "Code", text: "Plain HTML, CSS and JavaScript: a delivery doesn't need to ship a framework to show today's fish." },
        ],
      },
      meraki: {
        client: "Meraki Galleria Shop",
        segment: "Tattoo and barbershop",
        quote: "The name already existed on the reception sign. It just had to become a website.",
        concept: "The identity comes from the real thing: the golden reception sign, redrawn in SVG and animated stroke by stroke.",
        challenge:
          "Tattoo studio and barbershop at the same address, with different audiences and ways to book, and strong work on Instagram that never showed up on Google.",
        solution:
          "A black and white editorial gallery, booking that changes destination by section and pre-rendered HTML so Google reads the whole site.",
        decisions: [
          { area: "Brand", text: "The gold came straight from the sign. Tattoos stay in black and white, the house specialty." },
          { area: "UX", text: "The booking button follows the reading: the tattoo artist's WhatsApp or the barbershop calendar, depending on the section." },
          { area: "Imagery", text: "290px screenshots became sharp photos with AI super-resolution, blended with the original so skin never looks plastic." },
        ],
      },
      dconde: {
        client: "D'Conde Barbearia",
        segment: "Appointment-only barbershop",
        quote: "From first commit to a system in daily use in two weeks.",
        concept: "A classic barbershop with a modern system behind it: clients book in four steps and the team runs everything from a dashboard.",
        challenge: "17 services with different durations, barbers whose hours change every day and the whole schedule arranged by hand over WhatsApp.",
        solution:
          "Website, 4-step booking, passwordless login with an email code and a 9-module dashboard, from schedule to stock. Automatic emails remind clients 3 hours ahead.",
        decisions: [
          { area: "Code", text: "Price, time slot and permissions are validated in Postgres. The screen only shows what the database allows." },
          { area: "UX", text: "Clients only see slots that are truly free and book without creating a password." },
          { area: "Security", text: "Two clients, same slot? The database rejects any overlap, including services that take several hours." },
        ],
      },
      gordinho: {
        client: "Gordinho Lanches",
        segment: "Burger joint since 1992",
        quote: "34 years of history that only lived on a mural on the wall.",
        concept: "The story that already existed on the wall became the center of the digital experience.",
        challenge: "A burger joint from 1992 with a story nobody could find online; people looking it up found little useful information.",
        solution:
          "A year-by-year timeline, from the 1992 food cart to today's dining room, opening hours that change by day and ordering via WhatsApp and iFood.",
        decisions: [
          { area: "Strategy", text: "No menu on the site: the focus is the legacy, the family and ordering on WhatsApp." },
          { area: "Brand", text: "The emblem was redrawn in SVG without the \"self service\" line, which the place no longer offers." },
          { area: "Imagery", text: "The mascot was cut out of the original logo and became a character on the site." },
        ],
      },
      samoa: {
        client: "Samoa Gastrobar",
        segment: "Gastrobar with live music",
        quote: "10.2k followers and, outside Instagram, nothing but a PDF menu.",
        concept: "A green house, live music and signature drinks: the site sells the whole night, from lunch to the show.",
        challenge:
          "People looking for a bar, lunch or live music found no menu, prices or schedule. The bio link led to heavy PDFs that Google couldn't see.",
        solution:
          "A menu page with 42 items from the official menu, a gig calendar that updates itself, local SEO and a map that only loads with consent.",
        decisions: [
          { area: "Strategy", text: "For a bar, the link shared on WhatsApp is the shop window. That's why every page is pre-rendered, with the image preview working." },
          { area: "UX", text: "Shows live in a list: past ones disappear and the next ones rise to the top, with nobody touching it." },
          { area: "Performance", text: "Photos from Instagram added up to 7 MB and became 1.6 MB in WebP, at the size they're shown." },
        ],
      },
      pontoalto: {
        client: "Ponto Alto · Clube da Música",
        segment: "Live music venue",
        quote: "A music venue that only had flyers.",
      },
      convite: {
        client: "Wedding invitation",
        segment: "Event",
        quote: "An invitation that collects RSVPs on its own.",
      },
    },
  },
  areas: {
    kicker: "Fields",
    title: "I work with any field",
    list: ["Restaurants", "Barbershops", "Tattoo studios", "Music venues", "Law firms", "Clinics", "Construction", "Events", "Shops"],
    last: "and yours",
    note: "From a law firm to the diner around the corner, I always start with the same question: who is your customer, and what do they need to see before they reach out?",
    cta: "Tell me about your business",
  },
  services: {
    kicker: "Services",
    title: "Three formats, the same care",
    intro: "Every project ships with its own design, built mobile first, fast and ready to be found.",
    recommended: "Recommended",
    items: [
      {
        name: "Landing page",
        description: "One page that presents the brand and leads straight to contact.",
        features: ["Custom design", "Mobile first", "WhatsApp, map and Instagram", "Launched on your own domain"],
        recommended: false,
      },
      {
        name: "Full website",
        description: "Your whole digital presence: multiple pages, the brand's own content and everything ready for Google.",
        features: ["Multiple pages: menu, calendar, events", "SEO and structured data", "Polished WhatsApp link preview", "Privacy and cookie policies"],
        recommended: true,
      },
      {
        name: "Custom system",
        description: "When the site has to do work: book, notify and organize.",
        features: ["Online booking", "Passwordless client area", "Management dashboard", "Automatic notifications"],
        recommended: false,
      },
    ],
    maintenance: "Monthly care plan: new menu, new dates, a new photo? Send it to me on WhatsApp and I'll update it.",
  },
  direct: {
    kicker: "The difference",
    title: "You talk to the person who builds it",
    intro: "At an agency, your request passes from hand to hand. Here, the person who listens is the one who designs, codes and launches.",
    agencyLabel: "At an agency",
    agencyChain: ["You", "Account", "Designer", "Developer", "Launch"],
    agencyNote: "every handoff is one more message",
    senerineLabel: "At Senerine.dev",
    you: "You",
    me: "Leonardo",
    senerineNote: "one message",
    benefits: [
      { title: "No middlemen", text: "The person who hears the request designs it and writes the code." },
      { title: "Fast decisions", text: "A question gets solved in one message, straight with the person who decides." },
      { title: "One person accountable", text: "From first sketch to deploy, you know exactly who to talk to." },
      { title: "Fixed price", text: "Written proposal before any work starts. What's in it is what you pay." },
      { title: "Live preview", text: "You follow the site being built through a link and ask for changes along the way." },
      { title: "Close after launch", text: "Changing a price, a photo or opening hours is just a message to me." },
    ],
  },
  process: {
    kicker: "Process",
    title: "Code is the last step",
    intro: "Before I open the editor, every project goes through five stages. Alongside, how SURAMU went through them.",
    steps: [
      {
        title: "Understand",
        tags: ["brand", "goal", "people"],
        question: "Who is this brand, what does it want and who does it need to reach?",
        text: "Personality and goals come before the palette.",
        example: "SURAMU refuses salmon and cream cheese. That became the whole site.",
      },
      {
        title: "Conceive",
        tags: ["content", "script", "design"],
        question: "What does a person feel with every scroll?",
        text: "The script and the visual system exist before the screen.",
        example: "At SURAMU, one manifesto line per screen before the menu. Attitude first, then the fish.",
      },
      {
        title: "Build",
        tags: ["interface", "technology"],
        question: "What's the right tool for the size of the problem?",
        text: "Only now does code come in.",
        example: "At SURAMU, plain HTML and a single file the owner edits to change the fish of the day.",
      },
      {
        title: "Refine",
        tags: ["detail", "performance", "accessibility"],
        question: "What's still too much, and what's still missing?",
        text: "Every screen is reviewed on a phone, with light images and real contrast.",
        example: "Customers arrive from Instagram: the order button comes first and works from 375px up.",
      },
      {
        title: "Launch",
        tags: ["domain", "SEO", "follow-up"],
        question: "How does the site reach the people who need it?",
        text: "Domain, Google, link preview and follow-up after it goes live.",
        example: "A dedicated WhatsApp link cover, versioned so no cache ever shows the old one.",
      },
    ],
    artifacts: {
      poster: "SURAMU poster: our sushi has no cream cheese",
      manifesto: "SURAMU's manifesto filling the whole screen",
      code: "data/peixes-do-dia.js",
      mobile: "SURAMU's first screen on a phone, with the order button",
      og: "SURAMU's link cover on WhatsApp",
    },
  },
  about: {
    kicker: "About",
    title: "Hi, I'm Leonardo.",
    philosophy: "I love the moment nobody can tell where the design ends and the code begins",
    name: "Leonardo Senerine",
    role: "Full stack developer · Senerine.dev",
    paragraphs: [
      "I think like someone who designs and build like someone who codes. Brand, architecture, performance and interface sit in the same conversation, because in the end they become one thing: the experience of the person using it.",
      "The person who hears your request is the one writing the code, so nothing gets lost along the way. That's how D'Conde went from first sketch to a system in daily use in two weeks.",
      "That's why Senerine.dev is a one-person studio, by choice: every project goes through the same hands from first sketch to deploy.",
    ],
    photoAlt: "Leonardo Senerine in black and white",
    skills: ["Interface design", "Full stack development", "Next.js", "React", "TypeScript", "Technical SEO", "Web performance"],
  },
  tools: {
    kicker: "Tools",
    title: "The tool depends on the problem",
    items: [
      { tools: "React and Next.js", text: "when the interface needs to grow without slowing down.", proof: "Gordinho, D'Conde" },
      { tools: "TypeScript", text: "in everything that has to last after launch.", proof: "Meraki, D'Conde, Samoa" },
      { tools: "APIs and databases", text: "when the site has to do work: booking, login, dashboards and alerts.", proof: "D'Conde" },
      { tools: "Node.js and Python", text: "behind the scenes: scripts, automation and image processing.", proof: "Meraki" },
      { tools: "Tailwind or plain CSS", text: "whatever keeps the page lighter and easier to maintain.", proof: "D'Conde, SURAMU" },
    ],
    note: "This site: Next.js, TypeScript and hand-written CSS.",
  },
  faq: {
    kicker: "FAQ",
    title: "Before you ask",
    items: [
      {
        q: "How much does it cost?",
        a: "It depends on what the site needs to do. After a quick chat I send a fixed-price proposal. What's in it is what you pay.",
      },
      {
        q: "How long does it take?",
        a: "A landing page takes a few weeks. Systems take a bit longer. The timeline is written into the proposal.",
      },
      {
        q: "Do I need a domain and hosting?",
        a: "No. I help you register the domain and handle the launch. For most sites, hosting costs little or nothing.",
      },
      {
        q: "Will I be able to update the content?",
        a: "Yes. I can make updates on a monthly plan or, when it makes sense, build a dashboard so you can edit it yourself.",
      },
      {
        q: "Will the site show up on Google?",
        a: "It ships ready for search: address, hours, structured data and pages Google can read. Ranking also depends on competition and your Google Business profile.",
      },
      {
        q: "Do you work with clients in my city?",
        a: "I work with clients anywhere. The whole process works remotely, over video calls or WhatsApp.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    titleBefore: "Let's make yours the one nobody scrolls",
    titleEm: "past",
    text: "Tell me about the brand and what it needs. I'm the one who replies.",
    primary: "Message on WhatsApp",
    email: "Send an email",
  },
  footer: {
    role: "Independent digital studio",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    made: "Handmade in Next.js. Nothing here went unnoticed.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

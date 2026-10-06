import type { ProjectId, ProjectKind } from "./projects";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Cases em destaque têm a história completa; os outros só aparecem no índice.
type CaseText = {
  client: string;
  segment: string;
  quote: string;
  objective?: string;
  concept?: string;
  solution?: string;
  decisions?: string[];
};

type ProcessStep = { title: string; question: string; text: string; example: string };

const pt = {
  htmlLang: "pt-BR",
  meta: {
    title: "Leonardo Senerine · Sites e aplicações",
    description:
      "Sites e aplicações com identidade própria. Design, código e estratégia na mesma mão, para marcas que não querem passar batido.",
    keywords: ["criação de sites", "site profissional", "desenvolvimento web", "aplicações web", "design de interface", "Next.js", "React", "site para marcas", "SEO técnico"],
  },
  nav: {
    work: "Cases",
    process: "Processo",
    about: "Quem faz",
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
    meta: ["Sites e aplicações", "Design + código"],
    latestLabel: "Último no ar",
    titleBefore: "Sites que não passam",
    titleEm: "batido",
    lead: "Eu desenho e programo sites e aplicações para marcas que têm algo a dizer. Design, código e estratégia na mesma mão, do primeiro rabisco ao deploy.",
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
  },
  work: {
    kicker: "Cases",
    title: "Cada projeto pediu uma resposta diferente",
    intro: "Abaixo, cada escolha vem com o seu porquê.",
    kindLabel: { real: "Projeto real", concept: "Proposta conceitual" } as Record<ProjectKind, string>,
    labels: {
      objective: "Objetivo",
      concept: "Conceito",
      solution: "O que eu fiz",
      decisions: "Decisões",
      stack: "Feito com",
      visit: "Ver no ar",
      cursor: "Ver no ar",
      private: "Link privado, a pedido dos noivos",
    },
    moreTitle: "Mais trabalhos",
    items: {
      suramu: {
        client: "SURAMU",
        segment: "Real sushi · delivery de quebrada",
        quote: "Uma marca de rua com voz alta e um cardápio que muda todo dia.",
        objective:
          "Levar para a tela a mesma atitude dos pôsteres: sem salmão, sem cream cheese, só peixe do dia, com pedido fácil pelo celular.",
        concept:
          "Grafite encontra a tradição japonesa. Títulos que entram com força pela borda, palavras carimbadas em faixas e o padrão de sushis como textura.",
        solution:
          "Tag em grafite pintada na tela como spray, manifesto em três telas, quadro de peixes do dia atualizado num único arquivo, rota do mercado ao balcão e pedido pelo WhatsApp e pelo iFood.",
        decisions: [
          "HTML, CSS e JavaScript puros: um delivery não precisa carregar um framework para mostrar o peixe do dia.",
          "As letras da marca viram vetor usado como máscara, nítidas em qualquer tela e em qualquer cor.",
        ],
      },
      meraki: {
        client: "Meraki Galleria Shop",
        segment: "Tatuagem e barbearia",
        quote: "O nome já existia no letreiro da recepção. Faltava virar site.",
        objective:
          "Fazer a tatuagem e a barbearia do mesmo endereço aparecerem no Google, cada uma com o seu caminho para agendar.",
        concept:
          "A marca vem do real: o letreiro dourado da recepção, com o A sem a barra do meio, redesenhado em SVG e animado traço a traço.",
        solution:
          "Galeria editorial com tela cheia, agendamento que muda de destino conforme a seção e HTML pré-renderizado para o Google ler o site inteiro.",
        decisions: [
          "O botão de agendar acompanha a leitura: leva ao WhatsApp do tatuador ou à agenda da barbearia, conforme a parte do site.",
          "Prints de 290px viraram fotos nítidas com super-resolução por IA, misturada à original para a pele não ficar de plástico.",
        ],
      },
      dconde: {
        client: "D'Conde Barbearia",
        segment: "Barbearia com hora marcada",
        quote: "Do primeiro commit ao sistema em uso em duas semanas.",
        objective:
          "Tirar a agenda do WhatsApp: 17 serviços, barbeiros com horários diferentes a cada dia e tudo combinado à mão.",
        concept:
          "O cliente marca em quatro passos, a equipe administra num painel e as regras ficam onde ninguém consegue burlar: no banco de dados.",
        solution:
          "Site, agendamento em 4 etapas, login sem senha por código no e-mail e painel com 9 módulos, de agenda a estoque. E-mails automáticos lembram o cliente 3 horas antes.",
        decisions: [
          "Preço, horário e permissão são validados no Postgres. A tela só mostra o que o banco permite.",
          "Dois clientes no mesmo horário? O banco recusa qualquer sobreposição, inclusive de serviços que ocupam várias horas.",
        ],
      },
      gordinho: {
        client: "Gordinho Lanches",
        segment: "Hamburgueria desde 1992",
        quote: "34 anos de história que só existiam num mural na parede.",
        objective: "Contar a trajetória real da casa e levar quem procura no Google direto para o pedido.",
        concept: "Um site de marca, sem cardápio: o foco é o legado, a família e o pedido pelo WhatsApp.",
        solution:
          "Linha do tempo ano a ano, do carrinho de 1992 ao salão de hoje, horários que mudam conforme o dia, pedido pelo WhatsApp e pelo iFood e SEO para busca local.",
        decisions: [
          "O emblema foi redesenhado em SVG sem o \"self service\", que a casa não oferece mais.",
          "O mascote foi recortado do logo original e virou personagem do site.",
        ],
      },
      samoa: {
        client: "Samoa Gastrobar",
        segment: "Gastrobar com música ao vivo",
        quote: "De um Linktree com PDF a um site que aparece no Google.",
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
  process: {
    kicker: "Processo",
    title: "Código é a última etapa",
    intro: "Antes de abrir o editor, todo projeto passa por cinco perguntas. Ao lado, o caminho da SURAMU.",
    steps: [
      {
        title: "Marca",
        question: "Quem é essa marca e o que ela se recusa a ser?",
        text: "A personalidade vem antes da paleta.",
        example: "A SURAMU se recusa a ter salmão e cream cheese. Isso virou o site inteiro.",
      },
      {
        title: "Usuário",
        question: "Quem chega, de onde e com qual pressa?",
        text: "O mesmo site serve gente diferente, em momentos diferentes.",
        example: "Na SURAMU, quem pede chega pelo Instagram, no celular. O botão de pedir aparece primeiro.",
      },
      {
        title: "Experiência",
        question: "O que a pessoa sente a cada rolagem?",
        text: "O roteiro existe antes da tela.",
        example: "Na SURAMU, um manifesto por tela antes do cardápio. Primeiro a atitude, depois o peixe.",
      },
      {
        title: "Interface",
        question: "Como tipo, cor, grid e movimento viram um sistema?",
        text: "Cada elemento se repete com intenção.",
        example: "Vermelho sushi, preto, papel e uma faixa que carimba as palavras mais importantes.",
      },
      {
        title: "Tecnologia",
        question: "Qual é a ferramenta certa para o tamanho do problema?",
        text: "Só agora o código entra.",
        example: "Na SURAMU, HTML puro e um arquivo que o dono edita para trocar o peixe do dia.",
      },
    ] as ProcessStep[],
    artifacts: {
      poster: "Pôster da SURAMU: nosso sushi não tem cream cheese",
      mobile: "A primeira tela da SURAMU no celular, com o botão de pedir",
      manifesto: "O manifesto da SURAMU ocupando a tela inteira",
      code: "data/peixes-do-dia.js",
    },
  },
  about: {
    kicker: "Quem faz",
    name: "Leonardo Senerine",
    role: "Full stack developer",
    title: "Eu fico entre o design e o código. É ali que muito projeto se perde.",
    paragraphs: [
      "Penso como quem desenha e construo como quem programa. Arquitetura, performance e interface entram na mesma conversa que a marca.",
      "Quem ouve o seu pedido é quem escreve o código, então nada se perde no caminho. Foi assim que a D'Conde saiu do primeiro rascunho para um sistema em uso em duas semanas.",
      "Depois do lançamento eu continuo por perto. Trocar um preço, uma foto ou um horário é só me mandar uma mensagem.",
    ],
    photoAlt: "Leonardo Senerine em preto e branco",
    skills: ["Design de interface", "Desenvolvimento full stack", "Next.js", "React", "TypeScript", "SEO técnico", "Performance web"],
  },
  tools: {
    kicker: "Ferramentas",
    title: "A ferramenta depende do problema",
    items: [
      { tools: "React e Next.js", text: "quando a interface precisa crescer sem perder velocidade.", proof: "Gordinho, D'Conde" },
      { tools: "TypeScript", text: "em tudo que precisa durar depois do lançamento.", proof: "Meraki, D'Conde, Gordinho" },
      { tools: "APIs e banco de dados", text: "quando o site precisa trabalhar: agenda, login, painel e avisos.", proof: "D'Conde" },
      { tools: "Node.js e Python", text: "nos bastidores: scripts, automações e tratamento de imagem.", proof: "Meraki" },
      { tools: "Tailwind ou CSS puro", text: "o que deixar a página mais leve e mais fácil de manter.", proof: "D'Conde, SURAMU" },
    ],
    note: "Este site: Next.js, TypeScript e CSS escrito à mão.",
  },
  offer: {
    kicker: "Como trabalhar comigo",
    title: "Valor fechado, prévia ao vivo, conversa direta",
    formats: [
      { name: "Landing page", text: "Uma página que apresenta a marca e leva direto ao contato." },
      { name: "Site + SEO", text: "Várias páginas, dados estruturados e prévia de link caprichada." },
      { name: "Sistema sob medida", text: "Quando o site precisa trabalhar: agendar, avisar e organizar." },
    ],
    promises: [
      { value: "Valor fechado", label: "proposta por escrito antes de começar" },
      { value: "Prévia ao vivo", label: "você acompanha tudo por um link" },
      { value: "Direto comigo", label: "do design ao código, sou eu que faço" },
    ],
    faqTitle: "Antes de você perguntar",
    faq: [
      {
        q: "Quanto custa?",
        a: "Depende do que o site precisa fazer. Depois de uma conversa rápida, mando uma proposta com valor fechado. O que está nela é o que você paga.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Uma landing page fica pronta em poucas semanas. Sistemas levam um pouco mais. O prazo vai escrito na proposta.",
      },
      {
        q: "Vou conseguir atualizar o conteúdo?",
        a: "Sim. Posso fazer as trocas numa manutenção mensal ou, se fizer sentido, montar um painel para você editar sozinho.",
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
    role: "Sites e aplicações",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    made: "Feito à mão em Next.js, sem template.",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  htmlLang: "en",
  meta: {
    title: "Leonardo Senerine · Websites & apps",
    description:
      "Websites and apps with a point of view. Design, code and strategy in one pair of hands, for brands that refuse to be scrolled past.",
    keywords: ["website design", "custom website", "web development", "web apps", "interface design", "Next.js", "React", "brand website", "technical SEO"],
  },
  nav: {
    work: "Work",
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
    meta: ["Websites & apps", "Design + code"],
    latestLabel: "Latest launch",
    titleBefore: "Websites nobody scrolls",
    titleEm: "past",
    lead: "I design and code websites and apps for brands with something to say. Design, code and strategy in one pair of hands, from first sketch to deploy.",
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
  },
  work: {
    kicker: "Work",
    title: "Every project asked for a different answer",
    intro: "Below, every choice comes with its reason.",
    kindLabel: { real: "Real project", concept: "Concept proposal" },
    labels: {
      objective: "Goal",
      concept: "Concept",
      solution: "What I built",
      decisions: "Decisions",
      stack: "Built with",
      visit: "Visit live site",
      cursor: "Visit live",
      private: "Private link, at the couple's request",
    },
    moreTitle: "More work",
    items: {
      suramu: {
        client: "SURAMU",
        segment: "Real sushi · street delivery",
        quote: "A street brand with a loud voice and a menu that changes every day.",
        objective:
          "Bring the posters' attitude to the screen: no salmon, no cream cheese, only fish of the day, with easy ordering on a phone.",
        concept:
          "Graffiti meets Japanese tradition. Headlines that slam in from the edge, words stamped on bars and a sushi pattern as texture.",
        solution:
          "A graffiti tag sprayed onto the screen, a three-screen manifesto, a fish-of-the-day board updated in a single file, a route from market to counter and ordering via WhatsApp and iFood.",
        decisions: [
          "Plain HTML, CSS and JavaScript: a delivery doesn't need to ship a framework to show today's fish.",
          "The brand lettering becomes vector masks, sharp on any screen and in any color.",
        ],
      },
      meraki: {
        client: "Meraki Galleria Shop",
        segment: "Tattoo and barbershop",
        quote: "The name already existed on the reception sign. It just had to become a website.",
        objective: "Get the tattoo studio and the barbershop at the same address found on Google, each with its own way to book.",
        concept:
          "The brand comes from the real thing: the golden reception sign, with its crossbar-less A, redrawn in SVG and animated stroke by stroke.",
        solution:
          "An editorial gallery with full screen view, booking that changes destination by section and pre-rendered HTML so Google reads the whole site.",
        decisions: [
          "The booking button follows the reading: it goes to the tattoo artist's WhatsApp or the barbershop calendar, depending on the section.",
          "290px screenshots became sharp photos with AI super-resolution, blended with the original so skin never looks plastic.",
        ],
      },
      dconde: {
        client: "D'Conde Barbearia",
        segment: "Appointment-only barbershop",
        quote: "From first commit to a system in daily use in two weeks.",
        objective: "Take the schedule out of WhatsApp: 17 services, barbers with different hours every day and everything arranged by hand.",
        concept:
          "Clients book in four steps, the team manages from a dashboard and the rules live where nobody can bypass them: in the database.",
        solution:
          "Website, 4-step booking, passwordless login with an email code and a 9-module dashboard, from schedule to stock. Automatic emails remind clients 3 hours ahead.",
        decisions: [
          "Price, time slot and permissions are validated in Postgres. The screen only shows what the database allows.",
          "Two clients, same slot? The database rejects any overlap, including services that take several hours.",
        ],
      },
      gordinho: {
        client: "Gordinho Lanches",
        segment: "Burger joint since 1992",
        quote: "34 years of history that only lived on a mural on the wall.",
        objective: "Tell the real story of the place and take people searching on Google straight to ordering.",
        concept: "A brand site with no menu: the focus is the legacy, the family and ordering on WhatsApp.",
        solution:
          "A year-by-year timeline, from the 1992 food cart to today's dining room, opening hours that change by day, ordering via WhatsApp and iFood and local SEO.",
        decisions: [
          "The emblem was redrawn in SVG without the \"self service\" line, which the place no longer offers.",
          "The mascot was cut out of the original logo and became a character on the site.",
        ],
      },
      samoa: {
        client: "Samoa Gastrobar",
        segment: "Gastrobar with live music",
        quote: "From a Linktree with a PDF to a site Google can find.",
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
  process: {
    kicker: "Process",
    title: "Code is the last step",
    intro: "Before I open the editor, every project goes through five questions. Alongside, how SURAMU went through them.",
    steps: [
      {
        title: "Brand",
        question: "Who is this brand, and what does it refuse to be?",
        text: "Personality comes before the palette.",
        example: "SURAMU refuses salmon and cream cheese. That became the whole site.",
      },
      {
        title: "People",
        question: "Who arrives, from where, in what kind of hurry?",
        text: "The same site serves different people at different moments.",
        example: "SURAMU customers arrive from Instagram, on their phones. The order button comes first.",
      },
      {
        title: "Experience",
        question: "What does a person feel with every scroll?",
        text: "The script exists before the screen.",
        example: "At SURAMU, one manifesto line per screen before the menu. Attitude first, then the fish.",
      },
      {
        title: "Interface",
        question: "How do type, color, grid and motion become a system?",
        text: "Every element repeats with intent.",
        example: "Sushi red, black, paper and a bar that stamps the most important words.",
      },
      {
        title: "Technology",
        question: "What's the right tool for the size of the problem?",
        text: "Only now does code come in.",
        example: "At SURAMU, plain HTML and a single file the owner edits to change the fish of the day.",
      },
    ],
    artifacts: {
      poster: "SURAMU poster: our sushi has no cream cheese",
      mobile: "SURAMU's first screen on a phone, with the order button",
      manifesto: "SURAMU's manifesto filling the whole screen",
      code: "data/peixes-do-dia.js",
    },
  },
  about: {
    kicker: "About",
    name: "Leonardo Senerine",
    role: "Full stack developer",
    title: "I work between design and code. That's where a lot of projects get lost.",
    paragraphs: [
      "I think like someone who designs and build like someone who codes. Architecture, performance and interface sit in the same conversation as the brand.",
      "The person who hears your request is the one writing the code, so nothing gets lost along the way. That's how D'Conde went from first sketch to a system in daily use in two weeks.",
      "After launch I stay close. Changing a price, a photo or opening hours is just a message to me.",
    ],
    photoAlt: "Leonardo Senerine in black and white",
    skills: ["Interface design", "Full stack development", "Next.js", "React", "TypeScript", "Technical SEO", "Web performance"],
  },
  tools: {
    kicker: "Tools",
    title: "The tool depends on the problem",
    items: [
      { tools: "React and Next.js", text: "when the interface needs to grow without slowing down.", proof: "Gordinho, D'Conde" },
      { tools: "TypeScript", text: "in everything that has to last after launch.", proof: "Meraki, D'Conde, Gordinho" },
      { tools: "APIs and databases", text: "when the site has to do work: booking, login, dashboards and alerts.", proof: "D'Conde" },
      { tools: "Node.js and Python", text: "behind the scenes: scripts, automation and image processing.", proof: "Meraki" },
      { tools: "Tailwind or plain CSS", text: "whatever keeps the page lighter and easier to maintain.", proof: "D'Conde, SURAMU" },
    ],
    note: "This site: Next.js, TypeScript and hand-written CSS.",
  },
  offer: {
    kicker: "Working together",
    title: "Fixed price, live preview, straight talk",
    formats: [
      { name: "Landing page", text: "One page that presents the brand and leads straight to contact." },
      { name: "Website + SEO", text: "Multiple pages, structured data and a polished link preview." },
      { name: "Custom system", text: "When the site has to do work: book, notify and organize." },
    ],
    promises: [
      { value: "Fixed price", label: "written proposal before any work starts" },
      { value: "Live preview", label: "follow everything through a link" },
      { value: "Straight to me", label: "from design to code, I do it myself" },
    ],
    faqTitle: "Before you ask",
    faq: [
      {
        q: "How much does it cost?",
        a: "It depends on what the site needs to do. After a quick chat I send a fixed-price proposal. What's in it is what you pay.",
      },
      {
        q: "How long does it take?",
        a: "A landing page takes a few weeks. Systems take a bit longer. The timeline is written into the proposal.",
      },
      {
        q: "Will I be able to update the content?",
        a: "Yes. I can make updates on a monthly plan or, when it makes sense, build a dashboard so you can edit it yourself.",
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
    role: "Websites & apps",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    made: "Handmade in Next.js, no template.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

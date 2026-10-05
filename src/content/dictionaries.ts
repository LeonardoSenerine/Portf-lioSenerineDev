import type { ProjectId, ProjectKind } from "./projects";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

type ProjectText = {
  client: string;
  segment: string;
  title: string;
  problem: string;
  delivered: string;
  metrics: { value: string; label: string }[];
};

const pt = {
  htmlLang: "pt-BR",
  meta: {
    title: "Leonardo Senerine · Sites e aplicações",
    description:
      "Sites e aplicações sob medida para negócios de qualquer área. Feitos para aparecer no Google, passar confiança e levar o cliente direto até você.",
    keywords: ["criação de sites", "site profissional", "desenvolvimento de sites", "aplicações web", "landing page", "site para empresas", "SEO local", "site com WhatsApp", "sistema de agendamento online"],
  },
  nav: {
    work: "Trabalhos",
    services: "Serviços",
    process: "Processo",
    about: "Sobre",
    faq: "Dúvidas",
    cta: "Vamos conversar",
    switchTo: "EN",
    switchLabel: "Read in English",
    themeLight: "Usar tema claro",
    themeDark: "Usar tema escuro",
  },
  whatsappMessage: "Olá, Leonardo! Vi o senerine.dev e quero conversar sobre um site.",
  hero: {
    titleBefore: "Sites que fazem o cliente",
    titleEm: "chamar",
    titleAfter: ".",
    lead: "Desenho e desenvolvo sites e aplicações sob medida para negócios de qualquer área. Feitos para aparecer no Google e levar o cliente direto até você.",
    primary: "Chamar no WhatsApp",
    secondary: "Ver trabalhos",
    photoAlt: "Leonardo Senerine, sites e aplicações",
    photoCaption: "Leonardo Senerine",
    photoRole: "Design + código",
    // Garantias que respondem às dúvidas de quem vai contratar
    stats: [
      { value: "Valor fechado", label: "proposta por escrito antes de começar" },
      { value: "Prévia ao vivo", label: "você acompanha o site sendo feito por um link" },
      { value: "Direto comigo", label: "sem intermediário, do design ao código" },
    ],
  },
  niches: ["Bares", "Restaurantes", "Hamburguerias", "Barbearias", "Estúdios de tatuagem", "Casas de show", "Convites de casamento"],
  why: {
    kicker: "01 · por que ter um site",
    title: "Rede social é vitrine. Site é endereço.",
    intro: "Fora das redes sociais, é o site que aparece quando alguém procura pelo que você faz. Ele é o convite de entrada para o seu negócio.",
    queries: ["advogado trabalhista perto de mim", "lanchonete aberta agora", "construtora de confiança", "barbearia com horário marcado"],
    resultTitle: "Seu negócio",
    resultUrl: "seunegocio.com.br",
    resultText: "Quem você é, onde fica, horários e um botão para chamar no WhatsApp.",
    points: [
      { title: "É onde a busca começa", text: "Quando alguém precisa de um serviço, abre o Google. Sem site, o seu negócio quase não aparece fora das redes sociais." },
      { title: "Funciona como um convite", text: "É a porta de entrada: mostra quem você é, onde fica e como chamar, a qualquer hora, mesmo com a loja fechada." },
      { title: "É seu, não do algoritmo", text: "Nas redes o alcance muda toda semana. O site continua no ar, com o seu domínio, o seu conteúdo e as suas regras." },
    ],
  },
  work: {
    kicker: "02 · trabalhos",
    title: "Projetos para negócios de verdade",
    intro: "Cada site parte do que o lugar já tem: o letreiro, o cardápio, as fotos do salão. Nada de template.",
    kindLabel: { real: "Projeto real · no ar", concept: "Proposta conceitual" } as Record<ProjectKind, string>,
    problemLabel: "O problema",
    deliveredLabel: "O que entreguei",
    visit: "Ver site ao vivo",
    privateNote: "Link e dados privados, a pedido dos noivos",
    carousel: { region: "Projetos", pickHint: "arraste para o lado ou use as setas", prev: "Projeto anterior", next: "Próximo projeto" },
    items: {
      gordinho: {
        client: "Gordinho Lanches",
        segment: "Hamburgueria desde 1992",
        title: "34 anos de história contados ano a ano",
        problem:
          "Uma hamburgueria tradicional com a história inteira contada só num mural na parede da loja, e quem procurava a casa achava pouca informação útil.",
        delivered:
          "Site de marca com a trajetória real, do carrinho de 1992 ao salão de hoje, cachorro-quente em destaque, horários que mudam conforme o dia, pedido pelo WhatsApp e SEO para busca local.",
        metrics: [
          { value: "34 anos", label: "de história no site" },
          { value: "6", label: "marcos na linha do tempo" },
          { value: "2", label: "canais de pedido: WhatsApp e iFood" },
        ],
      },
      dconde: {
        client: "D'Conde Barbearia",
        segment: "Barbearia com hora marcada",
        title: "Agendamento online e painel de gestão",
        problem:
          "Só atendia com hora marcada: 17 serviços, barbeiros com horários diferentes a cada dia e tudo combinado pelo WhatsApp.",
        delivered:
          "Site, agendamento em 4 etapas, login sem senha e um painel com agenda, financeiro, estoque e loja. E-mails automáticos avisam a equipe e lembram o cliente 3 horas antes.",
        metrics: [
          { value: "2 semanas", label: "do primeiro commit ao ar" },
          { value: "17", label: "serviços agendáveis online" },
          { value: "9", label: "módulos no painel" },
        ],
      },
      convite: {
        client: "Convite de casamento",
        segment: "Evento",
        title: "Um convite que confirma presença sozinho",
        problem:
          "Convite impresso não responde dúvidas, não mostra o caminho e não ajuda a contar quantas pessoas vêm nem a evitar presente repetido.",
        delivered:
          "Convite digital com contagem regressiva, história do casal, programação, mapa, confirmação de presença que chega pronta no WhatsApp e lista de presentes com reserva.",
        metrics: [
          { value: "1 link", label: "com tudo sobre o grande dia" },
          { value: "RSVP", label: "enviado pronto pelo WhatsApp" },
          { value: "0", label: "presentes repetidos" },
        ],
      },
      samoa: {
        client: "Samoa Gastrobar",
        segment: "Gastrobar com música ao vivo",
        title: "De um Linktree com PDF a um site que aparece no Google",
        problem:
          "10,2 mil seguidores, música ao vivo e almoço de terça a domingo. Na internet, só o Instagram e um cardápio em PDF.",
        delivered:
          "Cardápio em página com 42 itens, agenda de shows que se atualiza sozinha, SEO local, prévia de link caprichada para o WhatsApp e mapa só com consentimento.",
        metrics: [
          { value: "42", label: "itens no cardápio online" },
          { value: "94 KB", label: "prévia do link no WhatsApp" },
          { value: "4", label: "páginas prontas para o Google" },
        ],
      },
      pontoalto: {
        client: "Ponto Alto · Clube da Música",
        segment: "Casa de shows",
        title: "Uma casa de shows que só tinha flyers",
        problem:
          "Para saber o próximo show era preciso achar o flyer certo no feed. Ingresso, lista e bandas chegavam todos pelo mesmo WhatsApp.",
        delivered:
          "Próximo show no topo com ingresso, palco em vídeo, formulário para bandas e cada show publicado como evento no Google.",
        metrics: [
          { value: "1º", label: "próximo show sempre no topo" },
          { value: "540p", label: "vídeos leves, um por vez" },
          { value: "0", label: "chamadas ao Maps sem aceite" },
        ],
      },
      meraki: {
        client: "Meraki Galleria Shop",
        segment: "Tatuagem e barbearia",
        title: "Uma identidade redesenhada a partir do letreiro",
        problem:
          "Trabalho forte no Instagram e nenhum site: quem buscava tatuagem na cidade não encontrava o espaço.",
        delivered:
          "Logo em SVG animado traço a traço, galeria editorial, botão de agendar que muda conforme a seção e HTML pré-renderizado para o Google.",
        metrics: [
          { value: "1.238", label: "palavras legíveis pelo Google" },
          { value: "70", label: "imagens com texto alternativo" },
          { value: "2", label: "negócios, um site" },
        ],
      },
    } as Record<ProjectId, ProjectText>,
  },
  areas: {
    kicker: "03 · áreas",
    title: "Trabalho com qualquer área.",
    list: ["Advocacia", "Construção", "Lanchonetes", "Estúdios", "Restaurantes", "Barbearias", "Clínicas", "Academias", "Imobiliárias", "Eventos", "Lojas"],
    last: "e a sua",
    note: "Do escritório de advocacia à lanchonete da esquina, o processo é o mesmo: entender quem é o seu cliente e fazer o site trabalhar por você.",
    cta: "Me conta sobre o seu negócio",
  },
  services: {
    kicker: "04 · serviços",
    title: "O que eu faço por você",
    intro: "Você fala direto com quem desenha, programa e publica. Sem intermediário.",
    recommended: "Recomendado",
    items: [
      {
        name: "Landing page",
        description: "Uma página que apresenta o negócio e leva o visitante ao WhatsApp.",
        features: ["Design sob medida", "Pensada primeiro para o celular", "WhatsApp, mapa e Instagram", "Publicação com domínio próprio"],
        recommended: false,
      },
      {
        name: "Site + SEO local",
        description: "Para quem quer ser encontrado no Google por quem está perto.",
        features: ["Várias páginas: cardápio, agenda, eventos", "Dados estruturados para o Google", "Prévia de link para WhatsApp", "Privacidade e cookies (LGPD)"],
        recommended: true,
      },
      {
        name: "Sistema sob medida",
        description: "Quando o site precisa trabalhar: agendar, avisar e organizar.",
        features: ["Agendamento online", "Área do cliente sem senha", "Painel de gestão", "Notificações automáticas"],
        recommended: false,
      },
    ],
    maintenance:
      "Manutenção mensal: troca de cardápio, agenda, fotos e textos, sem você precisar se preocupar.",
  },
  process: {
    kicker: "05 · processo",
    title: "Do primeiro oi ao site no ar",
    steps: [
      { title: "Conversa", text: "Entendo o negócio, quem é o seu cliente e o que hoje chega pelo WhatsApp." },
      { title: "Proposta", text: "Escopo, prazo e valor fechados por escrito antes de começar." },
      { title: "Design e código", text: "Você acompanha tudo por um link de prévia e pede ajustes no caminho." },
      { title: "No ar", text: "Domínio, Google, prévia de link e ajustes depois do lançamento." },
    ],
  },
  about: {
    kicker: "06 · sobre",
    title: "Prazer, Leonardo.",
    paragraphs: [
      "Antes de abrir o editor de código, eu quero entender o seu negócio: quem é o seu cliente, o que ele procura e o que faz ele desistir no meio do caminho. O site nasce dessas respostas, não de um modelo pronto.",
      "Eu desenho, programo e coloco no ar. Sem agência no meio e sem recado repassado: quem ouve o seu pedido é quem escreve o código. Foi assim que a D'Conde saiu do primeiro rascunho para um sistema de agendamento em uso em duas semanas.",
      "Depois do lançamento eu continuo por perto. Trocar um preço, uma foto ou um horário é uma mensagem no WhatsApp, não um chamado esquecido numa fila.",
    ],
    skills: ["Design sob medida", "Rápido no celular", "Pronto para o Google", "Sistemas e painéis", "Suporte depois do lançamento"],
  },
  faq: {
    kicker: "07 · dúvidas",
    title: "Perguntas frequentes",
    items: [
      {
        q: "Quanto custa um site?",
        a: "Depende do escopo. Depois de uma conversa rápida, envio uma proposta com valor fechado, sem surpresa no meio do caminho.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Uma landing page fica pronta em poucas semanas; sistemas com agendamento levam um pouco mais. O prazo vai escrito na proposta.",
      },
      {
        q: "Preciso ter domínio e hospedagem?",
        a: "Não. Eu ajudo a registrar o domínio e cuido da publicação. Para a maioria dos sites, a hospedagem tem custo baixo ou zero.",
      },
      {
        q: "Vou conseguir atualizar o conteúdo?",
        a: "Sim. Posso fazer as trocas na manutenção mensal ou, se fizer sentido, montar um painel para você editar sozinho.",
      },
      {
        q: "Meu negócio vai aparecer no Google?",
        a: "O site sai preparado para busca local: endereço, horário, dados estruturados e páginas que o Google consegue ler. A posição também depende da concorrência e do seu perfil no Google.",
      },
      {
        q: "Você atende na minha cidade?",
        a: "Atendo clientes de qualquer lugar. Todo o processo funciona a distância, com conversas por vídeo ou WhatsApp.",
      },
    ],
  },
  contact: {
    kicker: "vamos conversar",
    titleBefore: "Seu negócio merece mais que um",
    titleEm: "link na bio",
    titleAfter: ".",
    text: "Me conta o que você precisa. Respondo pessoalmente.",
    primary: "Chamar no WhatsApp",
    email: "Mandar e-mail",
  },
  footer: {
    role: "Sites e aplicações",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  htmlLang: "en",
  meta: {
    title: "Leonardo Senerine · Websites & apps",
    description:
      "Custom websites and apps for businesses in any field. Built to show up on Google, earn trust and bring customers straight to you.",
    keywords: ["website design", "custom website", "web development", "web apps", "landing page", "business website", "local SEO", "WhatsApp website", "online booking system"],
  },
  nav: {
    work: "Work",
    services: "Services",
    process: "Process",
    about: "About",
    faq: "FAQ",
    cta: "Let's talk",
    switchTo: "PT",
    switchLabel: "Ler em português",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },
  whatsappMessage: "Hi Leonardo! I found senerine.dev and would like to talk about a website.",
  hero: {
    titleBefore: "Websites that make customers",
    titleEm: "reach out",
    titleAfter: ".",
    lead: "I design and build custom websites and apps for businesses in any field. Made to show up on Google and bring customers straight to you.",
    primary: "Message on WhatsApp",
    secondary: "See the work",
    photoAlt: "Leonardo Senerine, websites & apps",
    photoCaption: "Leonardo Senerine",
    photoRole: "Design + code",
    stats: [
      { value: "Fixed price", label: "written proposal before any work starts" },
      { value: "Live preview", label: "follow the site being built through a link" },
      { value: "Straight to me", label: "no middlemen, from design to code" },
    ],
  },
  niches: ["Bars", "Restaurants", "Burger joints", "Barbershops", "Tattoo studios", "Live music venues", "Wedding invitations"],
  why: {
    kicker: "01 · why a website",
    title: "Social media is a shop window. A website is your address.",
    intro: "Outside social media, your website is what shows up when someone searches for what you do. It's the front door to your business.",
    queries: ["employment lawyer near me", "diner open now", "trusted construction company", "barbershop with appointments"],
    resultTitle: "Your business",
    resultUrl: "yourbusiness.com",
    resultText: "Who you are, where you are, opening hours and a button to message you on WhatsApp.",
    points: [
      { title: "It's where searching starts", text: "When people need a service, they open Google. Without a website, your business barely exists outside social media." },
      { title: "It works as an invitation", text: "It's the front door: who you are, where you are and how to reach you, any time, even when you're closed." },
      { title: "It's yours, not the algorithm's", text: "Reach on social media changes every week. Your site stays up, with your domain, your content and your rules." },
    ],
  },
  work: {
    kicker: "02 · work",
    title: "Projects for real businesses",
    intro: "Every site starts from what the place already has: the sign, the menu, the photos of a packed room. No templates.",
    kindLabel: { real: "Real project · live", concept: "Concept proposal" },
    problemLabel: "The problem",
    deliveredLabel: "What I delivered",
    visit: "Visit live site",
    privateNote: "Link and details kept private, at the couple's request",
    carousel: { region: "Projects", pickHint: "swipe or use the arrows", prev: "Previous project", next: "Next project" },
    items: {
      gordinho: {
        client: "Gordinho Lanches",
        segment: "Burger joint since 1992",
        title: "34 years of history, told year by year",
        problem:
          "A traditional burger joint whose whole story lived only on a mural on the shop wall, and people looking it up found little useful information.",
        delivered:
          "A brand site with the real timeline, from the 1992 food cart to today's dining room, hot dogs in the spotlight, opening hours that change by day, WhatsApp ordering and local SEO.",
        metrics: [
          { value: "34 years", label: "of history on the site" },
          { value: "6", label: "milestones on the timeline" },
          { value: "2", label: "ordering channels: WhatsApp and iFood" },
        ],
      },
      dconde: {
        client: "D'Conde Barbearia",
        segment: "Appointment-only barbershop",
        title: "Online booking and a management dashboard",
        problem:
          "Appointment only: 17 services, barbers with different hours every day, and everything arranged over WhatsApp.",
        delivered:
          "Website, 4-step booking, passwordless login and a dashboard with schedule, finances, stock and shop. Automatic emails alert the team and remind clients 3 hours ahead.",
        metrics: [
          { value: "2 weeks", label: "from first commit to live" },
          { value: "17", label: "services bookable online" },
          { value: "9", label: "dashboard modules" },
        ],
      },
      convite: {
        client: "Wedding invitation",
        segment: "Event",
        title: "An invitation that collects RSVPs on its own",
        problem:
          "A printed invitation can't answer questions, show the way, count who's coming or prevent duplicate gifts.",
        delivered:
          "A digital invitation with a countdown, the couple's story, schedule, map, an RSVP that arrives ready-made on WhatsApp and a gift list with reservations.",
        metrics: [
          { value: "1 link", label: "with everything about the day" },
          { value: "RSVP", label: "sent ready-made via WhatsApp" },
          { value: "0", label: "duplicate gifts" },
        ],
      },
      samoa: {
        client: "Samoa Gastrobar",
        segment: "Gastrobar with live music",
        title: "From a Linktree with a PDF to a site Google can find",
        problem:
          "10.2k followers, live music and lunch Tuesday to Sunday. Online, just Instagram and a PDF menu.",
        delivered:
          "A 42-item menu page, a gig calendar that updates itself, local SEO, a polished WhatsApp link preview and a map that only loads with consent.",
        metrics: [
          { value: "42", label: "menu items online" },
          { value: "94 KB", label: "WhatsApp link preview" },
          { value: "4", label: "pages ready for Google" },
        ],
      },
      pontoalto: {
        client: "Ponto Alto · Clube da Música",
        segment: "Live music venue",
        title: "A music venue that only had flyers",
        problem:
          "Finding the next show meant digging through the feed for the right flyer. Tickets, guest list and bands all came through one WhatsApp.",
        delivered:
          "Next show up top with tickets, a video stage, a form for bands, and every show published as an event on Google.",
        metrics: [
          { value: "1st", label: "next show always on top" },
          { value: "540p", label: "light videos, one at a time" },
          { value: "0", label: "Maps calls before consent" },
        ],
      },
      meraki: {
        client: "Meraki Galleria Shop",
        segment: "Tattoo and barbershop",
        title: "An identity redrawn from the shop sign",
        problem:
          "Strong work on Instagram and no website: people searching for a tattoo artist in town couldn't find the place.",
        delivered:
          "An SVG logo animated stroke by stroke, an editorial gallery, a booking button that changes with each section, and pre-rendered HTML for Google.",
        metrics: [
          { value: "1,238", label: "words Google can read" },
          { value: "70", label: "images with alt text" },
          { value: "2", label: "businesses, one site" },
        ],
      },
    },
  },
  areas: {
    kicker: "03 · fields",
    title: "I work with any field.",
    list: ["Law firms", "Construction", "Diners", "Studios", "Restaurants", "Barbershops", "Clinics", "Gyms", "Real estate", "Events", "Shops"],
    last: "and yours",
    note: "From a law firm to the diner around the corner, the process is the same: understand who your customer is and make the site work for you.",
    cta: "Tell me about your business",
  },
  services: {
    kicker: "04 · services",
    title: "What I can do for you",
    intro: "You talk directly to the person who designs, codes and ships. No middlemen.",
    recommended: "Recommended",
    items: [
      {
        name: "Landing page",
        description: "One page that presents your business and leads visitors to WhatsApp.",
        features: ["Custom design", "Mobile first", "WhatsApp, map and Instagram", "Launched on your own domain"],
        recommended: false,
      },
      {
        name: "Website + local SEO",
        description: "For businesses that want to be found on Google by people nearby.",
        features: ["Multiple pages: menu, calendar, events", "Structured data for Google", "WhatsApp link preview", "Privacy and cookie policies"],
        recommended: true,
      },
      {
        name: "Custom system",
        description: "When the site needs to do work: book, notify and organize.",
        features: ["Online booking", "Passwordless client area", "Management dashboard", "Automatic notifications"],
        recommended: false,
      },
    ],
    maintenance:
      "Monthly care plan: menu, calendar, photo and copy updates, so you don't have to think about it.",
  },
  process: {
    kicker: "05 · process",
    title: "From first hello to live site",
    steps: [
      { title: "Talk", text: "I learn about your business, your customers and what comes in through WhatsApp today." },
      { title: "Proposal", text: "Scope, timeline and price agreed in writing before any work starts." },
      { title: "Design and code", text: "You follow along through a preview link and ask for changes as we go." },
      { title: "Launch", text: "Domain, Google, link preview and adjustments after launch." },
    ],
  },
  about: {
    kicker: "06 · about",
    title: "Hi, I'm Leonardo.",
    paragraphs: [
      "Before I open a code editor, I want to understand your business: who your customer is, what they're looking for and what makes them give up halfway. The site comes from those answers, not from a ready-made template.",
      "I design, build and launch. No agency in the middle and no messages lost in translation: the person who hears your request is the one writing the code. That's how D'Conde went from first sketch to a booking system in daily use in two weeks.",
      "After launch I stay close. Changing a price, a photo or opening hours is a WhatsApp message, not a ticket forgotten in a queue.",
    ],
    skills: ["Custom design", "Fast on mobile", "Ready for Google", "Systems and dashboards", "Support after launch"],
  },
  faq: {
    kicker: "07 · faq",
    title: "Frequently asked questions",
    items: [
      {
        q: "How much does a website cost?",
        a: "It depends on the scope. After a quick chat I send a fixed-price proposal, with no surprises along the way.",
      },
      {
        q: "How long does it take?",
        a: "A landing page takes a few weeks; systems with booking take a bit longer. The timeline is written into the proposal.",
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
        q: "Will my business show up on Google?",
        a: "The site ships ready for local search: address, hours, structured data and pages Google can read. Ranking also depends on competition and your Google Business profile.",
      },
      {
        q: "Do you work with clients in my city?",
        a: "I work with clients anywhere. The whole process works remotely, over video calls or WhatsApp.",
      },
    ],
  },
  contact: {
    kicker: "let's talk",
    titleBefore: "Your business deserves more than a",
    titleEm: "link in bio",
    titleAfter: ".",
    text: "Tell me what you need. I reply personally.",
    primary: "Message on WhatsApp",
    email: "Send an email",
  },
  footer: {
    role: "Websites & apps",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

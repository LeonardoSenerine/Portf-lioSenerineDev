@AGENTS.md

# senerine.dev

Portfólio comercial do Leonardo Senerine: o objetivo é **vender** (gerar contatos de negócios), não ser um currículo de dev. Next.js 16 (App Router, rotas `/pt` e `/en`), Motion (`motion/react`), CSS puro em `src/app/globals.css`. Para design e animação, use a skill `frontend-design`.

## Regras de conteúdo e posicionamento

- O posicionamento é **"sites e aplicações"** (EN "websites & apps"). Nunca usar "estúdio/studio" nem "desenvolvedor de sites" para o Leonardo.
- Nunca citar Itatiba nem outra cidade dele: ele atende qualquer lugar. Também não listar nichos no hero.
- Texto sem travessões. Não inventar números, depoimentos, prazos ou clientes; só usar fatos que já estão no site ou nos estudos de caso.
- O **convite de casamento é confidencial**: sem link em lugar nenhum (`url: null` em `src/content/projects.ts`), imagens sempre desfocadas (`public/work/convite/*-privado.jpg`). Nunca colocar o link de volta.
- Projetos reais: Gordinho Lanches, D'Conde Barbearia, convite. Propostas conceituais: SURAMU, Samoa, Ponto Alto, Meraki.

## Regras de design

- Prioridade é o **celular**. Componentes animados com tamanho fixo (sem pular nem piscar). Bastante respiro entre as seções.
- Paleta tirada da foto: azul `#0a63b2`, preto `#1e1d1e`, off-white quente, tom de pele `#d99278`. Temas claro e escuro precisam continuar funcionando.
- Evitar cara de "site feito por IA" (grades de cards com ícone em quadrado e selo, faixas de números genéricos); preferir composições editoriais e tipográficas.
- O título do hero não tem animação de entrada (é o LCP). Entradas na rolagem são CSS + um único IntersectionObserver (`src/components/reveal.tsx` e `RevealObserver.tsx`); Motion só para o que é interativo.

## Onde fica cada coisa

- Textos em PT e EN: `src/content/dictionaries.ts`
- Projetos, links e capturas: `src/content/projects.ts` e `public/work/<id>/`
- Contatos (WhatsApp e e-mail reais): `src/content/site.ts`
- SEO: `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`, `src/app/[lang]/opengraph-image.tsx`, `src/components/JsonLd.tsx`
- Prévia local: `npm run dev` (a configuração do painel usa a porta 3100)

// Dados fixos de cada projeto (links, tecnologias e imagens). Os textos ficam em dictionaries.ts.
// Capturas geradas a partir dos sites no ar: desktop 1440×900 e celular 390×844 @2x.
// Tecnologias tiradas do package.json de cada repositório (a SURAMU é HTML, CSS e JS puros).

export type ProjectKind = "real" | "concept";

export const projects = [
  // Cases em destaque, na ordem em que aparecem. Cada um tem a sua "sala" (cores da
  // própria marca) dentro da moldura do Senerine; ver .case[data-room] no CSS.
  // SURAMU em negociação: sem link até o fechamento.
  { id: "suramu", url: null, kind: "concept", featured: true, year: 2026, stack: ["HTML", "CSS", "JavaScript"] },
  { id: "meraki", url: "https://meraki-studio-nu.vercel.app", kind: "concept", featured: true, year: 2026, stack: ["React", "TypeScript", "Vite", "Python"] },
  { id: "dconde", url: "https://dcondebarbershop.vercel.app", kind: "real", featured: true, year: 2026, stack: ["React", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"] },
  { id: "gordinho", url: "https://gordinho-lanches-site.vercel.app", kind: "real", featured: true, year: 2026, stack: ["Next.js", "TypeScript", "Tailwind"] },
  { id: "samoa", url: "https://samoa-gastro-bar.vercel.app", kind: "concept", featured: true, year: 2026, stack: ["React", "TypeScript", "Vite"] },
  // Mais trabalhos
  { id: "pontoalto", url: "https://ponto-alto-site-omega.vercel.app", kind: "concept", featured: false, year: 2026, stack: ["React", "TypeScript", "Vite"] },
  // Convite de casamento: evento privado do casal, sem link público.
  { id: "convite", url: null, kind: "real", featured: false, year: 2026, stack: [] },
] as const satisfies readonly {
  id: string;
  url: string | null;
  kind: ProjectKind;
  featured: boolean;
  year: number;
  stack: readonly string[];
}[];

export type Project = (typeof projects)[number];
export type ProjectId = Project["id"];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

// O convite usa capturas desfocadas, com outro nome para nenhum cache servir as antigas.
export const shot = (id: ProjectId, kind: "desktop" | "mobile") =>
  id === "convite" ? `/work/${id}/${kind}-privado.jpg` : `/work/${id}/${kind}.jpg`;

// Duas telas internas de cada case em destaque (1440×900).
export const details = (id: ProjectId) => [`/work/${id}/detail-1.jpg`, `/work/${id}/detail-2.jpg`];

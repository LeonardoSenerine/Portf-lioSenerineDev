// Dados fixos de cada projeto (links e capturas). Os textos ficam em dictionaries.ts.
// Capturas geradas a partir dos sites no ar: desktop 1440×900, celular 390×844 @2x
// e página inteira com 800px de largura.

export type ProjectKind = "real" | "concept";

export const projects = [
  { id: "gordinho", url: "https://gordinho-lanches-site.vercel.app", kind: "real", fullHeight: 7500 },
  { id: "dconde", url: "https://dcondebarbershop.vercel.app", kind: "real", fullHeight: 6963 },
  // Convite de casamento: evento privado do casal, sem link público.
  { id: "convite", url: null, kind: "real", fullHeight: 6153 },
  { id: "samoa", url: "https://samoa-gastro-bar.vercel.app", kind: "concept", fullHeight: 6884 },
  { id: "pontoalto", url: "https://ponto-alto-site-omega.vercel.app", kind: "concept", fullHeight: 5996 },
  { id: "meraki", url: "https://meraki-studio-nu.vercel.app", kind: "concept", fullHeight: 7500 },
] as const satisfies readonly { id: string; url: string | null; kind: ProjectKind; fullHeight: number }[];

export type ProjectId = (typeof projects)[number]["id"];

export const shot = (id: ProjectId, kind: "desktop" | "mobile" | "full") => `/work/${id}/${kind}.jpg`;

export const prettyUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

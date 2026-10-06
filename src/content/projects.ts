// Dados fixos de cada projeto (links e capturas). Os textos ficam em dictionaries.ts.
// Capturas geradas a partir dos sites no ar: desktop 1440×900 e celular 390×844 @2x.

export type ProjectKind = "real" | "concept";

export const projects = [
  { id: "gordinho", url: "https://gordinho-lanches-site.vercel.app", kind: "real" },
  { id: "dconde", url: "https://dcondebarbershop.vercel.app", kind: "real" },
  // Convite de casamento: evento privado do casal, sem link público.
  { id: "convite", url: null, kind: "real" },
  { id: "suramu", url: "https://suramusushi.vercel.app", kind: "concept" },
  { id: "samoa", url: "https://samoa-gastro-bar.vercel.app", kind: "concept" },
  { id: "pontoalto", url: "https://ponto-alto-site-omega.vercel.app", kind: "concept" },
  { id: "meraki", url: "https://meraki-studio-nu.vercel.app", kind: "concept" },
] as const satisfies readonly { id: string; url: string | null; kind: ProjectKind }[];

export type ProjectId = (typeof projects)[number]["id"];

// O convite usa capturas desfocadas, com outro nome para nenhum cache servir as antigas.
export const shot = (id: ProjectId, kind: "desktop" | "mobile") =>
  id === "convite" ? `/work/${id}/${kind}-privado.jpg` : `/work/${id}/${kind}.jpg`;


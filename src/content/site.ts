// Contatos e links usados em todo o site.
export const site = {
  name: "Leonardo Senerine",
  brand: "senerine.dev",
  // Endereço público (capa do link, canonical, sitemap, dados para o Google).
  // Na Vercel vem do domínio de produção do projeto: hoje senerinedev.vercel.app
  // e, quando o domínio senerine.dev for ligado ao projeto, ele passa a valer sozinho.
  url: process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://senerinedev.vercel.app"),
  // DDI + DDD + número, só dígitos
  whatsapp: "5518997307852",
  email: "senerine.dev@gmail.com",
  instagram: "https://instagram.com/senerine.dev",
  github: "https://github.com/LeonardoSenerine",
  linkedin: "https://linkedin.com/in/leonardosenerine",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

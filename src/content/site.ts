// Contatos e links usados em todo o site.
export const site = {
  name: "Leonardo Senerine",
  brand: "senerine.dev",
  url: "https://senerine.dev",
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

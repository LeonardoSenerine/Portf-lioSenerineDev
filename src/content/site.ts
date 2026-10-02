// Contatos e links usados em todo o site. Troque os valores marcados com TODO.
export const site = {
  name: "Leonardo Senerine",
  brand: "senerine.dev",
  url: "https://senerine.dev",
  // TODO: número com DDI e DDD, só dígitos (ex.: 5511999999999)
  whatsapp: "5511999999999",
  // TODO: e-mail de contato profissional
  email: "contato@senerine.dev",
  instagram: "https://instagram.com/senerine.dev",
  github: "https://github.com/LeonardoSenerine",
  linkedin: "https://linkedin.com/in/leonardosenerine",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

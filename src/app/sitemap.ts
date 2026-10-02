import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Uma entrada por idioma, cada uma apontando para a outra (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { "pt-BR": `${site.url}/pt`, en: `${site.url}/en` };
  return [
    { url: `${site.url}/pt`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
  ];
}

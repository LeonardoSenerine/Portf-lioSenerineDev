import type { Dictionary, Locale } from "@/content/dictionaries";
import { projects, shot } from "@/content/projects";
import { site } from "@/content/site";

// Dados estruturados (schema.org) para o Google entender quem é, o que oferece,
// os projetos publicados e as perguntas frequentes.
export function JsonLd({ lang, t }: { lang: Locale; t: Dictionary }) {
  const pageUrl = `${site.url}/${lang}`;
  const personId = `${site.url}/#leonardo`;
  const businessId = `${site.url}/#servico`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: site.url,
        name: site.brand,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#pagina`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: t.htmlLang,
        isPartOf: { "@id": `${site.url}/#site` },
        about: { "@id": businessId },
        primaryImageOfPage: `${pageUrl}/opengraph-image`,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        image: `${site.url}/leonardo-retrato.jpg`,
        jobTitle: t.footer.role,
        knowsAbout: t.about.skills,
        sameAs: [site.github, site.linkedin, site.instagram],
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: site.brand,
        url: site.url,
        description: t.meta.description,
        image: `${pageUrl}/opengraph-image`,
        founder: { "@id": personId },
        areaServed: "Worldwide",
        availableLanguage: ["Portuguese", "English"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.services.title,
          itemListElement: t.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.description },
          })),
        },
      },
      {
        "@type": "ItemList",
        name: t.work.title,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: t.work.items[p.id].client,
            headline: t.work.items[p.id].title,
            description: t.work.items[p.id].delivered,
            ...(p.url ? { url: p.url } : {}),
            image: `${site.url}${shot(p.id, "desktop")}`,
            creator: { "@id": personId },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

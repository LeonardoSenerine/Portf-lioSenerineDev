import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import { details, featuredProjects, moreProjects, shot } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CaseMedia } from "@/components/CaseMedia";
import { MoreWork } from "@/components/MoreWork";
import { ProcessAxis } from "@/components/ProcessAxis";
import { CursorDot } from "@/components/CursorDot";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, SplitTitle } from "@/components/reveal";

const pad = (n: number) => String(n + 1).padStart(2, "0");

// Trecho real do arquivo que o dono da SURAMU edita para trocar o peixe do dia.
const FISH_CODE = `window.PEIXES_DO_DIA = [
  { nome: "Olho-de-boi", status: "chegou" },
  { nome: "Atum",        status: "chegou" },
  { nome: "Bonito",      status: "ultimas" },
  { nome: "Polvo",       status: "acabou" },
];`;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const wa = whatsappLink(t.whatsappMessage);
  const total = featuredProjects.length;

  // Artefatos reais da SURAMU, um para cada etapa do processo.
  const artifacts = [
    <figure key="poster" className="artifact artifact--poster">
      <Image src="/work/suramu/poster.webp" alt={t.process.artifacts.poster} width={1280} height={1600} sizes="(max-width: 900px) 70vw, 340px" />
    </figure>,
    <figure key="mobile" className="artifact artifact--phone">
      <Image src="/work/suramu/mobile.jpg" alt={t.process.artifacts.mobile} width={780} height={1688} sizes="(max-width: 900px) 52vw, 240px" />
    </figure>,
    <figure key="manifesto" className="artifact artifact--screen">
      <Image src="/work/suramu/detail-1.jpg" alt={t.process.artifacts.manifesto} width={1440} height={900} sizes="(max-width: 900px) 90vw, 520px" />
    </figure>,
    <div key="tokens" className="artifact artifact--tokens">
      <ul className="tokens__swatches">
        {[
          ["#C8141A", "sushi red"],
          ["#2A2A2A", "charcoal"],
          ["#F4F1EC", "paper"],
          ["#F2B8B8", "pink"],
        ].map(([hex, name]) => (
          <li key={hex} style={{ background: hex }}>
            <span className="mono">{hex}</span>
            <span className="mono">{name}</span>
          </li>
        ))}
      </ul>
      <p className="tokens__type">
        Nosso sushi <mark>não tem</mark> cream cheese
      </p>
    </div>,
    <figure key="code" className="artifact artifact--code">
      <figcaption className="mono">{t.process.artifacts.code}</figcaption>
      <pre>
        <code>{FISH_CODE}</code>
      </pre>
    </figure>,
  ];

  return (
    <>
      <JsonLd lang={lang} t={t} />
      <Header lang={lang} nav={t.nav} whatsappHref={wa} />
      <CursorDot />

      <main id="topo">
        <Hero t={t.hero} whatsappHref={wa} latest={{ name: t.work.items.suramu.client, href: "#case-suramu" }} />

        {/* Crenças: o ponto do hero vira este bloco azul */}
        <section className="beliefs flood" aria-label={t.beliefs.label}>
          <div className="container">
            <p className="kicker">{t.beliefs.label}</p>
            <ol className="beliefs__list">
              {t.beliefs.items.map((b, i) => (
                <li key={b} className="beliefs__item">
                  <span className="beliefs__num mono" aria-hidden="true">
                    {i + 1}/{t.beliefs.items.length}
                  </span>
                  <SplitTitle text={b} as="p" className="beliefs__text" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cases */}
        <section className="cases" id="cases" aria-labelledby="cases-title">
          <div className="container">
            <header className="cases__head">
              <Reveal>
                <p className="kicker">{t.work.kicker}</p>
              </Reveal>
              <SplitTitle text={t.work.title} className="section__title cases__title" id="cases-title" />
              <Reveal delay={0.15}>
                <p className="section__intro">{t.work.intro}</p>
              </Reveal>
            </header>

            {featuredProjects.map((p, i) => {
              const c = t.work.items[p.id];
              const [d1, d2] = details(p.id);
              return (
                <article key={p.id} className="case" id={`case-${p.id}`} aria-labelledby={`case-${p.id}-name`}>
                  <Reveal className="case__rule">
                    <span className="mono">
                      {pad(i)} / {pad(total - 1)}
                    </span>
                    <span className="mono">{t.work.kindLabel[p.kind]} · 2026</span>
                  </Reveal>
                  <header className="case__head">
                    <h3 className="case__name" id={`case-${p.id}-name`}>
                      {c.client}
                      <span className="dot" aria-hidden="true" />
                    </h3>
                    <p className="case__segment">{c.segment}</p>
                  </header>
                  <Reveal>
                    <p className="case__quote">{c.quote}</p>
                  </Reveal>

                  <Reveal className="case__media" y={60}>
                    <CaseMedia
                      desktop={shot(p.id, "desktop")}
                      mobile={shot(p.id, "mobile")}
                      alt={`${c.client}: ${c.quote}`}
                      href={p.url}
                      label={`${t.work.labels.visit}: ${c.client}`}
                      cursor={t.work.labels.cursor}
                      flip={i % 2 === 1}
                    />
                  </Reveal>

                  <div className="case__grid">
                    <dl className="case__story">
                      {(
                        [
                          [t.work.labels.objective, c.objective],
                          [t.work.labels.concept, c.concept],
                          [t.work.labels.solution, c.solution],
                        ] as const
                      ).map(([label, text], k) => (
                        <Reveal key={label} delay={k * 0.08}>
                          <dt className="mono">{label}</dt>
                          <dd>{text}</dd>
                        </Reveal>
                      ))}
                    </dl>
                    <Reveal className="case__side" delay={0.12}>
                      <p className="mono case__label">{t.work.labels.decisions}</p>
                      <ol className="case__decisions">
                        {c.decisions?.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ol>
                      <p className="mono case__label">{t.work.labels.stack}</p>
                      <p className="case__stack">{p.stack.join(" · ")}</p>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noopener" className="btn btn--dark case__link">
                          {t.work.labels.visit} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </Reveal>
                  </div>

                  <div className="case__details">
                    {[d1, d2].map((src, k) => (
                      <Reveal key={src} className="case__detail" delay={k * 0.1}>
                        <Image src={src} alt={`${c.client} · ${k + 1}/2`} width={1440} height={900} sizes="(max-width: 900px) 86vw, 50vw" />
                      </Reveal>
                    ))}
                  </div>
                </article>
              );
            })}

            <MoreWork
              title={t.work.moreTitle}
              cursor={t.work.labels.cursor}
              items={moreProjects.map((p) => ({
                id: p.id,
                ...t.work.items[p.id],
                kind: t.work.kindLabel[p.kind],
                url: p.url,
                image: shot(p.id, "desktop"),
                privateNote: t.work.labels.private,
              }))}
            />
          </div>
        </section>

        <ProcessAxis
          kicker={t.process.kicker}
          title={t.process.title}
          intro={t.process.intro}
          steps={t.process.steps}
          artifacts={artifacts}
        />

        {/* Quem faz */}
        <section className="about" id="sobre" aria-labelledby="about-title">
          <div className="container about__grid">
            <Reveal className="about__photo">
              <Image src="/leonardo-retrato.jpg" alt={t.about.photoAlt} width={900} height={1600} sizes="(max-width: 900px) 80vw, 420px" />
            </Reveal>
            <div className="about__copy">
              <Reveal>
                <p className="kicker">{t.about.kicker}</p>
                <p className="about__name">
                  {t.about.name}
                  <span className="dot" aria-hidden="true" />
                </p>
                <p className="about__role mono">{t.about.role}</p>
              </Reveal>
              <SplitTitle text={t.about.title} className="about__title" id="about-title" />
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="about__text">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ferramentas */}
        <section className="tools" aria-labelledby="tools-title">
          <div className="container">
            <Reveal>
              <p className="kicker">{t.tools.kicker}</p>
            </Reveal>
            <SplitTitle text={t.tools.title} className="section__title" id="tools-title" />
            <ul className="tools__list">
              {t.tools.items.map((it, i) => (
                <li key={it.tools}>
                  <Reveal className="tools__row" delay={i * 0.05} lit>
                    <span className="tools__name">{it.tools}</span>
                    <span className="tools__text">{it.text}</span>
                    <span className="tools__proof mono">{it.proof}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <p className="tools__note mono">{t.tools.note}</p>
            </Reveal>
          </div>
        </section>

        {/* Como trabalhar comigo: planos e dúvidas, condensados */}
        <section className="offer" aria-labelledby="offer-title">
          <div className="container offer__grid">
            <div className="offer__intro">
              <Reveal>
                <p className="kicker">{t.offer.kicker}</p>
              </Reveal>
              <SplitTitle text={t.offer.title} className="offer__title" id="offer-title" />
              <Reveal delay={0.1}>
                <dl className="offer__promises">
                  {t.offer.promises.map((p) => (
                    <div key={p.value}>
                      <dt>{p.value}</dt>
                      <dd>{p.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <div className="offer__side">
              <ul className="offer__formats">
                {t.offer.formats.map((f, i) => (
                  <li key={f.name}>
                    <Reveal className="offer__format" delay={i * 0.06}>
                      <span className="offer__format-name">{f.name}</span>
                      <span className="offer__format-text">{f.text}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <h3 className="offer__faq-title mono">{t.offer.faqTitle}</h3>
              <div className="faq__list">
                {t.offer.faq.map((item) => (
                  <details key={item.q} className="faq__item">
                    <summary>
                      {item.q}
                      <span className="faq__icon" aria-hidden="true" />
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contato: o ponto se abre de novo e vira o bloco azul final */}
        <section className="contact flood" id="contato" aria-labelledby="contact-title">
          <div className="container">
            <Reveal>
              <p className="kicker">{t.contact.kicker}</p>
            </Reveal>
            <Reveal delay={0.1} y={40}>
              <h2 className="contact__title" id="contact-title">
                {t.contact.titleBefore} <em>{t.contact.titleEm}</em>
                <span className="dot dot--light" aria-hidden="true" />
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="contact__text">{t.contact.text}</p>
              <div className="contact__actions">
                <a href={wa} className="btn btn--light btn--lg" target="_blank" rel="noopener">
                  {t.contact.primary} <span aria-hidden="true">↗</span>
                </a>
                <a href={`mailto:${site.email}`} className="btn btn--outline-light btn--lg">
                  {t.contact.email}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>
            © {new Date().getFullYear()} {site.name} · {t.footer.role}. {t.footer.rights}
          </p>
          <p className="footer__made mono">{t.footer.made}</p>
          <nav className="footer__links" aria-label="Redes">
            <a href={site.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={site.github} target="_blank" rel="noopener">GitHub</a>
            <a href="#topo">{t.footer.backToTop} ↑</a>
          </nav>
        </div>
      </footer>

      <a href={wa} className="mobile-cta" target="_blank" rel="noopener">
        {t.hero.primary}
      </a>
    </>
  );
}

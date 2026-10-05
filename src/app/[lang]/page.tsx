import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import { projects, shot } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { Header } from "@/components/Header";
import { ProcessAxis } from "@/components/ProcessAxis";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SearchDemo } from "@/components/SearchDemo";
import { JsonLd } from "@/components/JsonLd";
import {
  AreasWall,
  Marquee,
  Parallax,
  ScrollSection,
} from "@/components/motion";
import { FadeIn, HeroTitle, Reveal, SplitTitle } from "@/components/reveal";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const wa = whatsappLink(t.whatsappMessage);

  return (
    <>
      <JsonLd lang={lang} t={t} />
      <Header lang={lang} nav={t.nav} whatsappHref={wa} />

      <main id="topo">
        {/* Hero */}
        <section className="hero">
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <HeroTitle before={t.hero.titleBefore} em={t.hero.titleEm} after={t.hero.titleAfter} />
              <FadeIn delay={0.6}>
                <p className="hero__lead">{t.hero.lead}</p>
                <div className="hero__actions">
                  <a href={wa} className="btn btn--accent" target="_blank" rel="noopener">
                    {t.hero.primary} <span aria-hidden="true">↗</span>
                  </a>
                  <a href="#trabalhos" className="btn btn--ghost">
                    {t.hero.secondary}
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.8}>
                <dl className="hero__stats">
                  {t.hero.stats.map((s) => (
                    <div key={s.value}>
                      <dt>{s.value}</dt>
                      <dd>{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            </div>

            <div className="hero__visual">
              <FadeIn className="hero__photo" delay={0.3}>
                <Parallax className="hero__photo-frame" distance={50}>
                  <Image src="/leonardo-retrato.jpg" alt={t.hero.photoAlt} width={900} height={1600} priority sizes="(max-width: 900px) 90vw, 420px" />
                </Parallax>
                <div className="hero__badge">
                  <strong>{t.hero.photoCaption}</strong>
                  <span>{t.hero.photoRole}</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Por que ter um site */}
        <section className="section why" id="por-que">
          <div className="container why__grid">
            <div className="why__copy">
              <SectionHead kicker={t.why.kicker} title={t.why.title} intro={t.why.intro} />
            </div>
            <Reveal className="why__demo" delay={0.15}>
              <SearchDemo queries={t.why.queries} resultTitle={t.why.resultTitle} resultUrl={t.why.resultUrl} resultText={t.why.resultText} />
            </Reveal>
          </div>
          <div className="container">
            <div className="why__points">
              {t.why.points.map((pt, i) => (
                <Reveal key={pt.title} delay={i * 0.1} className="why__point" lit>
                  <span className="why__num">{pad(i)}</span>
                  <h3>{pt.title}</h3>
                  <p>{pt.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trabalhos */}
        <ScrollSection className="section section--work flood" id="trabalhos">
          <div className="container">
            <SectionHead kicker={t.work.kicker} title={t.work.title} intro={t.work.intro} />

            <Reveal>
              <ProjectShowcase
                items={projects.map((p) => ({
                  id: p.id,
                  url: p.url,
                  kind: p.kind,
                  kindLabel: t.work.kindLabel[p.kind],
                  ...t.work.items[p.id],
                  images: { desktop: shot(p.id, "desktop"), mobile: shot(p.id, "mobile") },
                }))}
                labels={{
                  ...t.work.carousel,
                  problemLabel: t.work.problemLabel,
                  deliveredLabel: t.work.deliveredLabel,
                  visit: t.work.visit,
                  privateNote: t.work.privateNote,
                }}
              />
            </Reveal>
          </div>
        </ScrollSection>

        {/* Áreas */}
        <section className="section areas" id="areas">
          <div className="container">
            <Reveal>
              <p className="kicker">{t.areas.kicker}</p>
            </Reveal>
            <SplitTitle text={t.areas.title} className="section__title areas__title" />
            <AreasWall list={t.areas.list} last={t.areas.last} />
            <Reveal className="areas__foot" delay={0.2}>
              <p>{t.areas.note}</p>
              <a href={wa} target="_blank" rel="noopener" className="link-arrow">
                {t.areas.cta} <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </section>

        <Marquee className="text-marquee" duration={32}>
          {t.niches.map((n) => (
            <span key={n} className="text-marquee__item">
              {n}
              <span className="text-marquee__dot" aria-hidden="true">/</span>
            </span>
          ))}
        </Marquee>

        {/* Serviços */}
        <section className="section" id="servicos">
          <div className="container">
            <SectionHead kicker={t.services.kicker} title={t.services.title} intro={t.services.intro} />
            <div className="services">
              {t.services.items.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1} className={`service${s.recommended ? " service--featured" : ""}`}>
                  <div className="service__head">
                    {s.recommended && <p className="service__badge">{t.services.recommended}</p>}
                    <h3 className="service__name">{s.name}</h3>
                    <p className="service__desc">{s.description}</p>
                  </div>
                  <ul className="service__list">
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <Reveal className="services__note">
              <p>{t.services.maintenance}</p>
            </Reveal>
          </div>
        </section>

        {/* Processo */}
        <ProcessAxis kicker={t.process.kicker} title={t.process.title} steps={t.process.steps} />

        {/* Sobre */}
        <section className="section" id="sobre">
          <div className="container about">
            <Reveal className="about__photo">
              <Image src="/leonardo-retrato.jpg" alt={t.hero.photoAlt} width={900} height={1600} sizes="(max-width: 900px) 90vw, 400px" />
            </Reveal>
            <div className="about__copy">
              <Reveal>
                <p className="kicker">{t.about.kicker}</p>
              </Reveal>
              <SplitTitle text={t.about.title} />
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="about__text">{p}</p>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <ul className="skills">
                  {t.about.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Dúvidas */}
        <ScrollSection className="section section--surface" id="duvidas">
          <div className="container faq">
            <SectionHead kicker={t.faq.kicker} title={t.faq.title} />
            <div className="faq__list">
              {t.faq.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.05} className="faq__row" lit>
                  <details className="faq__item">
                    <summary>
                      {item.q}
                      <span className="faq__icon" aria-hidden="true" />
                    </summary>
                    <p>{item.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Contato */}
        <ScrollSection className="contact flood" id="contato">
          <div className="contact__glow" aria-hidden="true" />
          <div className="container">
            <Reveal>
              <p className="kicker">{t.contact.kicker}</p>
            </Reveal>
            <Reveal delay={0.1} y={40}>
              <h2 className="contact__title">
                {t.contact.titleBefore} <em>{t.contact.titleEm}</em>
                <span className="accent">{t.contact.titleAfter}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
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
        </ScrollSection>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>
            © {new Date().getFullYear()} {site.name} · {t.footer.role}. {t.footer.rights}
          </p>
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

function SectionHead({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="section__head">
      <Reveal>
        <p className="kicker">{kicker}</p>
      </Reveal>
      <SplitTitle text={title} />
      {intro && (
        <Reveal delay={0.2}>
          <p className="section__intro">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

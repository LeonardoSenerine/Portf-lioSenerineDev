import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import { projects, shot } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { Header } from "@/components/Header";
import { DeviceMockup } from "@/components/DeviceMockup";
import { SiteViewer } from "@/components/SiteViewer";
import { SearchDemo } from "@/components/SearchDemo";
import {
  AreasWall,
  CountUp,
  DrawLine,
  FadeIn,
  HeroTitle,
  Magnetic,
  Marquee,
  Parallax,
  Reveal,
  ScrollSection,
  SplitTitle,
  Spotlight,
} from "@/components/motion";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const wa = whatsappLink(t.whatsappMessage);

  return (
    <>
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
                  <Magnetic>
                    <a href={wa} className="btn btn--accent" target="_blank" rel="noopener">
                      {t.hero.primary} <span aria-hidden="true">↗</span>
                    </a>
                  </Magnetic>
                  <a href="#trabalhos" className="btn btn--ghost">
                    {t.hero.secondary}
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.8}>
                <dl className="hero__stats">
                  {t.hero.stats.map((s) => (
                    <div key={s.label}>
                      <dt>
                        <CountUp value={s.value} />
                      </dt>
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

        {/* Faixa com as capturas dos sites */}
        <Marquee className="shots-marquee" duration={60}>
          {projects.map((p) => (
            <div className="shots-marquee__item" key={p.id}>
              <Image src={shot(p.id, "desktop")} alt="" width={1440} height={900} sizes="340px" />
            </div>
          ))}
        </Marquee>

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
                <Reveal key={pt.title} delay={i * 0.1} className="why__point">
                  <span className="why__num">{pad(i)}</span>
                  <h3>{pt.title}</h3>
                  <p>{pt.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trabalhos */}
        <section className="section" id="trabalhos">
          <div className="container">
            <SectionHead kicker={t.work.kicker} title={t.work.title} intro={t.work.intro} />

            <div className="cases">
              {projects.map((p, i) => {
                const item = t.work.items[p.id];
                return (
                  <Reveal key={p.id} className="case">
                    <article className="case__inner">
                      <div className="case__media">
                        <DeviceMockup id={p.id} url={p.url} alt={item.client} fullHeight={p.fullHeight} />
                        <span className="case__hint">{t.work.hoverHint}</span>
                      </div>
                      <div className="case__body">
                        <div className="case__meta">
                          <span className="case__index">{pad(i)}</span>
                          <span className={`chip chip--${p.kind}`}>{t.work.kindLabel[p.kind]}</span>
                        </div>
                        <p className="case__client">
                          {item.client} <span>· {item.segment}</span>
                        </p>
                        <h3 className="case__title">{item.title}</h3>
                        <dl className="case__story">
                          <dt>{t.work.problemLabel}</dt>
                          <dd>{item.problem}</dd>
                          <dt>{t.work.deliveredLabel}</dt>
                          <dd>{item.delivered}</dd>
                        </dl>
                        <ul className="case__metrics">
                          {item.metrics.map((m) => (
                            <li key={m.label}>
                              <strong>
                                <CountUp value={m.value} />
                              </strong>
                              <span>{m.label}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="case__links">
                          <a href={p.url} target="_blank" rel="noopener" className="btn btn--dark btn--sm">
                            {t.work.visit} <span aria-hidden="true">↗</span>
                          </a>
                          <a href="#ao-vivo" className="link-arrow">
                            {t.work.preview} <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ao vivo */}
        <ScrollSection className="section section--surface" id="ao-vivo">
          <div className="container">
            <SectionHead kicker={t.live.kicker} title={t.live.title} intro={t.live.intro} />
            <Reveal>
              <SiteViewer
                items={projects.map((p) => ({ id: p.id, url: p.url, client: t.work.items[p.id].client, segment: t.work.items[p.id].segment }))}
                labels={t.live}
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
              <span className="text-marquee__dot">✦</span>
            </span>
          ))}
        </Marquee>

        {/* Serviços */}
        <section className="section" id="servicos">
          <div className="container">
            <SectionHead kicker={t.services.kicker} title={t.services.title} intro={t.services.intro} />
            <div className="services">
              {t.services.items.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <Spotlight className={`service${s.recommended ? " service--featured" : ""}`}>
                    <div className="service__top">
                      <span className="service__index">{pad(i)}</span>
                      {s.recommended && <span className="chip chip--accent">{t.services.recommended}</span>}
                    </div>
                    <h3 className="service__name">{s.name}</h3>
                    <p className="service__desc">{s.description}</p>
                    <ul className="service__list">
                      {s.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
            <Reveal className="services__note">
              <p>{t.services.maintenance}</p>
            </Reveal>
          </div>
        </section>

        {/* Processo */}
        <ScrollSection className="section section--surface" id="processo">
          <div className="container">
            <SectionHead kicker={t.process.kicker} title={t.process.title} />
            <DrawLine className="draw-line" />
            <div className="steps">
              {t.process.steps.map((step, i) => (
                <Reveal key={step.title} delay={0.15 + i * 0.12} className="step">
                  <span className="step__num">{pad(i)}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </ScrollSection>

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
                <Reveal key={item.q} delay={i * 0.05}>
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
        <ScrollSection className="contact" id="contato">
          <div className="contact__glow" aria-hidden="true" />
          <div className="container">
            <Reveal>
              <p className="kicker kicker--light">{t.contact.kicker}</p>
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
                <Magnetic>
                  <a href={wa} className="btn btn--accent btn--lg" target="_blank" rel="noopener">
                    {t.contact.primary} <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
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

import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import { featuredProjects, moreProjects, shot } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CaseStudy } from "@/components/CaseStudy";
import { MoreWork } from "@/components/MoreWork";
import { ProcessAxis } from "@/components/ProcessAxis";
import { CursorDot } from "@/components/CursorDot";
import { SectionHead } from "@/components/SectionHead";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, SplitTitle } from "@/components/reveal";

const pad = (n: number) => String(n).padStart(2, "0");
// Seções com fólio (numeração de página), na ordem em que aparecem.
const TOTAL = 10;

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

  // Artefatos reais da SURAMU, um para cada etapa do processo.
  const artifacts = [
    <figure key="poster" className="artifact artifact--poster">
      <Image src="/work/suramu/poster.webp" alt={t.process.artifacts.poster} width={1280} height={1600} sizes="(max-width: 900px) 70vw, 340px" />
    </figure>,
    <figure key="manifesto" className="artifact artifact--screen">
      <Image src="/work/suramu/detail-1.jpg" alt={t.process.artifacts.manifesto} width={1440} height={900} sizes="(max-width: 900px) 90vw, 520px" />
    </figure>,
    <figure key="code" className="artifact artifact--code">
      <figcaption className="mono">{t.process.artifacts.code}</figcaption>
      <pre>
        <code>{FISH_CODE}</code>
      </pre>
    </figure>,
    <figure key="mobile" className="artifact artifact--phone">
      <Image src="/work/suramu/mobile.jpg" alt={t.process.artifacts.mobile} width={780} height={1688} sizes="(max-width: 900px) 52vw, 240px" />
    </figure>,
    <figure key="og" className="artifact artifact--og">
      <Image src="/work/suramu/og.jpg" alt={t.process.artifacts.og} width={1200} height={630} sizes="(max-width: 900px) 90vw, 520px" />
      <figcaption>
        <strong>suramusushi.vercel.app</strong>
        <span>SURAMU スラム · Real Sushi · Delivery de Quebrada</span>
      </figcaption>
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
            <Reveal>
              <p className="beliefs__closing mono">
                <span className="dot" aria-hidden="true" /> {t.beliefs.closing}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 01 · Por que ter um site */}
        <section className="why" id="por-que" aria-labelledby="why-title">
          <div className="container">
            <SectionHead kicker={t.why.kicker} title={t.why.title} intro={t.why.intro} folio={1} total={TOTAL} id="why-title" />
            <ol className="why__points">
              {t.why.points.map((pt, i) => (
                <li key={pt.title}>
                  <Reveal className="why__point" delay={i * 0.08}>
                    <span className="why__num mono">{pad(i + 1)}</span>
                    <h3>{pt.title}</h3>
                    <p>{pt.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 02 · Cases: cada um numa sala com as cores da marca */}
        <section className="cases" id="cases" aria-labelledby="cases-title">
          <div className="container">
            <SectionHead kicker={t.work.kicker} title={t.work.title} intro={t.work.intro} folio={2} total={TOTAL} id="cases-title" className="cases__head" />
          </div>
          {featuredProjects.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} total={featuredProjects.length} t={t.work} />
          ))}
          <div className="container">
            <MoreWork
              title={t.work.moreTitle}
              cursor={t.work.labels.cursor}
              start={featuredProjects.length + 1}
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

        {/* 03 · Áreas */}
        <section className="areas" id="areas" aria-labelledby="areas-title">
          <div className="container">
            <SectionHead kicker={t.areas.kicker} title={t.areas.title} folio={3} total={TOTAL} id="areas-title" />
            <p className="areas__wall">
              {t.areas.list.map((w) => (
                <span key={w} className="areas__item">
                  <span className="areas__word">{w}</span>
                  <span className="areas__sep" aria-hidden="true" />
                </span>
              ))}
              <em className="areas__last">
                {t.areas.last}
                <span className="dot" aria-hidden="true" />
              </em>
            </p>
            <Reveal className="areas__foot">
              <p>{t.areas.note}</p>
              <a href={wa} target="_blank" rel="noopener" className="link-arrow">
                {t.areas.cta} <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* 04 · Serviços */}
        <section className="services" id="servicos" aria-labelledby="services-title">
          <div className="container">
            <SectionHead kicker={t.services.kicker} title={t.services.title} intro={t.services.intro} folio={4} total={TOTAL} id="services-title" />
            <ol className="services__list">
              {t.services.items.map((s, i) => (
                <li key={s.name}>
                  <Reveal className={`service${s.recommended ? " service--featured" : ""}`} delay={i * 0.06}>
                    <div className="service__head">
                      <span className="service__num mono">{pad(i + 1)}</span>
                      <h3 className="service__name">{s.name}</h3>
                      {s.recommended && <span className="service__badge mono">{t.services.recommended}</span>}
                    </div>
                    <p className="service__desc">{s.description}</p>
                    <ul className="service__features">
                      {s.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <p className="services__note">{t.services.maintenance}</p>
            </Reveal>
          </div>
        </section>

        {/* 05 · Diferencial: você fala com quem faz */}
        <section className="direct" aria-labelledby="direct-title">
          <div className="container">
            <SectionHead kicker={t.direct.kicker} title={t.direct.title} intro={t.direct.intro} folio={5} total={TOTAL} id="direct-title" />
            <Reveal className="chain">
              <div className="chain__row chain__row--agency">
                <p className="chain__label mono">{t.direct.agencyLabel}</p>
                <ol className="chain__line">
                  {t.direct.agencyChain.map((s, i) => (
                    <li key={s} style={{ "--i": i } as CSSProperties}>
                      <span className="chain__node" aria-hidden="true" />
                      <span className="chain__name">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="chain__note mono">{t.direct.agencyNote}</p>
              </div>
              <div className="chain__row chain__row--direct">
                <p className="chain__label mono">{t.direct.senerineLabel}</p>
                <ol className="chain__line">
                  <li>
                    <span className="chain__node" aria-hidden="true" />
                    <span className="chain__name">{t.direct.you}</span>
                  </li>
                  <li>
                    <span className="chain__node" aria-hidden="true" />
                    <span className="chain__name">{t.direct.me}</span>
                  </li>
                </ol>
                <p className="chain__note mono">{t.direct.senerineNote}</p>
              </div>
            </Reveal>
            <ol className="direct__benefits">
              {t.direct.benefits.map((b, i) => (
                <li key={b.title}>
                  <Reveal className="direct__benefit" delay={(i % 3) * 0.06}>
                    <span className="direct__num" aria-hidden="true">
                      <span className="dot" />
                      {i + 1}
                    </span>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 06 · Processo */}
        <ProcessAxis
          kicker={t.process.kicker}
          title={t.process.title}
          intro={t.process.intro}
          steps={t.process.steps}
          artifacts={artifacts}
          folio={`${pad(6)} / ${pad(TOTAL)}`}
        />

        {/* 07 · Sobre */}
        <section className="about" id="sobre" aria-labelledby="about-title">
          <div className="container about__grid">
            <Reveal className="about__photo">
              <Image src="/leonardo-retrato.jpg" alt={t.about.photoAlt} width={900} height={1600} sizes="(max-width: 900px) 80vw, 420px" />
            </Reveal>
            <div className="about__copy">
              <Reveal className="shead__rule">
                <p className="kicker">{t.about.kicker}</p>
                <p className="shead__folio mono" aria-hidden="true">
                  {pad(7)} / {pad(TOTAL)}
                </p>
              </Reveal>
              <SplitTitle text={t.about.title} className="about__title" id="about-title" />
              <Reveal delay={0.1}>
                <p className="about__philosophy">
                  {t.about.philosophy}
                  <span className="dot" aria-hidden="true" />
                </p>
                <p className="about__role mono">
                  {t.about.name} · {t.about.role}
                </p>
              </Reveal>
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <p className="about__text">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 08 · Ferramentas */}
        <section className="tools" aria-labelledby="tools-title">
          <div className="container">
            <SectionHead kicker={t.tools.kicker} title={t.tools.title} folio={8} total={TOTAL} id="tools-title" />
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

        {/* 09 · Dúvidas */}
        <section className="faq" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq__grid">
            <SectionHead kicker={t.faq.kicker} title={t.faq.title} folio={9} total={TOTAL} id="faq-title" />
            <div className="faq__list">
              {t.faq.items.map((item) => (
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
        </section>

        {/* 10 · Contato: o ponto se abre de novo e vira o bloco azul final */}
        <section className="contact flood" id="contato" aria-labelledby="contact-title">
          <div className="container">
            <Reveal className="shead__rule">
              <p className="kicker">{t.contact.kicker}</p>
              <p className="shead__folio mono" aria-hidden="true">
                {pad(10)} / {pad(TOTAL)}
              </p>
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
            © {new Date().getFullYear()} {site.brand} · {t.footer.role}. {t.footer.rights}
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

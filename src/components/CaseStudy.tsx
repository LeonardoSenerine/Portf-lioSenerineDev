import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import { details, shot, type Project } from "@/content/projects";
import { CaseMedia } from "./CaseMedia";
import { Reveal } from "./reveal";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  project: Project;
  index: number;
  total: number;
  t: Dictionary["work"];
};

// Um case como uma "sala": as cores são da marca do cliente (data-room), a
// moldura é sempre do Senerine (régua, ponto, ficha técnica e notas de decisão).
export function CaseStudy({ project: p, index, total, t }: Props) {
  const c = t.items[p.id];
  const L = t.labels;
  const [d1, d2] = details(p.id);
  const flip = index % 2 === 1;

  const sheet: [string, string][] = [
    [L.client, c.client],
    [L.year, String(p.year)],
    [L.role, L.roleValue],
    [L.stack, p.stack.join(" · ")],
    [L.status, t.kindLabel[p.kind]],
  ];
  const story: [string, string | undefined][] = [
    [L.concept, c.concept],
    [L.challenge, c.challenge],
    [L.solution, c.solution],
  ];

  return (
    <article className={`case${flip ? " case--flip" : ""}`} data-room={p.id} id={`case-${p.id}`} aria-labelledby={`case-${p.id}-name`}>
      <div className="container">
        <Reveal className="case__rule">
          <span className="mono">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="mono">
            {t.kindLabel[p.kind]} · {p.year}
          </span>
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
      </div>

      <div className="container case__media">
        <Reveal y={60}>
          <CaseMedia
            desktop={shot(p.id, "desktop")}
            mobile={shot(p.id, "mobile")}
            alt={`${c.client}: ${c.quote}`}
            href={p.url}
            label={`${L.visit}: ${c.client}`}
            cursor={L.cursor}
            flip={flip}
          />
        </Reveal>
      </div>

      <div className="container">
        {/* Ficha técnica: o mesmo formato em todo case */}
        <Reveal>
          <dl className="case__sheet">
            {sheet.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="case__story">
          {story.map(([label, text], k) => (
            <Reveal key={label} className="case__block" delay={k * 0.08}>
              <h4 className="mono case__label">{label}</h4>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>

        {/* As decisões são notas numeradas pelo ponto, não uma lista de recursos */}
        <section className="case__notes" aria-label={L.decisions}>
          <Reveal>
            <p className="mono case__label">{L.decisions}</p>
          </Reveal>
          <ol>
            {c.decisions?.map((d, k) => (
              <li key={d.text}>
                <Reveal className="case__note" delay={k * 0.08}>
                  <span className="case__note-num" aria-hidden="true">
                    <span className="dot" />
                    {k + 1}
                  </span>
                  <span className="case__note-area mono">{d.area}</span>
                  <p className="case__note-text">{d.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <div className="case__details">
          {[d1, d2].map((src, k) => (
            <Reveal key={src} className="case__detail" delay={k * 0.12} y={k === 1 ? 80 : 40}>
              <Image src={src} alt={`${c.client} · ${k + 1}/2`} width={1440} height={900} sizes="(max-width: 900px) 86vw, 62vw" />
            </Reveal>
          ))}
        </div>

        {p.url && (
          <Reveal className="case__cta">
            <a href={p.url} target="_blank" rel="noopener" className="btn btn--dark btn--lg">
              {L.visitCase} {c.client} <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        )}
      </div>
    </article>
  );
}

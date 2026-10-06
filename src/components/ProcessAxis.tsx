"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "./motion";

type Step = { title: string; tags: string[]; question: string; text: string; example: string };

const pad = (n: number) => String(n + 1).padStart(2, "0");

// Processo como um eixo que acende, com um artefato real ao lado de cada etapa.
// No computador o bloco fica preso na tela: os passos deslizam pelo eixo, o da vez
// fica no meio e o artefato correspondente aparece no palco à direita (descendo e
// subindo). No celular nada fica preso: cada passo traz o próprio artefato logo
// abaixo e acende ao passar do meio da tela (data-lit, pelo RevealObserver).
export function ProcessAxis({
  kicker,
  title,
  intro,
  steps,
  artifacts,
  folio,
}: {
  folio: string;
  kicker: string;
  title: string;
  intro: string;
  steps: Step[];
  artifacts: ReactNode[];
}) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const n = steps.length;
  const [active, setActive] = useState(0);

  const pinned = useScroll({ target: ref, offset: ["start start", "end end"] });
  const flowing = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });

  // Uma folga no começo e no fim, para o primeiro e o último passo ficarem um
  // pouco parados no centro.
  const reel = useTransform(pinned.scrollYProgress, (p) => Math.min(1, Math.max(0, (p - 0.05) / 0.9)));
  const shift = useTransform(reel, (q) => `translateY(calc(${-q * (n - 1)} * var(--pstep-h)))`);

  useMotionValueEvent(reel, "change", (q) => {
    if (desktop) setActive(Math.round(q * (n - 1)));
  });

  return (
    <section ref={ref} className="process flood" id="processo" aria-labelledby="process-title">
      <div className="process__pin container">
        <div className="process__head">
          <div>
            <div className="shead__rule">
              <p className="kicker">{kicker}</p>
              <p className="shead__folio mono" aria-hidden="true">{folio}</p>
            </div>
            <h2 className="section__title" id="process-title">
              {title}
              <span className="dot" aria-hidden="true" />
            </h2>
            <p className="process__intro">{intro}</p>
          </div>
          <p className="process__count" aria-hidden="true">
            <strong>{pad(active)}</strong> / {pad(n - 1)}
          </p>
        </div>

        <div className="process__body">
          <div className="process__viewport">
            {/* a linha do eixo fica fora da lista (só <li> dentro de <ol>), mas anda junto com ela */}
            <motion.div className="process__axis" style={desktop ? { transform: shift } : undefined}>
              <span className="process__line" aria-hidden="true">
                <motion.span className="process__fill" style={{ scaleY: desktop ? reel : flowing.scrollYProgress }} />
              </span>
              <ol className="process__steps">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  data-lit=""
                  className={`pstep${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
                >
                  <span className="pstep__num">{pad(i)}</span>
                  <div className="pstep__body">
                    <h3 className="pstep__title">{step.title}</h3>
                    <ul className="pstep__tags mono">
                      {step.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <p className="pstep__question">{step.question}</p>
                    <p className="pstep__text">
                      {step.text} <span className="pstep__example">{step.example}</span>
                    </p>
                  </div>
                  {/* no celular o artefato acompanha o próprio passo */}
                  <div className="pstep__artifact">{artifacts[i]}</div>
                </li>
              ))}
              </ol>
            </motion.div>
          </div>

          {/* no computador, um palco fixo troca o artefato conforme o passo da vez */}
          <div className="process__stage" aria-hidden="true">
            {artifacts.map((a, i) => (
              <div key={i} className={`process__art${i === active ? " is-active" : ""}`}>
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

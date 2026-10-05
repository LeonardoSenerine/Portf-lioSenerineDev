"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "./motion";

type Step = { title: string; text: string };

const pad = (n: number) => String(n + 1).padStart(2, "0");

// Processo como um eixo que acende. No computador o bloco azul fica preso na
// tela e os passos, bem espaçados, deslizam pelo eixo: o passo da vez fica no
// meio, acende e o contador avança (descendo e subindo). No celular nada fica
// preso: é uma lista com o eixo na lateral, e cada passo acende ao passar do
// meio da tela (data-lit, pelo RevealObserver).
export function ProcessAxis({ kicker, title, steps }: { kicker: string; title: string; steps: Step[] }) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const n = steps.length;
  const [active, setActive] = useState(0);

  const pinned = useScroll({ target: ref, offset: ["start start", "end end"] });
  const flowing = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });

  // Uma folga no começo e no fim, para o primeiro e o último passo ficarem um
  // pouco parados no centro.
  const reel = useTransform(pinned.scrollYProgress, (p) => Math.min(1, Math.max(0, (p - 0.06) / 0.88)));
  const shift = useTransform(reel, (q) => `translateY(calc(${-q * (n - 1)} * var(--pstep-h)))`);

  useMotionValueEvent(reel, "change", (q) => {
    if (desktop) setActive(Math.round(q * (n - 1)));
  });

  return (
    <section ref={ref} className="process flood" id="processo">
      <div className="process__pin container">
        <div className="process__head">
          <div>
            <p className="kicker">{kicker}</p>
            <h2 className="section__title">{title}</h2>
          </div>
          <p className="process__count" aria-hidden="true">
            <strong>{pad(active)}</strong> / {pad(n - 1)}
          </p>
        </div>

        <div className="process__viewport">
          <motion.ol className="process__axis" style={desktop ? { transform: shift } : undefined}>
            <span className="process__line" aria-hidden="true">
              <motion.span className="process__fill" style={{ scaleY: desktop ? reel : flowing.scrollYProgress }} />
            </span>
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-lit=""
                className={`pstep${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
              >
                <h3 className="pstep__title">{step.title}</h3>
                <span className="pstep__num">{pad(i)}</span>
                <p className="pstep__text">{step.text}</p>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

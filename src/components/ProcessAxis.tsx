"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useIsDesktop } from "./motion";

type Step = { title: string; text: string };

const pad = (n: number) => String(n + 1).padStart(2, "0");

// Processo como um eixo que acende. No computador o bloco azul fica preso na
// tela enquanto a rolagem percorre os passos: o eixo enche, o passo da vez
// acende e o contador avança (descendo e subindo). No celular nada fica preso:
// é uma lista com o eixo na lateral, e cada passo acende ao passar do meio da
// tela (data-lit, pelo RevealObserver).
export function ProcessAxis({ kicker, title, steps }: { kicker: string; title: string; steps: Step[] }) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const n = steps.length;
  const [active, setActive] = useState(0);

  const pinned = useScroll({ target: ref, offset: ["start start", "end end"] });
  const flowing = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });

  useMotionValueEvent(pinned.scrollYProgress, "change", (p) => {
    if (desktop) setActive(Math.min(n - 1, Math.floor(p * n)));
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

        <ol className="process__axis">
          <span className="process__line" aria-hidden="true">
            <motion.span className="process__fill" style={{ scaleY: desktop ? pinned.scrollYProgress : flowing.scrollYProgress }} />
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
        </ol>
      </div>
    </section>
  );
}

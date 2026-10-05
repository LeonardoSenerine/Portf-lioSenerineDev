"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { CountUp } from "./motion";

export type ShowcaseItem = {
  id: string;
  url: string | null;
  kind: "real" | "concept";
  kindLabel: string;
  client: string;
  segment: string;
  title: string;
  problem: string;
  delivered: string;
  metrics: { value: string; label: string }[];
  image: string;
};

type Labels = {
  region: string;
  problemLabel: string;
  deliveredLabel: string;
  visit: string;
  privateNote: string;
  pickHint: string;
  pause: string;
  play: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
// Quantos cartões formam a volta completa do cilindro (os projetos se repetem).
const SLOTS = 30;
const STEP = 360 / SLOTS;
// Velocidade do giro: uma volta a cada 90 s.
const DEG_PER_MS = 360 / 90000;
const DRAG_DEG_PER_PX = 0.08;

// Faixa curva infinita: a câmera fica no centro de um cilindro de cartões que
// gira sem parar. As bordas crescem e viram para quem vê, como num estúdio.
export function ProjectShowcase({ items, labels }: { items: ShowcaseItem[]; labels: Labels }) {
  const rot = useMotionValue(0);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);

  const curveRef = useRef<HTMLDivElement>(null);
  const inView = useInView(curveRef, { amount: 0.2 });
  const reduce = useReducedMotion();
  const hovering = useRef(false);
  const dragging = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!playing || reduce || !inView || hovering.current || dragging.current) return;
    rot.set(rot.get() - delta * DEG_PER_MS);
  });

  const ringTransform = useTransform(rot, (r) => `translateZ(var(--curve-r)) rotateY(${r}deg)`);

  const onPan = (_: unknown, info: PanInfo) => {
    dragging.current = true;
    rot.set(rot.get() + info.delta.x * DRAG_DEG_PER_PX);
  };
  const onPanEnd = () => {
    dragging.current = false;
  };

  const slots = Array.from({ length: SLOTS }, (_, s) => s);

  return (
    <div className="showcase" role="region" aria-label={labels.region}>
      <motion.div
        ref={curveRef}
        className="curve"
        onPan={onPan}
        onPanEnd={onPanEnd}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hovering.current = true;
        }}
        onPointerLeave={() => {
          hovering.current = false;
        }}
      >
        <motion.div className="curve__ring" style={{ transform: ringTransform }}>
          {slots.map((s) => {
            const index = s % items.length;
            return (
              <CurveCard
                key={s}
                slot={s}
                item={items[index]}
                rot={rot}
                selected={index === selected}
                onSelect={() => setSelected(index)}
              />
            );
          })}
        </motion.div>
      </motion.div>

      {/* Seleção acessível: os nomes dos projetos; o cartão clicado também seleciona. */}
      <div className="showcase__picker">
        <div className="showcase__tabs" role="tablist" aria-label={labels.region}>
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === selected}
              className={`showcase__tab${i === selected ? " is-active" : ""}`}
              onClick={() => setSelected(i)}
            >
              {i === selected && <motion.span layoutId="showcase-tab" className="showcase__tab-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span>{it.client}</span>
            </button>
          ))}
        </div>
        {!reduce && (
          <button
            type="button"
            className="showcase__play"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? labels.pause : labels.play}
            aria-pressed={!playing}
          >
            {playing ? "❚❚" : "▶"}
          </button>
        )}
      </div>
      <p className="showcase__hint">{labels.pickHint}</p>

      {/* Todas as explicações ocupam a mesma célula: a altura é a da maior e a
          página não pula quando o projeto troca. */}
      <div className="showcase__details">
        {items.map((it, i) => {
          const on = i === selected;
          return (
            <motion.article
              key={it.id}
              className="showcase__detail"
              role="tabpanel"
              aria-hidden={!on}
              initial={false}
              animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease, delay: on ? 0.1 : 0 }}
              style={{ visibility: on ? "visible" : "hidden", pointerEvents: on ? "auto" : "none" }}
            >
              <div className="showcase__head">
                <span className={`chip chip--${it.kind}`}>{it.kindLabel}</span>
                <p className="showcase__client">
                  {it.client} <span>· {it.segment}</span>
                </p>
                <h3 className="showcase__title">{it.title}</h3>
              </div>
              <dl className="showcase__story">
                <div>
                  <dt>{labels.problemLabel}</dt>
                  <dd>{it.problem}</dd>
                </div>
                <div>
                  <dt>{labels.deliveredLabel}</dt>
                  <dd>{it.delivered}</dd>
                </div>
              </dl>
              <ul className="showcase__metrics">
                {it.metrics.map((m) => (
                  <li key={m.label}>
                    <strong>{on ? <CountUp key={selected} value={m.value} /> : m.value}</strong>
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
              <div className="showcase__links">
                {it.url ? (
                  <a href={it.url} target="_blank" rel="noopener" className="btn btn--dark btn--sm" tabIndex={on ? 0 : -1}>
                    {labels.visit} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="case__private">{labels.privateNote}</span>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

type CardProps = {
  slot: number;
  item: ShowcaseItem;
  rot: MotionValue<number>;
  selected: boolean;
  onSelect: () => void;
};

// Cartão num ângulo fixo do cilindro; some quando passa para trás da câmera.
function CurveCard({ slot, item, rot, selected, onSelect }: CardProps) {
  const angle = slot * STEP;
  const opacity = useTransform(rot, (r) => {
    const rel = ((((angle + r) % 360) + 540) % 360) - 180;
    const a = Math.abs(rel);
    return a < 62 ? 1 : a > 78 ? 0 : (78 - a) / 16;
  });

  return (
    <motion.button
      type="button"
      className={`curve__card${selected ? " is-selected" : ""}`}
      style={{ transform: `rotateY(${angle}deg) translateZ(calc(var(--curve-r) * -1))`, opacity }}
      onClick={onSelect}
      tabIndex={-1}
      aria-hidden="true"
    >
      <Image src={item.image} alt="" fill sizes="(max-width: 700px) 30vw, 220px" className="curve__img" />
      <span className="curve__name">{item.client}</span>
    </motion.button>
  );
}

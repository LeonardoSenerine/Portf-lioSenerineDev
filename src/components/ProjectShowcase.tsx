"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
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
  images: { desktop: string; mobile: string };
};

type Labels = {
  region: string;
  problemLabel: string;
  deliveredLabel: string;
  visit: string;
  privateNote: string;
  pickHint: string;
  prev: string;
  next: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 150, damping: 22, mass: 0.9 } as const;
// O carrossel anda sozinho a cada 4 s, sem parar (só fica parado fora da tela e
// com "reduzir movimento"). Um toque nas setas ou nos pontos recomeça a contagem.
const AUTOPLAY_MS = 4000;

// Distância de um cartão até o centro, no caminho mais curto do laço (de -n/2 a n/2).
const wrap = (v: number, n: number) => ((((v + n / 2) % n) + n) % n) - n / 2;
const mod = (v: number, n: number) => ((v % n) + n) % n;

// Carrossel em leque: o cartão do centro fica grande e reto (nítido); os
// vizinhos encolhem, giram um pouco e ficam atrás. A posição é um número
// contínuo, então arrastar, as setas e o giro automático deslizam sem saltos.
// Quando a faixa entra na tela (descendo ou subindo), os cartões se abrem do centro.
export function ProjectShowcase({ items, labels }: { items: ShowcaseItem[]; labels: Labels }) {
  const n = items.length;
  const pos = useMotionValue(0);
  const spread = useMotionValue(0);
  const [selected, setSelected] = useState(0);
  const [kick, setKick] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.6 });
  const visible = useInView(stageRef, { amount: 0.2 });
  // As capturas são pedidas quando a faixa chega perto da tela, todas de uma vez.
  const near = useInView(stageRef, { once: true, margin: "600px 0px" });
  const reduce = useReducedMotion();

  const dragging = useRef(false);
  // Ignora o clique que vem logo depois de um arraste.
  const justDragged = useRef(false);
  const anim = useRef<AnimationPlaybackControls | null>(null);

  useMotionValueEvent(pos, "change", (v) => setSelected(mod(Math.round(v), n)));

  // Abre o leque ao entrar na tela e fecha ao sair, nos dois sentidos da rolagem.
  useEffect(() => {
    if (reduce) {
      spread.set(1);
      return;
    }
    const controls = animate(spread, visible ? 1 : 0, visible ? { duration: 1.2, ease } : { duration: 0.3 });
    return () => controls.stop();
  }, [visible, reduce, spread]);

  const goTo = useCallback(
    (target: number) => {
      anim.current?.stop();
      if (reduce) pos.set(target);
      else anim.current = animate(pos, target, spring);
    },
    [pos, reduce],
  );

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => {
      if (!dragging.current) goTo(Math.round(pos.get()) + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, inView, goTo, pos, kick]);

  const touch = () => setKick((k) => k + 1);
  const step = (dir: number) => {
    touch();
    goTo(Math.round(pos.get()) + dir);
  };
  const select = (i: number) => {
    if (justDragged.current) return;
    touch();
    const cur = pos.get();
    goTo(Math.round(cur + wrap(i - cur, n)));
  };

  // Um cartão de distância equivale a ~70% da largura do cartão arrastado.
  const unit = () => (stageRef.current?.querySelector<HTMLElement>(".cf__card")?.offsetWidth ?? 300) * 0.7;
  const onPanStart = () => {
    dragging.current = true;
    anim.current?.stop();
  };
  const onPan = (_: unknown, info: PanInfo) => {
    pos.set(pos.get() - info.delta.x / unit());
  };
  const onPanEnd = (_: unknown, info: PanInfo) => {
    dragging.current = false;
    justDragged.current = true;
    setTimeout(() => (justDragged.current = false), 250);
    touch();
    goTo(Math.round(pos.get() - (info.velocity.x / unit()) * 0.2));
  };

  return (
    <div
      className="showcase"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
    >
      <motion.div ref={stageRef} className="cf" onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd}>
        <div className="cf__beam" aria-hidden="true" />
        {items.map((it, i) => (
          <CoverCard
            key={it.id}
            index={i}
            n={n}
            item={it}
            pos={pos}
            spread={spread}
            load={near}
            active={i === selected}
            onSelect={() => select(i)}
          />
        ))}
      </motion.div>

      <div className="cf__controls">
        <button type="button" className="cf__arrow cf__arrow--prev" onClick={() => step(-1)} aria-label={labels.prev}>
          <span aria-hidden="true">←</span>
        </button>
        <div className="cf__dots" role="tablist" aria-label={labels.region}>
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={it.client}
              className={`cf__dot${i === selected ? " is-active" : ""}`}
              onClick={() => select(i)}
            />
          ))}
        </div>
        <button type="button" className="cf__arrow cf__arrow--next" onClick={() => step(1)} aria-label={labels.next}>
          <span aria-hidden="true">→</span>
        </button>
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
  index: number;
  n: number;
  item: ShowcaseItem;
  pos: MotionValue<number>;
  spread: MotionValue<number>;
  load: boolean;
  active: boolean;
  onSelect: () => void;
};

// Cada cartão calcula o próprio lugar a partir da distância até o centro:
// desliza para o lado, encolhe, gira de leve e vai para trás.
function CoverCard({ index, n, item, pos, spread, load, active, onSelect }: CardProps) {
  const d = useTransform(pos, (p) => wrap(index - p, n));
  const transform = useTransform([d, spread], ([dv, s]: number[]) => {
    const a = Math.abs(dv) * s;
    const sign = Math.sign(dv);
    const x = sign * (a <= 1 ? a * 68 : 68 + (a - 1) * 50);
    const scale = 1 - Math.min(a, 2.5) * 0.13;
    const rot = -sign * Math.min(a, 1.5) * 12;
    return `translateX(${x}%) scale(${scale}) rotateY(${rot}deg)`;
  });
  const zIndex = useTransform(d, (dv) => 10 - Math.round(Math.abs(dv) * 2));
  const opacity = useTransform(d, (dv) => {
    const a = Math.abs(dv);
    return a < 2.1 ? 1 : a > 2.7 ? 0 : (2.7 - a) / 0.6;
  });
  // Os de trás ficam um pouco mais escuros, para dar profundidade.
  const shade = useTransform([d, spread], ([dv, s]: number[]) => Math.min(Math.abs(dv) * s, 2) * 0.16);

  return (
    <motion.button
      type="button"
      className={`cf__card${active ? " is-active" : ""}`}
      style={{ transform, zIndex, opacity }}
      onClick={onSelect}
      tabIndex={-1}
      aria-hidden="true"
    >
      {load && (
        <Image
          src={item.images.mobile}
          alt=""
          fill
          sizes="(min-width: 900px) 360px, 68vw"
          loading="eager"
          className="cf__img"
          draggable={false}
        />
      )}
      <motion.span className="cf__shade" style={{ opacity: shade }} />
      <span className="cf__label">
        <strong>{item.client}</strong>
        <small>{item.kindLabel}</small>
      </span>
    </motion.button>
  );
}

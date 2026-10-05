"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type PointerEvent } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// reducedMotion="user": quem pede "reduzir movimento" no sistema vê só o fade, sem deslocamento.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease }}>
      {children}
    </MotionConfig>
  );
}

// Efeitos ligados à rolagem só no computador: no celular custam processamento
// e o ganho visual é pequeno.
const desktopQuery = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => false);
}

// Foto que sobe um pouco mais devagar que a rolagem.
export function Parallax({ children, className, distance = 60 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  const desktop = useIsDesktop();

  return (
    <div ref={ref} className={className}>
      <motion.div style={desktop ? { y } : undefined} className="parallax__inner">
        {children}
      </motion.div>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

// Linha que se desenha conforme a seção passa pela tela.
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 35%"] });
  return (
    <div ref={ref} className={className}>
      <motion.div className="draw-line__fill" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}

// Conta até o número quando aparece na tela; textos sem número ficam como estão.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || !inView) return;
    const raw = match[1];
    const thousands = /^\d{1,3}[.,]\d{3}$/.test(raw);
    const sep = thousands ? raw[raw.length - 4] : "";
    const target = Number(thousands ? raw.replace(/[.,]/, "") : raw.replace(",", "."));
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        const n = Math.round(v);
        const txt = thousands ? `${Math.floor(n / 1000)}${sep}${String(n % 1000).padStart(3, "0")}` : String(n);
        setDisplay((thousands && n < 1000 ? String(n) : txt) + match[2]);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}

// Cartão com um brilho que segue o cursor.
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} className={`spotlight ${className ?? ""}`} onPointerMove={onMove}>
      {children}
    </div>
  );
}

// Botão que é puxado de leve na direção do cursor.
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.span
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

// Faixa que corre em loop: animação em CSS, roda fora da thread principal.
export function Marquee({ children, duration = 28, reverse = false, className = "" }: { children: ReactNode; duration?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className={`marquee__track${reverse ? " marquee__track--reverse" : ""}`}
        style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

// Seção que "assenta" ao entrar na tela: começa um pouco menor e com cantos
// arredondados e vai até o tamanho cheio conforme a rolagem.
export function ScrollSection({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const desktop = useIsDesktop();
  return (
    <motion.section ref={ref} id={id} className={className} style={desktop ? { scale, borderRadius: radius } : undefined}>
      {children}
    </motion.section>
  );
}

// Parede de palavras: cada área entra em sequência; a última fica em itálico azul.
export function AreasWall({ list, last }: { list: string[]; last: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <p ref={ref} className="areas__wall">
      {list.map((word, i) => (
        <Fragment key={word}>
          <motion.span
            className="areas__item"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease, delay: i * 0.06 }}
          >
            <span className="areas__word">{word}</span>
            <span className="areas__sep" aria-hidden="true">
              /
            </span>
          </motion.span>{" "}
        </Fragment>
      ))}
      <motion.em
        className="areas__last"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: list.length * 0.06 + 0.1 }}
      >
        {last}.
      </motion.em>
    </p>
  );
}

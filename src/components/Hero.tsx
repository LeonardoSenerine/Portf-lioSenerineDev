"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/content/dictionaries";

type Props = {
  t: Dictionary["hero"];
  whatsappHref: string;
  latest: { name: string; href: string };
};

// O título termina num ponto azul com o Leonardo dentro: a assinatura da marca.
// Ao rolar, o ponto cresce até cobrir a tela e vira o bloco azul seguinte.
// O título em si não anima na entrada (é o maior elemento da primeira tela).
export function Hero({ t, whatsappHref, latest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const cover = useRef(30);
  const reduce = useReducedMotion();

  // Quanto o ponto precisa crescer para cobrir a tela a partir do lugar onde está.
  useEffect(() => {
    const measure = () => {
      const dot = dotRef.current;
      if (!dot) return;
      const r = dot.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + window.scrollY + r.height / 2 - (ref.current?.offsetTop ?? 0);
      const far = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
      cover.current = (far * 2.1) / Math.max(r.width, 1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const grow = useTransform(scrollYProgress, (p) => {
    const k = Math.min(1, Math.max(0, (p - 0.06) / 0.8));
    return 1 + k * k * (cover.current - 1);
  });
  // Funções (e não faixas) de propósito: assim o Motion calcula em JS e não troca
  // por uma animação nativa ligada à rolagem, que aqui errava a posição inicial.
  const between = (p: number, a: number, b: number) => 1 - Math.min(1, Math.max(0, (p - a) / (b - a)));
  const photo = useTransform(scrollYProgress, (p) => between(p, 0.08, 0.32));
  const fade = useTransform(scrollYProgress, (p) => between(p, 0.02, 0.24));

  const dotStyle = reduce ? undefined : { scale: grow };
  const fadeStyle = reduce ? undefined : { opacity: fade };

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <motion.div className="container hero__meta mono" style={fadeStyle}>
          {t.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
          <a href={latest.href} className="hero__latest">
            {t.latestLabel}: <b>{latest.name}</b> <span aria-hidden="true">↓</span>
          </a>
        </motion.div>

        <h1 className="container hero__title" id="hero-title">
          <motion.span className="hero__words" style={fadeStyle}>
            {t.titleBefore} {t.titleEm}
          </motion.span>
          <span className="sr-only">.</span>
          {/* O ponto com a foto e o crédito pendurado nele, como legenda de foto:
              rosto e nome juntos. O crédito é decorativo para leitores de tela
              (o nome está no texto de apoio logo abaixo). */}
          <span className="hero__mark" aria-hidden="true">
            <motion.span ref={dotRef} className="hero__dot" style={dotStyle}>
              <motion.span className="hero__photo" style={reduce ? undefined : { opacity: photo }}>
                <Image src="/leonardo-ponto.webp" alt="" fill priority sizes="(max-width: 700px) 30vw, 200px" />
              </motion.span>
            </motion.span>
            <motion.span className="hero__credit" style={fadeStyle}>
              <span className="hero__credit-line" />
              <span className="hero__credit-name">{t.credit.name}</span>
              <span className="hero__credit-role mono">{t.credit.role}</span>
            </motion.span>
          </span>
        </h1>

        <motion.div className="container hero__foot" style={fadeStyle}>
          <p className="hero__lead">{t.lead}</p>
          <div className="hero__actions">
            <a href={whatsappHref} className="btn btn--accent" target="_blank" rel="noopener">
              {t.primary} <span aria-hidden="true">↗</span>
            </a>
            <a href="#cases" className="btn btn--ghost">
              {t.secondary}
            </a>
          </div>
        </motion.div>

        <motion.p className="hero__scroll mono" style={fadeStyle} aria-hidden="true">
          {t.scroll}
          <span className="hero__scroll-line" />
        </motion.p>
      </div>
    </section>
  );
}

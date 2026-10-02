"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

type Props = {
  queries: string[];
  resultTitle: string;
  resultUrl: string;
  resultText: string;
};

// Uma busca no Google desenhada: digita uma pesquisa, o seu site aparece em
// primeiro, apaga e começa a próxima. Só roda enquanto está na tela.
export function SearchDemo({ queries, resultTitle, resultUrl, resultText }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(reduce ? queries[0] : "");
  const [showResult, setShowResult] = useState(!!reduce);

  useEffect(() => {
    if (!inView || reduce) return;
    const query = queries[index];
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      i += 1;
      setTyped(query.slice(0, i));
      if (i < query.length) timer = setTimeout(type, 45 + Math.random() * 50);
      else timer = setTimeout(() => setShowResult(true), 350);
    };
    timer = setTimeout(() => {
      setShowResult(false);
      setTyped("");
      type();
    }, 400);

    const next = setTimeout(() => setIndex((n) => (n + 1) % queries.length), query.length * 70 + 3800);
    return () => {
      clearTimeout(timer);
      clearTimeout(next);
    };
  }, [index, inView, reduce, queries]);

  return (
    <div ref={ref} className="search" aria-hidden="true">
      <div className="search__bar">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="search__query">
          {typed}
          <span className="search__caret" />
        </span>
      </div>

      <div className="search__results">
        {/* Espaço fixo: um molde invisível do resultado define a altura,
            e o resultado de verdade entra e sai por cima dele. */}
        <div className="search__slot">
          <div className="search__hit search__sizer">
            <Hit title={resultTitle} url={resultUrl} text={resultText} />
          </div>
          <div className={`search__hit search__hit--empty${showResult ? " is-hidden" : ""}`} />
          <AnimatePresence>
            {showResult && (
              <motion.div
                key={index}
                className="search__hit"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Hit title={resultTitle} url={resultUrl} text={resultText} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {[0.9, 0.75, 0.82].map((w, i) => (
          <div className="search__ghost" key={i}>
            <span style={{ width: "30%" }} />
            <span style={{ width: `${w * 100}%` }} />
            <span style={{ width: `${w * 70}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hit({ title, url, text }: { title: string; url: string; text: string }) {
  return (
    <>
      <span className="search__fav">
        <span />
      </span>
      <div>
        <p className="search__url">{url}</p>
        <p className="search__title">{title}</p>
        <p className="search__text">{text}</p>
      </div>
    </>
  );
}

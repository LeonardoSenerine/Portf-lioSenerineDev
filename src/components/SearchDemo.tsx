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
  const [typed, setTyped] = useState(reduce ? queries[0] : "");
  const [showResult, setShowResult] = useState(!!reduce);
  const indexRef = useRef(0);
  const typedRef = useRef("");

  // Uma sequência só, sem timers concorrentes: esconde o resultado, apaga a
  // pesquisa anterior, digita a próxima e mostra o resultado. Pausa fora da tela.
  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const write = (text: string) => {
      typedRef.current = text;
      setTyped(text);
    };

    (async () => {
      let current = typedRef.current;
      while (!cancelled) {
        const query = queries[indexRef.current];
        setShowResult(false);
        await wait(250);
        for (let n = current.length - 1; n >= 0 && !cancelled; n--) {
          write(current.slice(0, n));
          await wait(18);
        }
        await wait(300);
        for (let n = 1; n <= query.length && !cancelled; n++) {
          write(query.slice(0, n));
          await wait(45 + Math.random() * 50);
        }
        current = query;
        if (cancelled) return;
        await wait(350);
        if (cancelled) return;
        setShowResult(true);
        await wait(3200);
        indexRef.current = (indexRef.current + 1) % queries.length;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, reduce, queries]);

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
                key="hit"
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

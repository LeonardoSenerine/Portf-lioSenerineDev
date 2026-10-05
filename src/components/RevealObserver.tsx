"use client";

import { useEffect } from "react";

// Observadores para a página inteira, nos dois sentidos da rolagem:
// - [data-reveal] ganha .is-in ao entrar na tela e perde ao sair totalmente;
//   data-from diz por onde saiu, para entrar de cima quando a rolagem sobe.
// - [data-lit] ganha .is-lit ao passar do meio da tela e perde ao voltar para
//   baixo dele (a luz "acende" descendo e "apaga" subindo).
// Só ativa as entradas (classe js-reveal no <html>) quando consegue animar;
// com "reduzir movimento", não esconde nada.
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const show = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) entry.target.classList.add("is-in");
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    // Esconde só quando sai inteiro da tela, para nada sumir enquanto está à vista.
    const hide = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.from = entry.boundingClientRect.top < 0 ? "top" : "bottom";
        el.classList.remove("is-in");
      }
    });
    const lit = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-lit");
          else if (entry.boundingClientRect.top > 0) entry.target.classList.remove("is-lit");
        }
      },
      { rootMargin: "0px 0px -45% 0px" },
    );

    document.querySelectorAll("[data-lit]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.55) el.classList.add("is-lit");
      lit.observe(el);
    });
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      // O que já está na tela aparece sem esconder antes (evita piscar).
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("is-in");
      show.observe(el);
      hide.observe(el);
    });
    root.classList.add("js-reveal");
    return () => {
      show.disconnect();
      hide.disconnect();
      lit.disconnect();
    };
  }, []);

  return null;
}

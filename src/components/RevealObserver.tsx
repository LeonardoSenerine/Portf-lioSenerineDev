"use client";

import { useEffect } from "react";

// Um observador para a página inteira: marca com .is-in cada [data-reveal] que
// entra na tela. Só ativa as entradas (classe js-reveal no <html>) quando consegue
// animar; com "reduzir movimento", não esconde nada.
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      // O que já está na tela aparece sem esconder antes (evita piscar).
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) el.classList.add("is-in");
      else observer.observe(el);
    });
    root.classList.add("js-reveal");
    return () => observer.disconnect();
  }, []);

  return null;
}

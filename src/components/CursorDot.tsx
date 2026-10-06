"use client";

import { useEffect, useRef } from "react";

// O ponto da marca como cursor auxiliar: só aparece sobre o que tem [data-cursor]
// (as imagens dos cases e o índice de trabalhos) e mostra o rótulo. O cursor do
// sistema continua lá. Só no computador, com mouse e sem "reduzir movimento".
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let x = 0;
    let y = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      if (target) {
        el.dataset.label = target.getAttribute("data-cursor") ?? "";
        el.classList.add("is-on");
      } else {
        el.classList.remove("is-on");
      }
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onOut = () => el.classList.remove("is-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onOut);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}

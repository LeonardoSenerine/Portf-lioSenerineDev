"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

type Props = {
  desktop: string;
  mobile: string;
  alt: string;
  href: string | null;
  label: string;
  cursor: string;
  flip?: boolean;
};

// Tela do computador com o celular por cima. No computador, a imagem responde ao
// cursor: o celular anda um pouco mais que a tela, dando profundidade. Só CSS
// variables, sem re-render a cada movimento.
export function CaseMedia({ desktop, mobile, alt, href, label, cursor, flip }: Props) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  const media = (
    <>
      <span className="case-media__screen">
        <Image src={desktop} alt={alt} fill sizes="(max-width: 900px) 100vw, 1100px" />
      </span>
      <span className="case-media__phone">
        <Image src={mobile} alt="" fill sizes="(max-width: 900px) 34vw, 240px" />
      </span>
    </>
  );

  const className = `case-media${flip ? " case-media--flip" : ""}`;
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
      aria-label={label}
      data-cursor={cursor}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {media}
    </a>
  ) : (
    <div className={className}>{media}</div>
  );
}

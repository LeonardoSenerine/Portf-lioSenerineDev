"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

export type MoreItem = {
  id: string;
  client: string;
  segment: string;
  quote: string;
  kind: string;
  url: string | null;
  image: string;
  privateNote: string;
};

// Índice dos outros trabalhos. No computador, a captura do projeto segue o
// cursor sobre a linha; no celular, a miniatura fica dentro da própria linha.
export function MoreWork({ items, title, cursor }: { items: MoreItem[]; title: string; cursor: string }) {
  const [active, setActive] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !floatRef.current) return;
    floatRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <div className="more" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <h3 className="more__title">{title}</h3>
      <ol className="more__list">
        {items.map((it, i) => {
          const inner = (
            <>
              <span className="more__num mono">{String(i + 5).padStart(2, "0")}</span>
              <span className="more__thumb" aria-hidden="true">
                <Image src={it.image} alt="" fill sizes="96px" />
              </span>
              <span className="more__name">{it.client}</span>
              <span className="more__seg">{it.quote}</span>
              <span className="more__meta mono">{it.url ? `${it.segment} · ${it.kind}` : it.privateNote}</span>
              <span className="more__arrow" aria-hidden="true">{it.url ? "↗" : "·"}</span>
            </>
          );
          return (
            <li key={it.id} onPointerEnter={() => setActive(i)}>
              {it.url ? (
                <a href={it.url} target="_blank" rel="noopener" className="more__row" data-cursor={cursor}>
                  {inner}
                </a>
              ) : (
                <div className="more__row more__row--private">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      <div ref={floatRef} className={`more__float${active !== null ? " is-on" : ""}`} aria-hidden="true">
        {items.map((it, i) => (
          <span key={it.id} className={`more__float-img${active === i ? " is-active" : ""}`}>
            <Image src={it.image} alt="" fill sizes="320px" />
          </span>
        ))}
      </div>
    </div>
  );
}

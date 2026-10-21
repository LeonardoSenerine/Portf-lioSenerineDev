"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string };

// Dúvidas como sanfona: uma aberta por vez. A resposta fica sempre no HTML (o
// Google lê) e abre deslizando pela altura (grid de 0fr para 1fr), sem medir nada.
export function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="faq__list">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`faq__item${isOpen ? " is-open" : ""}`}>
            <h3 className="faq__q">
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="faq__dot" aria-hidden="true" />
                <span className="faq__text">{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq__panel" id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`}>
              <div className="faq__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

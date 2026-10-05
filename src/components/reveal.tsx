import { Fragment, type CSSProperties, type ReactNode } from "react";

// Entradas na rolagem sem JavaScript por elemento: o HTML sai pronto do servidor,
// o CSS esconde/mostra e um único observador (RevealObserver) marca o que entrou
// na tela. Sem JS ou com "reduzir movimento", tudo aparece direto.

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const vars = (delay: number, y?: number) =>
  ({ "--d": `${delay}s`, ...(y !== undefined ? { "--y": `${y}px` } : {}) }) as CSSProperties;

export function Reveal({ children, className, delay = 0, y }: RevealProps) {
  return (
    <div className={className} data-reveal="" style={vars(delay, y)}>
      {children}
    </div>
  );
}

// Entrada do hero em CSS puro: começa na primeira pintura, sem esperar o JavaScript.
export function FadeIn({ children, className, delay = 0 }: RevealProps) {
  return (
    <div className={`fade-up ${className ?? ""}`} style={vars(delay)}>
      {children}
    </div>
  );
}

// Título do hero: aparece pronto, sem animação de entrada, porque é o maior
// elemento da primeira tela (LCP). Só o ponto final dá um "pop".
export function HeroTitle({ before, em, after }: { before: string; em: string; after: string }) {
  return (
    <h1 className="hero__title">
      {before} <em>{em}</em>
      <span className="accent pop" style={vars(0.5)}>
        {after}
      </span>
    </h1>
  );
}

// Título de seção: as palavras sobem de uma máscara, uma depois da outra.
export function SplitTitle({ text, as: Tag = "h2", className = "section__title" }: { text: string; as?: "h2" | "h3"; className?: string }) {
  return (
    <Tag className={className} aria-label={text} data-reveal="split">
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <Fragment key={i}>
            <span className="word-mask">
              <span style={vars(i * 0.05)}>{word}</span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

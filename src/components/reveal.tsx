import { Fragment, type CSSProperties, type ReactNode } from "react";

// Entradas na rolagem sem JavaScript por elemento: o HTML sai pronto do servidor,
// o CSS esconde/mostra e um único observador (RevealObserver) marca o que entrou
// na tela. Sem JS ou com "reduzir movimento", tudo aparece direto.

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  // "Acende" (número em azul e um traço de luz) quando chega perto do meio da tela.
  lit?: boolean;
};

const vars = (delay: number, y?: number) =>
  ({ "--d": `${delay}s`, ...(y !== undefined ? { "--y": `${y}px` } : {}) }) as CSSProperties;

export function Reveal({ children, className, delay = 0, y, lit }: RevealProps) {
  return (
    <div className={className} data-reveal="" data-lit={lit ? "" : undefined} style={vars(delay, y)}>
      {children}
    </div>
  );
}

// Título de seção: as palavras sobem de uma máscara, uma depois da outra.
export function SplitTitle({
  text,
  as: Tag = "h2",
  className = "section__title",
  id,
  dot = false,
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
  id?: string;
  // Termina no ponto aceso da marca, que estala depois das palavras.
  dot?: boolean;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} id={id} aria-label={text} data-reveal="split">
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="word-mask">
              <span style={vars(i * 0.05)}>{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
        {dot && <span className="dot" style={vars(words.length * 0.05 + 0.3)} />}
      </span>
    </Tag>
  );
}

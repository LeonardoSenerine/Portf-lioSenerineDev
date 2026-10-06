import { Reveal, SplitTitle } from "./reveal";

const pad = (n: number) => String(n).padStart(2, "0");

// Cabeçalho padrão das seções: o rótulo com o ponto à esquerda, o fólio à
// direita (como numeração de página de revista) e o título que termina no ponto.
export function SectionHead({
  kicker,
  title,
  intro,
  folio,
  total,
  id,
  className = "",
}: {
  kicker: string;
  title: string;
  intro?: string;
  folio: number;
  total: number;
  id: string;
  className?: string;
}) {
  return (
    <header className={`shead ${className}`}>
      <Reveal className="shead__rule">
        <p className="kicker">{kicker}</p>
        <p className="shead__folio mono" aria-hidden="true">
          {pad(folio)} / {pad(total)}
        </p>
      </Reveal>
      <SplitTitle text={title} className="section__title" id={id} dot />
      {intro && (
        <Reveal delay={0.15}>
          <p className="section__intro">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}

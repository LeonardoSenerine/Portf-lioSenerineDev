import Image from "next/image";
import { prettyUrl, shot, type ProjectId } from "@/content/projects";

type Props = {
  id: ProjectId;
  url: string;
  alt: string;
  fullHeight: number;
};

// Janela de navegador com a página inteira, que rola sozinha no hover,
// e um celular por cima com a versão mobile.
export function DeviceMockup({ id, url, alt, fullHeight }: Props) {
  // Duração proporcional à altura da página: ~1s a cada 900px.
  const duration = Math.round((fullHeight / 900) * 10) / 10;

  return (
    <div className="mockup">
      <div className="browser">
        <div className="browser__bar" aria-hidden="true">
          <span className="browser__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser__url">{prettyUrl(url)}</span>
        </div>
        <div className="browser__screen" style={{ "--scroll-dur": `${duration}s` } as React.CSSProperties}>
          <Image src={shot(id, "full")} alt={alt} width={800} height={fullHeight} sizes="(max-width: 900px) 100vw, 640px" className="browser__page" />
        </div>
      </div>
      <div className="phone" aria-hidden="true">
        <div className="phone__screen">
          <Image src={shot(id, "mobile")} alt="" width={780} height={1688} sizes="160px" />
        </div>
      </div>
    </div>
  );
}

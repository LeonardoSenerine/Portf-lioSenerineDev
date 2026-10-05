import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter_Tight } from "next/font/google";
import { getDictionary } from "@/content/dictionaries";
import { whatsappLink } from "@/content/site";
import { themeScript } from "@/content/theme";

// Página 404 do site inteiro. O layout raiz fica dentro de [lang], então
// endereços que não existem caem aqui (global-not-found), fora do layout:
// por isso esta página traz o CSS, a fonte e o script do tema por conta própria.
const sans = Inter_Tight({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Página não encontrada · senerine.dev",
  description: "Esse endereço não existe no senerine.dev.",
};

export default function GlobalNotFound() {
  const wa = whatsappLink(getDictionary("pt").whatsappMessage);

  return (
    <html lang="pt-BR" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="nf flood">
          <div className="nf__glow" aria-hidden="true" />
          <div className="container nf__inner">
            <Link href="/pt" className="logo" aria-label="senerine.dev">
              senerine
              <span className="logo__dot" aria-hidden="true" />
              <span className="logo__tld">dev</span>
            </Link>

            <div className="nf__body">
              <p className="nf__code" aria-hidden="true">
                404<span className="nf__dot" />
              </p>
              <h1 className="nf__title">Esse endereço não leva a lugar nenhum.</h1>
              <p className="nf__text">
                A página pode ter mudado de lugar ou nunca ter existido. O resto do site continua aqui, e eu também.
              </p>
              <div className="nf__actions">
                <Link href="/pt" className="btn btn--light btn--lg">
                  Voltar para o início
                </Link>
                <a href={wa} className="btn btn--outline-light btn--lg" target="_blank" rel="noopener">
                  Chamar no WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <p className="nf__alt" lang="en">
              Page not found. <Link href="/en">Go to the English site →</Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}

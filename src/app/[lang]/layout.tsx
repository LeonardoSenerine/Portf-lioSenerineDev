import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { getDictionary, hasLocale, locales } from "@/content/dictionaries";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/motion";
import { RevealObserver } from "@/components/RevealObserver";
import { themeScript } from "@/content/theme";
import "../globals.css";

const sans = Inter_Tight({ variable: "--font-sans", subsets: ["latin"] });
// A serifa só aparece em itálico; a mono não está na primeira tela, então não é
// pré-carregada e não disputa banda com o título e a foto.
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], preload: false });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.brand,
    keywords: dict.meta.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: site.brand,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? ["en_US"] : ["pt_BR"],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efea" },
    { media: "(prefers-color-scheme: dark)", color: "#121113" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={dict.htmlLang}
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Aplica o tema salvo antes da hidratação, sem piscar. */}
        <Script id="theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Sem JS o Motion nunca anima a entrada; mostra tudo de uma vez. */}
        <noscript>
          <style>{`main [style*="opacity"] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <RevealObserver />
      </body>
    </html>
  );
}

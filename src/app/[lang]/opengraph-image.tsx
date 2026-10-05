import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, hasLocale, locales } from "@/content/dictionaries";

// Imagem de prévia do link (WhatsApp, LinkedIn, Google), gerada no build para cada idioma.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Leonardo Senerine · senerine.dev";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "pt");
  const photo = await readFile(join(process.cwd(), "public", "leonardo-retrato.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const fonts = join(process.cwd(), "src", "assets", "fonts");
  const [bold, regular] = await Promise.all([
    readFile(join(fonts, "InterTight-Bold.ttf")),
    readFile(join(fonts, "InterTight-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f2efea", color: "#1e1d1e", fontFamily: "Inter Tight" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 34, fontWeight: 700, letterSpacing: -1.4 }}>
            senerine
            <div style={{ display: "flex", width: 9, height: 9, margin: "0 2px 7px 3px", borderRadius: 9, background: "#0a63b2", boxShadow: "0 0 12px rgba(10, 99, 178, 0.6)" }} />
            <span style={{ color: "#0a63b2" }}>dev</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 640 }}>
              {`${t.hero.titleBefore} ${t.hero.titleEm}.`}
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 32, fontSize: 28, fontWeight: 400, color: "#6a6670" }}>
              <div style={{ display: "flex", width: 12, height: 12, marginRight: 14, borderRadius: 12, background: "#0a63b2", boxShadow: "0 0 14px rgba(10, 99, 178, 0.6)" }} />
              {t.footer.role}
            </div>
          </div>
        </div>
        <div style={{ width: 430, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "#ffffff" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={430} height={764} style={{ objectFit: "cover", marginBottom: -140 }} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: bold, weight: 700, style: "normal" },
        { name: "Inter Tight", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}

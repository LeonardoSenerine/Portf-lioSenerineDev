import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { getDictionary, hasLocale, locales } from "@/content/dictionaries";

// Capa do link (WhatsApp, LinkedIn, Google), gerada no build para cada idioma.
// Mesma identidade do site: o bloco azul aceso com o título, a foto num painel
// claro e o ponto de luz do logo. Sai em JPEG leve (~100 KB): o WhatsApp
// ignora capas pesadas, e o PNG direto do ImageResponse passava de 300 KB.
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";
export const alt = "Leonardo Senerine · senerine.dev";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const blue = "#0a63b2";
const glow = "0 0 18px rgba(255, 255, 255, 0.75)";

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

  const png = await new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", fontFamily: "Inter Tight" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 48px 60px 72px",
            color: "#f7f5f1",
            backgroundColor: blue,
            backgroundImage: "radial-gradient(circle at 30% -10%, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0) 60%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 34, fontWeight: 700, lineHeight: 1, letterSpacing: -1.4 }}>
            senerine
            <div style={{ display: "flex", width: 9, height: 9, margin: "0 2px 6px 3px", borderRadius: 9, background: "#ffffff", boxShadow: glow }} />
            <span style={{ color: "#bcd8f5" }}>dev</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 72, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2.9, maxWidth: 650 }}>
              {/* Uma palavra por item, para a quebra de linha ficar natural no Satori */}
              {t.hero.titleBefore.split(" ").map((word, i) => (
                <span key={i} style={{ marginRight: 17 }}>
                  {word}
                </span>
              ))}
              <span style={{ color: "#f6c9b6" }}>{`${t.hero.titleEm}.`}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 34, fontSize: 28, fontWeight: 400, color: "#d6e5f5" }}>
              <div style={{ display: "flex", width: 12, height: 12, marginRight: 14, borderRadius: 12, background: "#ffffff", boxShadow: glow }} />
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
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": contentType } });
}

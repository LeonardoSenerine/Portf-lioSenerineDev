import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/content/dictionaries";
import { site } from "@/content/site";

// O endereço antigo da Vercel continua respondendo. Ele leva ao domínio oficial com
// redirecionamento permanente, para o Google juntar tudo num endereço só.
const OLD_HOST = "senerinedev.vercel.app";

// Inglês só para quem pede inglês antes de português; o resto cai em pt.
function getLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2))
    .find((code) => (locales as readonly string[]).includes(code));
  return (preferred as Locale | undefined) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (request.headers.get("host") === OLD_HOST && new URL(site.url).host !== OLD_HOST) {
    return NextResponse.redirect(new URL(pathname + search, site.url), 308);
  }
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

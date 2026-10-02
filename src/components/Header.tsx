"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content/dictionaries";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./motion";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  whatsappHref: string;
};

export function Header({ lang, nav, whatsappHref }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const otherLang: Locale = lang === "pt" ? "en" : "pt";

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="container header__inner">
        <Link href={`/${lang}`} className="logo" aria-label="senerine.dev">
          senerine<span>.dev</span>
        </Link>

        <nav className="header__nav" aria-label="Principal">
          <a href="#trabalhos">{nav.work}</a>
          <a href="#servicos">{nav.services}</a>
          <a href="#processo">{nav.process}</a>
          <a href="#sobre">{nav.about}</a>
          <a href="#duvidas">{nav.faq}</a>
        </nav>

        <div className="header__actions">
          <ThemeToggle labelLight={nav.themeLight} labelDark={nav.themeDark} />
          {/* Troca de idioma recarrega a página: o layout raiz muda de idioma inteiro. */}
          <a href={`/${otherLang}`} className="lang-switch" hrefLang={otherLang} aria-label={nav.switchLabel}>
            {nav.switchTo}
          </a>
          <a href={whatsappHref} className="btn btn--dark btn--sm header__cta" target="_blank" rel="noopener">
            {nav.cta}
          </a>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

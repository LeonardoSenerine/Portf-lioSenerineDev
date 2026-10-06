"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // past-hero: o botão fixo do celular só aparece depois do hero, que já tem o seu
    const update = () => {
      setScrolled(window.scrollY > 16);
      document.documentElement.classList.toggle("past-hero", window.scrollY > window.innerHeight * 0.8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Menu do celular: Esc fecha e devolve o foco ao botão; a página não rola por trás.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const otherLang: Locale = lang === "pt" ? "en" : "pt";
  const links = [
    { href: "#cases", label: nav.work },
    { href: "#processo", label: nav.process },
    { href: "#sobre", label: nav.about },
    { href: "#contato", label: nav.contact },
  ];

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}${open ? " header--open" : ""}`}>
      <div className="container header__inner">
        <Link href={`/${lang}`} className="logo" aria-label="senerine.dev">
          senerine
          <span className="logo__dot" aria-hidden="true" />
          <span className="logo__tld">dev</span>
        </Link>

        <nav className="header__nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
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
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle__label">{open ? nav.close : nav.menu}</span>
            <span className="menu-toggle__dot" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav id="menu-mobile" className="menu-mobile" aria-label="Menu" hidden={!open}>
        <ol>
          {links.map((l, i) => (
            <li key={l.href} style={{ "--i": i } as CSSProperties}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ol>
        <a href={whatsappHref} className="btn btn--accent menu-mobile__cta" target="_blank" rel="noopener">
          {nav.cta} <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <ScrollProgress />
    </header>
  );
}

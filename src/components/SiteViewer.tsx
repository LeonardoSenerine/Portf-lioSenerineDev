"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { prettyUrl, shot, type ProjectId } from "@/content/projects";
import type { Dictionary } from "@/content/dictionaries";

type Item = { id: ProjectId; url: string; client: string; segment: string };
type Device = "desktop" | "mobile";

const DESKTOP = { w: 1280, h: 800 };
const MOBILE = { w: 390, h: 844 };

// Navegador embutido: mostra o site de verdade num iframe, reduzido para caber,
// com a captura de tela por baixo enquanto carrega.
export function SiteViewer({ items, labels }: { items: Item[]; labels: Dictionary["live"] }) {
  const [active, setActive] = useState<ProjectId>(items[0].id);
  const [device, setDevice] = useState<Device>("desktop");
  const [loaded, setLoaded] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "200px 0px" });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let first = true;
    const ro = new ResizeObserver(([entry]) => {
      // No celular começa já no modo celular.
      if (first && window.innerWidth < 720) setDevice("mobile");
      first = false;
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const item = items.find((i) => i.id === active)!;
  const frameKey = `${active}-${device}`;
  const isLoaded = loaded === frameKey;

  const scale =
    device === "desktop"
      ? width / DESKTOP.w
      : Math.min(1, (width - 32) / (MOBILE.w + 24), 620 / MOBILE.h);
  const size = device === "desktop" ? DESKTOP : MOBILE;

  return (
    <div className="viewer">
      <div className="viewer__tabs" role="tablist" aria-label={labels.choose}>
        {items.map((it) => (
          <button
            key={it.id}
            role="tab"
            aria-selected={it.id === active}
            className={`viewer__tab${it.id === active ? " is-active" : ""}`}
            onClick={() => setActive(it.id)}
          >
            {it.id === active && <motion.span layoutId="viewer-tab" className="viewer__tab-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="viewer__tab-name">{it.client}</span>
            <span className="viewer__tab-seg">{it.segment}</span>
          </button>
        ))}
      </div>

      <div className="viewer__main">
        <div className="viewer__toolbar">
          <div className="segmented" role="group">
            {(["desktop", "mobile"] as Device[]).map((d) => (
              <button key={d} type="button" aria-pressed={device === d} className={device === d ? "is-active" : ""} onClick={() => setDevice(d)}>
                {device === d && <motion.span layoutId="viewer-device" className="segmented__bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span>{d === "desktop" ? labels.desktop : labels.mobile}</span>
              </button>
            ))}
          </div>
          <a href={item.url} target="_blank" rel="noopener" className="viewer__open">
            {prettyUrl(item.url)} <span aria-hidden="true">↗</span>
            <span className="sr-only">{labels.open}</span>
          </a>
        </div>

        <div ref={stageRef} className={`viewer__stage viewer__stage--${device}`}>
          {width > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={frameKey}
                className={device === "desktop" ? "viewer__browser" : "viewer__phone"}
                style={{ width: size.w * scale + (device === "mobile" ? 24 * scale : 0), height: size.h * scale + (device === "mobile" ? 24 * scale : 0) }}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="viewer__viewport" style={{ inset: device === "mobile" ? 12 * scale : 0, borderRadius: device === "mobile" ? 32 * scale : 0 }}>
                  <Image
                    src={shot(active, device)}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    className={`viewer__placeholder${isLoaded ? " is-hidden" : ""}`}
                  />
                  {!isLoaded && (
                    <div className="viewer__loading">
                      <span className="spinner" /> {labels.loading}
                    </div>
                  )}
                  {inView && (
                    <iframe
                      key={frameKey}
                      src={item.url}
                      title={item.client}
                      loading="lazy"
                      // Os sites têm animação de entrada; a captura fica por cima mais um pouco.
                      onLoad={() => setTimeout(() => setLoaded(frameKey), 1200)}
                      style={{ width: size.w, height: size.h, transform: `scale(${scale})`, opacity: isLoaded ? 1 : 0 }}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

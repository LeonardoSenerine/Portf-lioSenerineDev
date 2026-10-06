"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// reducedMotion="user": quem pede "reduzir movimento" no sistema vê só o fade, sem deslocamento.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease }}>
      {children}
    </MotionConfig>
  );
}

// Efeitos ligados à rolagem só no computador: no celular custam processamento
// e o ganho visual é pequeno.
const desktopQuery = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
export function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => false);
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

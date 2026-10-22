"use client";

import { useRef } from "react";
import { gsap, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGsapContext(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    if (!root || !label || !canHover() || prefersReducedMotion()) return;

    const dot = root.querySelector<HTMLElement>(".cursor__dot");
    const bubble = root.querySelector<HTMLElement>(".cursor__bubble");
    if (!dot || !bubble) return;

    gsap.set(root, { opacity: 0 });
    gsap.set(bubble, { scale: 0 });

    const xTo = gsap.quickTo(root, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(root, "y", { duration: 0.45, ease: "power3" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.set(root, { x: e.clientX, y: e.clientY });
        gsap.to(root, { opacity: 1, duration: 0.4 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const media = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button");

      if (media && !interactive) {
        label.textContent = media.dataset.cursor ?? "";
        gsap.to(bubble, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: true });
        gsap.to(dot, { scale: 0, duration: 0.3, overwrite: true });
      } else {
        gsap.to(bubble, { scale: 0, duration: 0.4, ease: "power3.out", overwrite: true });
        gsap.to(dot, {
          scale: interactive ? 3 : 1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    const leaveWindow = () => {
      visible = false;
      gsap.to(root, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leaveWindow);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leaveWindow);
    };
  }, rootRef);

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__bubble">
        <span ref={labelRef} className="cursor__label" />
      </span>
    </div>
  );
}

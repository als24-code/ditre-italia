"use client";

import { useRef, type ReactNode } from "react";
import { gsap, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { cx } from "@/lib/cx";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const el = ref.current;
    if (!el || !canHover() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.45)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.45)" });

    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, ref);

  return (
    <div ref={ref} className={cx("magnetic", className)}>
      {children}
    </div>
  );
}

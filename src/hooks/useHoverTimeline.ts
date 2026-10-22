"use client";

import { useRef } from "react";
import { gsap, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "./useGsapContext";

interface HoverOptions {
  duration?: number;
  ease?: string;
}

export function useHoverTimeline<T extends HTMLElement = HTMLElement>(
  build: (
    tl: gsap.core.Timeline,
    el: T,
    q: ReturnType<typeof gsap.utils.selector>,
  ) => void,
  options: HoverOptions = {},
) {
  const ref = useRef<T>(null);

  useGsapContext(() => {
    const el = ref.current;
    if (!el || !canHover() || prefersReducedMotion()) return;

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: options.duration ?? 0.6,
        ease: options.ease ?? "power3.out",
      },
    });
    build(tl, el, gsap.utils.selector(el));

    const enter = () => {
      tl.play();
    };
    const leave = () => {
      tl.reverse();
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);

    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, ref);

  return ref;
}

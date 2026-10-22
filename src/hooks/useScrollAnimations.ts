"use client";

import type { RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "./useGsapContext";

export function useScrollAnimations(
  scope: RefObject<HTMLElement | null>,
): void {
  useGsapContext(() => {
    if (prefersReducedMotion()) return;
    const root = scope.current;
    if (!root) return;

    const all = (selector: string) =>
      gsap.utils.toArray<HTMLElement>(selector, root);

    all('[data-reveal="words"]').forEach((el) => {
      const words = el.querySelectorAll(".split__inner");
      if (!words.length) return;
      gsap.from(words, {
        yPercent: 115,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    all('[data-reveal="scrub"]').forEach((el) => {
      const words = el.querySelectorAll(".split__inner");
      if (!words.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    });

    all('[data-reveal="fade"]').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        delay: parseFloat(el.dataset.delay ?? "0"),
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    all('[data-reveal="image"]').forEach((el) => {
      const zoom = el.querySelector(".media__zoom");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
      tl.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
        },
      );
      if (zoom) {
        tl.fromTo(
          zoom,
          { scale: 1.35 },
          { scale: 1, duration: 1.9, ease: "power3.out" },
          0,
        );
      }
    });

    all('[data-reveal="line"]').forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    });

    all("[data-stagger]").forEach((el) => {
      const items = el.querySelectorAll("[data-stagger-item]");
      if (!items.length) return;
      gsap.from(items, {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    all("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax ?? "7");
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    all("[data-spin]").forEach((el) => {
      gsap.to(el, {
        rotation: parseFloat(el.dataset.spin ?? "180"),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, scope);
}

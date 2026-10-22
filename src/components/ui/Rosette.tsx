"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

const PETALS = 12;

export default function Rosette({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGsapContext(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;

    const petals = svg.querySelectorAll<SVGEllipseElement>(".rosette__petal");
    const group = svg.querySelector<SVGGElement>(".rosette__group");
    if (!group) return;

    gsap.set(petals, { transformOrigin: "50% 50%" });

    gsap.fromTo(
      petals,
      { rotation: 0 },
      {
        rotation: (i: number) => (i * 180) / PETALS,
        ease: "none",
        scrollTrigger: {
          trigger: svg,
          start: "top 95%",
          end: "bottom 35%",
          scrub: 1,
        },
      },
    );

    gsap.to(group, {
      rotation: 40,
      transformOrigin: "50% 50%",
      ease: "none",
      scrollTrigger: { trigger: svg, start: "top bottom", end: "bottom top", scrub: true },
    });

    if (!canHover()) return;

    const swirl = gsap.to(petals, {
      scaleY: 1.35,
      duration: 0.9,
      ease: "power3.out",
      stagger: { each: 0.03, from: "center" },
      paused: true,
    });
    const enter = () => {
      swirl.play();
    };
    const leave = () => {
      swirl.reverse();
    };
    svg.addEventListener("pointerenter", enter);
    svg.addEventListener("pointerleave", leave);

    // The figure sits in a text column, so make sure triggers measure correctly.
    ScrollTrigger.refresh();

    return () => {
      svg.removeEventListener("pointerenter", enter);
      svg.removeEventListener("pointerleave", leave);
    };
  }, ref);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <g className="rosette__group" style={{ transformOrigin: "100px 70px" }}>
        {Array.from({ length: PETALS }).map((_, i) => (
          <ellipse
            key={i}
            className="rosette__petal"
            cx="100"
            cy="70"
            rx="76"
            ry="26"
            transform={`rotate(${(i * 180) / PETALS} 100 70)`}
          />
        ))}
      </g>
    </svg>
  );
}

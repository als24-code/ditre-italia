
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { AccentText, Mark } from "@/components/ui/Text";

interface MarqueeProps {
  words: string[];
  repeat?: number;
  duration?: number;
}

export default function Marquee({
  words,
  repeat = 1,
  duration = 45,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const root = rootRef.current;
    const track = trackRef.current;

    if (!root || !track || prefersReducedMotion()) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration,
      repeat: -1,
    });

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(".marquee__item"),
    );

    const skewTo = gsap.quickTo(items, "skewX", {
      duration: 0.5,
      ease: "power3",
    });

    let direction = 1;
    let hovering = false;

    const restSpeed = () => direction * (hovering ? 0.2 : 1);

    const settle = gsap.delayedCall(0.15, () => {
      gsap.to(loop, {
        timeScale: restSpeed(),
        duration: 1.2,
        ease: "power2.out",
        overwrite: true,
      });
      skewTo(0);
    });

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        direction = self.direction === 1 ? 1 : -1;
        const velocity = self.getVelocity();

        loop.timeScale(
          direction * (1 + Math.min(Math.abs(velocity) / 260, 6)),
        );

        skewTo(gsap.utils.clamp(-14, 14, velocity / -140));
        settle.restart(true);
      },
    });

    const enter = () => {
      hovering = true;
      gsap.to(loop, {
        timeScale: restSpeed(),
        duration: 0.8,
        overwrite: true,
      });
    };

    const leave = () => {
      hovering = false;
      gsap.to(loop, {
        timeScale: restSpeed(),
        duration: 0.8,
        overwrite: true,
      });
    };

    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);

    return () => {
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      trigger.kill();
      settle.kill();
    };
  }, rootRef);

  return (
    <div ref={rootRef} className="marquee">
      <div ref={trackRef} className="marquee__track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="marquee__group"
            aria-hidden={group === 1 ? true : undefined}
          >
            {Array.from({ length: repeat }, (_, repetition) =>
              words.map((word, i) => (
                <div
                  key={`${repetition}-${word}`}
                  className="marquee__item"
                >
                  <span className="innovation__word">
                    <AccentText
                      text={word.toUpperCase()}
                      letters={word.toUpperCase().includes("O") ? "O" : ""}
                    />
                  </span>
                  <Mark className="innovation__mark" />
                </div>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

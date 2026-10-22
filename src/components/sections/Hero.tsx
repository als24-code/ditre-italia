"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { hero } from "@/data/content";
import MediaFrame from "@/components/ui/MediaFrame";
import { SplitText } from "@/components/ui/Text";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimations(ref); 
  useGsapContext(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.25 });
    tl.from(".hero__title .split__inner", { yPercent: 115, duration: 1.3, stagger: 0.08 }, 0)
      .from("[data-hero-small]", { opacity: 0, y: 30, duration: 1.2 }, 0.5)
      .from("[data-hero-caption]", { opacity: 0, y: 20, duration: 1.1 }, 0.7)
      .fromTo(
        "[data-hero-image]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power4.inOut" },
        0.4,
      )
      .from("[data-hero-image] .media__zoom", { scale: 1.35, duration: 2.2 }, 0.4)
      .from("[data-hero-label]", { opacity: 0, y: 14, duration: 0.9, stagger: 0.1 }, 1.5);
  }, ref);

  return (
    <section ref={ref} className="hero">
      <div className="hero__top">
        <h1 className="hero__title">
          {hero.titleLines.map((line) => (
            <span key={line} className="hero__line">
              <SplitText text={line} />
            </span>
          ))}
        </h1>

        <div className="hero__aside">
          <MediaFrame
            className="hero__small"
            src="/images/hero-small.jpg"
            alt="Warm timber wall panelling with a low walnut sideboard"
            ratio="3 / 2"
            sizes="(max-width: 900px) 40vw, 14vw"
            reveal={false}
            parallax={false}
            cursor={false}
            data-hero-small=""
          />
          <p className="small hero__caption" data-hero-caption>
            {hero.caption}
          </p>
        </div>
      </div>

      <MediaFrame
        className="hero__image"
        src="/images/hero-big.jpg"
        alt="Living room with a taupe modular sofa, rust leather accents and a round dining table"
        ratio="1389 / 539"
        sizes="100vw"
        priority
        reveal={false}
        parallax={9}
        data-hero-image=""
      />

      <div className="hero__labels">
        {hero.labels.map((label) => (
          <span key={label} className="small hero__label" data-hero-label>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

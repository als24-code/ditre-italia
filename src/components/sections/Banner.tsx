"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { banner } from "@/data/content";
import { Mark, Statement } from "@/components/ui/Text";

export default function Banner() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimations(ref);

  useGsapContext(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;
    const q = gsap.utils.selector(section);

    gsap.fromTo(
      q(".banner__bg-inner"),
      { scale: 1.3, yPercent: -6 },
      {
        scale: 1,
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    gsap.fromTo(
      q(".banner__card"),
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 70%", end: "top 20%", scrub: 1 },
      },
    );

    gsap.fromTo(
      q(".banner__quote"),
      { xPercent: 18, opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 40%", end: "center 55%", scrub: 1 },
      },
    );

    if (!canHover()) return;

    const card = q(".banner__card")[0] as HTMLElement | undefined;
    const photo = q(".banner__card-photo")[0] as HTMLElement | undefined;
    if (!card || !photo) return;

    gsap.set(card, { transformPerspective: 900 });
    const rotX = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3" });
    const rotY = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3" });
    const photoX = gsap.quickTo(photo, "x", { duration: 0.8, ease: "power3" });
    const photoY = gsap.quickTo(photo, "y", { duration: 0.8, ease: "power3" });

    const move = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(nx * 14);
      rotX(ny * -12);
      photoX(nx * -14);
      photoY(ny * -14);
    };
    const leave = () => {
      rotX(0);
      rotY(0);
      photoX(0);
      photoY(0);
    };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);

    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, ref);

  return (
    <section ref={ref} id="studio" className="banner">
      <div className="banner__bg">
        <div className="banner__bg-inner">
          <Image
            src="/images/banner.jpg"
            alt="Four boucle armchairs around a round dining table in a light-filled room"
            fill
            sizes="100vw"
            className="banner__bg-img"
          />
        </div>
        <div className="banner__shade" />
      </div>

      <Statement className="banner__title" tone="light" indent="none" reveal="words" first>
        {banner.title}
      </Statement>

      <div className="banner__card" data-cursor="Visit">
        <p className="banner__card-title small">
          {banner.cardTitle[0]}
          <br />
          {banner.cardTitle[1]}
        </p>

        <div className="banner__card-media">
          <div className="banner__card-photo">
            <Image
              src="/images/bannerbuilding.jpg"
              alt="Ditre Italia studio facade in Cordignano"
              fill
              sizes="(max-width: 900px) 60vw, 20vw"
              className="banner__card-img"
            />
          </div>
        </div>

        <div className="banner__card-foot">
          <Mark />
          <p className="small">{banner.cardBody}</p>
        </div>
      </div>

      <p className="banner__quote statement statement--light">
        {banner.quote[0]}
        <br />
        {banner.quote[1]}
      </p>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { language } from "@/data/content";
import MediaFrame from "@/components/ui/MediaFrame";
import CircleButton from "@/components/ui/CircleButton";
import Rosette from "@/components/ui/Rosette";
import { SmallText, Statement } from "@/components/ui/Text";

export default function Language() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimations(ref);

  return (
    <section ref={ref} id="language" className="language">
      <div className="language__content">
        <Statement className="language__statement" indent="md" reveal="words">
          {language.statement}
        </Statement>

        <div className="language__figure" data-reveal="fade">
          <Rosette className="language__rosette" />
        </div>

        <div className="language__footer">
          <SmallText className="language__copy">{language.body}</SmallText>
          <CircleButton direction="up-right" href="#studio" label="Explore the collection" />
        </div>
      </div>

      <MediaFrame
        className="language__image"
        src="/images/lang-big.jpg"
        alt="Sculptural rust-coloured sofa reflected in a glass partition"
        ratio="694 / 736"
        sizes="(max-width: 900px) 100vw, 50vw"
        parallax={6}
      />
    </section>
  );
}

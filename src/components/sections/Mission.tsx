"use client";

import { useRef } from "react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { mission } from "@/data/content";
import MediaFrame from "@/components/ui/MediaFrame";
import { Mark, SmallText, Statement } from "@/components/ui/Text";

export default function Mission() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimations(ref);

  return (
    <section ref={ref} id="about" className="mission">
      <MediaFrame
        className="mission__image"
        src="/images/mission-big.jpg"
        alt="Upholstered bed with a ring pendant light above a slim side table"
        ratio="656 / 746"
        sizes="(max-width: 900px) 100vw, 46vw"
      />

      <div className="mission__content">
        <Statement className="mission__statement" indent="md" reveal="scrub" first>
          {mission.statement}
        </Statement>

        <div className="mission__bottom">
          <div className="mission__copy">
            <div className="flex">
            {/* <Mark className="mission__mark" /> */}
            <Statement>{mission.supporting}</Statement>
            </div>
            <SmallText>{mission.body}</SmallText>
          </div>

          <MediaFrame
            className="mission__thumb"
            src="/images/mission-small.jpg"
            alt="Dark walnut bedside cabinet with a sculptural vase"
            ratio="270 / 253"
            sizes="(max-width: 900px) 45vw, 18vw"
            parallax={5}
          />
        </div>
      </div>
    </section>
  );
}

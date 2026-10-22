"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "@/lib/gsap";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";
import { team, type TeamMember } from "@/data/content";
import CircleButton from "@/components/ui/CircleButton";
import { SmallText, Statement } from "@/components/ui/Text";

function TeamCard({ member, clone = false }: { member: TeamMember; clone?: boolean }) {
  const ref = useHoverTimeline<HTMLElement>((tl, _el, q) => {
    tl.to(q(".team-card__img"), { scale: 1.08, duration: 1.1 }, 0)
      .to(q(".team-card__name"), { x: 10, duration: 0.5 }, 0)
      .to(q(".team-card__role"), { x: 10, duration: 0.5, delay: 0.04 }, 0);
  });

  return (
    <article ref={ref} className="team-card" aria-hidden={clone ? true : undefined}>
      <div className="team-card__photo" data-cursor="Meet">
        <Image
          src={member.image}
          alt={clone ? "" : `Portrait of ${member.name}`}
          fill
          sizes="(max-width: 900px) 46vw, 23vw"
          className="team-card__img"
        />
      </div>
      <h3 className="team-card__name small">{member.name}</h3>
      <p className="team-card__role small">{member.role}</p>
    </article>
  );
}

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [members, setMembers] = useState<TeamMember[]>(team.members);
  useScrollAnimations(ref);

  const stepWidth = (): number => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return first.offsetWidth + gap;
  };

  const next = () => {
    const track = trackRef.current;
    if (!track || busy.current) return;
    busy.current = true;
    gsap.to(track, {
      x: -stepWidth(),
      duration: 0.9,
      ease: "power4.inOut",
      onComplete: () => {
        flushSync(() => setMembers((m) => [...m.slice(1), m[0]]));
        gsap.set(track, { x: 0 });
        busy.current = false;
      },
    });
  };

  const prev = () => {
    const track = trackRef.current;
    if (!track || busy.current) return;
    busy.current = true;
    const width = stepWidth();
    flushSync(() => setMembers((m) => [m[m.length - 1], ...m.slice(0, -1)]));
    gsap.fromTo(
      track,
      { x: -width },
      {
        x: 0,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          busy.current = false;
        },
      },
    );
  };

  return (
    <section ref={ref} id="team" className="team">
      <Statement className="team__statement" indent="md" reveal="words">
        {team.statement}
      </Statement>

      <div className="team__side">
        <SmallText className="team__copy">{team.body}</SmallText>
        <div className="team__arrows">
          <CircleButton direction="left" size="sm" label="Previous team member" onClick={prev} />
          <CircleButton direction="right" size="sm" label="Next team member" onClick={next} />
        </div>
      </div>

      <div className="team__viewport" data-stagger>
        <div ref={trackRef} className="team__track">
          {members.map((member) => (
            <div key={member.name} className="team__slot" data-stagger-item>
              <TeamCard member={member} />
            </div>
          ))}
          <div className="team__slot" aria-hidden="true">
            <TeamCard member={members[0]} clone />
          </div>
        </div>
      </div>
    </section>
  );
}

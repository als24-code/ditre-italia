"use client";

import { useRef } from "react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";
import { contact, primaryNav, site } from "@/data/content";
import MediaFrame from "@/components/ui/MediaFrame";
import NavList from "@/components/ui/NavList";
import ContactInfo from "@/components/ui/ContactInfo";
import { SmallText, SplitText } from "@/components/ui/Text";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimations(ref);

  const titleRef = useHoverTimeline<HTMLHeadingElement>((tl, _el, q) => {
    tl.to(q(".accent"), { rotation: 360, duration: 1.2, ease: "power4.inOut" });
  });

  return (
    <section ref={ref} id="contact" className="contact">
      <h2 ref={titleRef} className="contact__title" data-reveal="words">
        <SplitText text={contact.title} letters="O" />
      </h2>

      <MediaFrame
        className="contact__image"
        src="/images/contact.jpg"
        alt="Soft sofa and a pink pouf in a calm showroom"
        ratio="217 / 260"
        sizes="(max-width: 900px) 40vw, 15vw"
        parallax={5}
      />

      <div className="contact__mail">
        <a className="contact__email" href={`mailto:${site.email}`} data-reveal="fade">
          {site.email}
        </a>
        <SmallText className="contact__copy">{contact.body}</SmallText>
      </div>

      <div className="contact__details">
        <ContactInfo />
        <NavList items={primaryNav} className="contact__nav" />
      </div>

      <p className="contact__label" data-reveal="fade">
        {contact.label}
      </p>
    </section>
  );
}

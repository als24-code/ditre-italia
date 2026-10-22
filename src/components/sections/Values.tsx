"use client";

import { useRef } from "react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";
import { values, type ValueItem } from "@/data/content";
import { Mark, SmallText, Statement } from "@/components/ui/Text";

function ValueRow({ item }: { item: ValueItem }) {
  
  const ref = useHoverTimeline<HTMLLIElement>((tl, _el, q) => {
    tl.to(q(".value-row__fill"), { scaleY: 1, duration: 0.6 }, 0)
      .to(q(".value-row__title"), { x: 18, duration: 0.6 }, 0)
      .to(q(".value-row__text"), { x: -6, opacity: 1, duration: 0.6 }, 0)
      .to(q(".value-row__arrow"), { opacity: 1, x: 0, duration: 0.5 }, 0.1);
  });

  return (
    <li ref={ref} className="value-row" data-stagger-item>
      <span className="value-row__fill" />
      <span className="value-row__rule" data-reveal="line" />
      <h3 className="value-row__title">{item.title}</h3>
      <p className="value-row__text small">{item.description}</p>
      <span className="value-row__arrow" aria-hidden="true">
        →
      </span>
    </li>
  );
}

export default function Values() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimations(ref);

  return (
    <section ref={ref} id="values" className="values">
      <Statement className="values__statement" indent="lg" reveal="scrub">
        {values.statement}
      </Statement>

      <Mark className="values__mark" />

      <SmallText className="values__copy">{values.body}</SmallText>

      <ul className="values__list" data-stagger>
        {values.items.map((item) => (
          <ValueRow key={item.title} item={item} />
        ))}
        <li className="values__closing-rule" aria-hidden="true">
          <span className="value-row__rule" data-reveal="line" />
        </li>
      </ul>
    </section>
  );
}

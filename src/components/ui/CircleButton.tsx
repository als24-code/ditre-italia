"use client";

import { cx } from "@/lib/cx";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";
import { ArrowIcon } from "./Icons";
import Magnetic from "./Magnetic";

type Direction = "up-right" | "left" | "right";

const ANGLE: Record<Direction, number> = {
  "up-right": -45,
  left: 180,
  right: 0,
};

interface CircleButtonProps {
  direction?: Direction;
  label: string;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
}

export default function CircleButton({
  direction = "right",
  label,
  href,
  onClick,
  size = "md",
  className,
}: CircleButtonProps) {
  const ref = useHoverTimeline<HTMLSpanElement>((tl, _el, q) => {
    tl.to(q(".circle-btn__fill"), { scaleY: 1, duration: 0.55 }, 0)
      .to(q(".circle-btn__arrow--a"), { xPercent: 160, duration: 0.45 }, 0)
      .fromTo(
        q(".circle-btn__arrow--b"),
        { xPercent: -160 },
        { xPercent: 0, duration: 0.55 },
        0.05,
      )
      .to(q(".circle-btn__body"), { color: "#fdfaf3", duration: 0.3 }, 0.1);
  });

  const inner = (
    <>
      <span className="circle-btn__fill" />
      <span
        className="circle-btn__arrows"
        style={{ transform: `rotate(${ANGLE[direction]}deg)` }}
      >
        <ArrowIcon className="circle-btn__arrow circle-btn__arrow--a" />
        <ArrowIcon className="circle-btn__arrow circle-btn__arrow--b" />
      </span>
    </>
  );

  return (
    <Magnetic strength={0.3}>
      <span ref={ref} className={cx("circle-btn", `circle-btn--${size}`, className)}>
        {href ? (
          <a className="circle-btn__body" href={href} aria-label={label}>
            {inner}
          </a>
        ) : (
          <button
            type="button"
            className="circle-btn__body"
            onClick={onClick}
            aria-label={label}
          >
            {inner}
          </button>
        )}
      </span>
    </Magnetic>
  );
}

"use client";

import { cx } from "@/lib/cx";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

export default function Logo({
  size = "md",
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const ref = useHoverTimeline<HTMLAnchorElement>((tl, _el, q) => {
    tl.to(q(".logo__line"), { skewX: -12, xPercent: 4, stagger: 0.08, duration: 0.5 });
  });

  return (
    <a
      ref={ref}
      href="#top"
      className={cx("logo", `logo--${size}`, className)}
      aria-label="Ditre Italia — back to top"
    >
      <span className="logo__line">Ditre</span>
      <span className="logo__line">Italia</span>
    </a>
  );
}

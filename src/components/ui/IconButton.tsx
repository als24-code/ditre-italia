"use client";

import type { ReactNode } from "react";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

export default function IconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useHoverTimeline<HTMLButtonElement>((tl, el) => {
    tl.to(el, { scale: 1.25, rotate: -8, duration: 0.45, ease: "back.out(2.2)" });
  });

  return (
    <button ref={ref} type="button" className="icon-btn" aria-label={label}>
      {children}
    </button>
  );
}

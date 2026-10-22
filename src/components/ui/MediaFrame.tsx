"use client";

import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

interface MediaFrameProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  reveal?: boolean;
  parallax?: number | false;
  cursor?: string | false;
}

export default function MediaFrame({
  src,
  alt,
  ratio,
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority,
  reveal = true,
  parallax = 7,
  cursor = "View",
  className,
  style,
  ...rest
}: MediaFrameProps) {
  const ref = useHoverTimeline<HTMLDivElement>((tl, _el, q) => {
    tl.to(q(".media__img"), { scale: 1.07, duration: 1.2 });
  });

  return (
    <div
      ref={ref}
      className={cx("media", className)}
      style={{ aspectRatio: ratio, ...style }}
      data-reveal={reveal ? "image" : undefined}
      data-cursor={cursor || undefined}
      {...rest}
    >
      <div
        className={cx(
          "media__parallax",
          parallax === false && "media__parallax--static",
        )}
        data-parallax={parallax === false ? undefined : parallax}
      >
        <div className="media__zoom">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="media__img"
          />
        </div>
      </div>
    </div>
  );
}

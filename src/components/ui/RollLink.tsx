import type { AnchorHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

export default function RollLink({
  children,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: string }) {
  return (
    <a className={cx("roll", className)} {...rest}>
      <span className="roll__text">{children}</span>
      <span className="roll__text roll__text--clone" aria-hidden="true">
        {children}
      </span>
    </a>
  );
}

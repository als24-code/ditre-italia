import type { NavItem } from "@/data/content";
import { cx } from "@/lib/cx";
import RollLink from "./RollLink";

export default function NavList({
  items,
  direction = "column",
  className,
}: {
  items: NavItem[];
  direction?: "column" | "row";
  className?: string;
}) {
  return (
    <ul className={cx("nav-list", `nav-list--${direction}`, className)}>
      {items.map((item) => (
        <li key={item.label} className="nav-list__item">
          <RollLink href={item.href}>{item.label}</RollLink>
        </li>
      ))}
    </ul>
  );
}

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const SearchIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 5 5" />
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
);

export const CartIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 5h2l2 10h9l2-7H7" />
    <circle cx="9.5" cy="19" r="1" />
    <circle cx="16.5" cy="19" r="1" />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
);

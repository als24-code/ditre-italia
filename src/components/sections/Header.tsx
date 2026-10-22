"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { primaryNav, secondaryNav } from "@/data/content";
import Logo from "@/components/ui/Logo";
import IconButton from "@/components/ui/IconButton";
import { CartIcon, HeartIcon, SearchIcon } from "@/components/ui/Icons";
import NavList from "@/components/ui/NavList";
import ContactInfo from "@/components/ui/ContactInfo";

export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(() => {
    if (prefersReducedMotion()) return;
    gsap.from("[data-intro]", {
      y: -26,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.1,
    });
  }, ref);

  return (
    <header ref={ref} className="header">
      <div className="header__logo" data-intro>
        <Logo />
      </div>

      <div className="header__info" data-intro>
        <ContactInfo />
      </div>

      <div className="header__nav" data-intro>
        <NavList items={primaryNav} />
      </div>

      <div className="header__nav header__nav--secondary" data-intro>
        <NavList items={secondaryNav} />
      </div>

      <div className="header__actions" data-intro>
        <IconButton label="Search">
          <SearchIcon />
        </IconButton>
        <IconButton label="Wishlist">
          <HeartIcon />
        </IconButton>
        <IconButton label="Cart">
          <CartIcon />
        </IconButton>
      </div>
    </header>
  );
}

import { socials } from "@/data/content";
import Logo from "@/components/ui/Logo";
import NavList from "@/components/ui/NavList";

export default function Footer() {
  return (
    <footer className="footer">
      <NavList items={socials} direction="row" className="footer__socials" />
      <Logo size="lg" className="footer__logo" />
    </footer>
  );
}

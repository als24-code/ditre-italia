import { site } from "@/data/content";
import { cx } from "@/lib/cx";

export default function ContactInfo({ className }: { className?: string }) {
  return (
    <address className={cx("contact-info", className)}>
      <span className="contact-info__line">{site.address}</span>
      <a className="contact-info__line" href={`tel:${site.phone.replace(/\s/g, "")}`}>
        {site.phone}
      </a>
    </address>
  );
}

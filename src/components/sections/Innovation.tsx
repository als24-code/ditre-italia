import Marquee from "@/components/ui/Marquee";

const WORDS = ["Craftsmanship", "Sophistication", "Modernity", "Innovation"];

export default function Innovation() {
  return (
    <section className="innovation" aria-label="Our design philosophy">
      <Marquee words={WORDS} repeat={1} duration={50} />
    </section>
  );
}

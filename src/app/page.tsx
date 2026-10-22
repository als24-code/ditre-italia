import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Innovation from "@/components/sections/Innovation";
import Values from "@/components/sections/Values";
import Language from "@/components/sections/Language";
import Banner from "@/components/sections/Banner";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Cursor from "@/components/ui/Cursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <div id="top" className="page">
        <Header />
        <main>
          <Hero />
          <Mission />
          <Innovation />
          <Values />
          <Language />
          <Banner />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

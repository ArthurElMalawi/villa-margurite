import HeroHeader from "../components/sections/HeroHeader";
import Rooms from "../components/sections/Rooms";
import LivingRoom from "../components/sections/LivingRoom";
import Kitchen from "@/components/sections/Kitchen";
import Bathroom from "@/components/sections/Bathrooms";
import Garden from "@/components/sections/Garden";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import styles from "../components/sections/HeroHeader.module.scss";

export default function Home() {
  return (
    <div>
      <section id="hero" className={styles.hero}>
        <HeroHeader />
        <Navbar />
      </section>
      <Rooms />
      <LivingRoom />
      <Kitchen />
      <Bathroom />
      <Garden />
      <Contact />
      <Footer />
    </div>
  );
}

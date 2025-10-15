import HeroHeader from "../components/sections/HeroHeader";
import Rooms from "../components/sections/Rooms";
import LivingRoom from "../components/sections/LivingRoom";
import Kitchen from "@/components/sections/Kitchen";
import Bathroom from "@/components/sections/Bathrooms";
import Garden from "@/components/sections/Garden";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Navbar />
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

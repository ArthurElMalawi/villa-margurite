import HeroHeader from "../components/sections/HeroHeader";
import Rooms from "../components/sections/Rooms";
import LivingRoom from "../components/sections/LivingRoom";
import Kitchen from "@/components/sections/Kitchen";
import Bathroom from "@/components/sections/Bathrooms";
import Garden from "@/components/sections/Garden";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Rooms />
      <LivingRoom />
      <Kitchen />
      <Bathroom />
      <Garden />
      <Contact />
    </div>
  );
}

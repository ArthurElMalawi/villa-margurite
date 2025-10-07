import HeroHeader from "../components/sections/HeroHeader";
import Rooms from "../components/sections/Rooms";
import LivingRoom from "../components/sections/LivingRoom";
import Kitchen from "@/components/sections/Kitchen";
import Bathroom from "@/components/sections/Bathrooms";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Rooms />
      <LivingRoom />
      <Kitchen />
      <Bathroom />
    </div>
  );
}

import HeroHeader from "../components/sections/HeroHeader";
import Rooms from "../components/sections/Rooms";
import LivingRoom from "../components/sections/LivingRoom";
import Kitchen from "@/components/sections/Kitchen";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Rooms />
      <LivingRoom />
      <Kitchen />
    </div>
  );
}

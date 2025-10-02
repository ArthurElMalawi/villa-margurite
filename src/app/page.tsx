import HeroHeader from "../components/sections/HeroHeader";
import Rooms from "../components/sections/Rooms";
import LivingRoom from "../components/sections/LivingRoom";

console.log("DEBUG components", {
  HeroHeader: typeof HeroHeader,
  LivingRoom: typeof LivingRoom,
  Rooms: typeof Rooms,
})

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Rooms />
      <LivingRoom />
    </div>
  );
}

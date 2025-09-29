import Image from "next/image";
import styles from "./page.module.scss";
import HeroHeader from "@/components/sections/HeroHeader";
import Rooms from "@/components/sections/Rooms";
import Livingroom from "@/components/sections/LivingRooms";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Rooms />
      <Livingroom />
    </div>
  );
}

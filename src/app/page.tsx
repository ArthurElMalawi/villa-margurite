import Image from "next/image";
import styles from "./page.module.scss";
import HeroHeader from "@/components/sections/HeroHeader";
import Rooms from "@/components/sections/Rooms";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Rooms />
    </div>
  );
}

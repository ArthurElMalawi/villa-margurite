import React from "react";
import styles from "./HeroHeader.module.scss";
import Image from "next/image";

export default function HeroHeader() {
  return (
    <section id="hero" className={styles.heroHeader}>
      <div>
        <h1>Bien dormir pour réussir</h1>
        <h3>24 rue Victor Hugo, 95300 Pontoise, France</h3>
      </div>
      <Image
        src="/assets/commons/livingroom/salon.jpeg"
        alt="hero header image"
        width={1920}
        height={1080}
        priority={true}
      />
    </section>
  );
}

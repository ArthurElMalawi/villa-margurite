import React from "react";
import styles from "./Garden.module.scss";
import Carousel from "@/components/utils/Carousel";

export default function Garden() {
  const imgs = [];

  for (let i = 1; i <= 6; i++) {
    imgs.push("jardin-" + i);
  }

  return (
    <section id="garden" className={`section ${styles.garden}`}>
      <h2>Le Jardin</h2>
      <div className="container-2-cols">
        <Carousel
          carouselItems={imgs.map((img) => (
            <img
              key={img}
              src={`/assets/commons/garden/${img}.jpeg`}
              alt={img}
              width={1920}
              height={1080}
              loading="lazy"
            />
          ))}
        />
        <div>
          <p>
            Le jardin de la Villa Marguerite offre un véritable havre de paix au cœur de la verdure. Entouré d’arbres matures et de plantes soigneusement entretenues, il constitue un espace idéal pour se détendre ou partager un moment convivial.
            <br />
            <br />
            Une grande terrasse en gravier accueille une table de jardin, des chaises et un parasol, parfaits pour déjeuner en plein air ou profiter du soleil en toute tranquillité.
            Le terrain, légèrement en pente et bordé de massifs fleuris, apporte une atmosphère naturelle et apaisante, tandis que la vue dégagée sur la végétation environnante renforce le sentiment d’intimité et de sérénité.
          </p>
        </div>
      </div>
    </section>
  );
}

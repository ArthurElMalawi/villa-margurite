import React from "react";
import styles from "./Livingroom.module.scss";
import Image from "next/image";
import Carousel from "../utils/Carousel";

function Livingroom() {
  let imgs = []

  for(let i=1; i <= 8; i ++){
    imgs.push("salon-"+ i);
  }

  console.log(imgs)

  return (
    <section id="livingroom" className={`section ${styles.livingroom}`}>
      <h2>Le salon</h2>
      <div className={styles.container}>
        <p>
          Le salon de la résidence est un espace lumineux et accueillant, ouvert sur le jardin grâce à ses grandes baies vitrées. Ses canapés confortables, ses tables basses et ses plantes en font un lieu idéal pour se détendre, travailler ou partager un moment convivial entre colocataires.
          <br/>
          <br/>
          Avec son parquet en bois, ses moulures élégantes et sa décoration moderne, ce grand salon allie charme de l’ancien et confort contemporain. Véritable cœur de la maison, il invite chacun à s’y sentir rapidement chez soi.
        </p>
        <Carousel carouselItems={ 
          imgs.map((img) => (
              <Image
                key={img}
                src={`/assets/commons/livingroom/${img}.jpeg`}
                alt={img}
                width={1920}
                height={1080}
              />
          ))}
        />
      </div>
    </section>
  );
}

export default Livingroom;

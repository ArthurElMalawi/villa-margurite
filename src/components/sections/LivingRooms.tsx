import React from "react";
import styles from "./Livingroom.module.scss";
import Image from "next/image";

function Livingroom() {
  let imgs = []

  for(let i=1; i <= 10; i ++){
    imgs.push("salon-"+ i);
  }

  console.log(imgs)

  return (
    <section id="livingroom" className={`section ${styles.livingroom}`}>
      <h2>Le salon</h2>
      <div className={styles.container}>
        <p>text</p>
        <div className={styles.carousel}>
          {imgs.map((img) => (
              <Image
                key={img}
                src={`/assets/commons/livingroom/${img}.jpeg`}
                alt={img}
                width={1920}
                height={1080}
              />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Livingroom;

import React from "react";
import styles from "./Kitchen.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireBurner,
  faClock,
  faSnowflake,
  faUtensils,
  faMugHot,
  faBreadSlice,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";

export default function Kitchen() {
  const imgs = [];

  const equipments = [
    { icon: faFireBurner, label: "Plaques de cuisson" },
    { icon: faClock, label: "Four & micro-ondes" },
    { icon: faSnowflake, label: "Réfrigérateur" },
    { icon: faUtensils, label: "Vaisselle et ustensiles" },
    { icon: faMugHot, label: "Bouilloire" },
    { icon: faBreadSlice, label: "Grille-pain" },
    { icon: faShirt, label: "Lave-linge" },
  ];
  for (let i = 1; i <= 4; i++) {
    imgs.push("cuisine-" + i);
  }

  return (
    <section id="kitchen" className={`section ${styles.kitchen}`}>
      <h2>La Cuisine</h2>
      <div className="container-2-cols reverse">
        <div className={styles.texts}>
          <p>
            Spacieuse et fonctionnelle, la cuisine de la Villa Marguerite a été
            conçue pour allier élégance et praticité. Ses équipements modernes
            et son style raffiné en font un lieu idéal pour préparer vos repas
            dans un cadre lumineux et accueillant.
          </p>
          <br />
          <ul className={styles.equipments}>
            {equipments.map((item) => (
              <li key={item.label}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />{" "}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.images}>
          {imgs.map((img) => (
            <Image
              key={img}
              src={`/assets/commons/kitchen/${img}.jpeg`}
              alt={img}
              width={640}
              height={360}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

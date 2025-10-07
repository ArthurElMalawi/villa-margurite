import React from "react";
import styles from "./Bathrooms.module.scss";

export default function Bathroom(){
    const bathrooms = [
        {name: "Salle de bain 1", img: "sdb1"},
        {name: "Salle de bain 2", img: "sdb2"},
    ];

    return (
        <section id="bathrooms" className={`section ${styles.bathrooms}`}>
            <h2>Les salles de bain</h2>
            <div className={styles.options}>
                {bathrooms.map((bathroom) => (
                    <div className={styles.option} key={bathroom.img}>
                        <img 
                            src={`/assets/commons/bathrooms/${bathroom.img}.jpeg`}
                            alt={bathroom.img}
                            width={970}
                            height={540}
                            loading="lazy"/>
                        <p>{bathroom.name}</p>
                    </div>
                ))}
            </div>
            <p className={styles.desc}>
                La Villa Marguerite dispose de deux salles de bain élégantes et fonctionnelles, chacune pensée pour le confort des résidents.
                La première, lumineuse et spacieuse, offre une baignoire classique, idéale pour un moment de détente après une longue journée.
                La seconde, plus contemporaine, est équipée d’une douche moderne à l’italienne, parfaite pour un usage rapide et pratique.
            </p>
        </section>
    );
}
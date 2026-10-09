import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { ADDRESS, HERO_PHOTO, ROOMS } from "@/data/villa";
import styles from "./Hero.module.scss";

const areas = ROOMS.map((r) => r.area);

const FACTS = [
  { value: String(ROOMS.length), label: "chambres meublées" },
  { value: `${Math.floor(Math.min(...areas))} à ${Math.ceil(Math.max(...areas))} m²`, label: "par chambre" },
  { value: "3", label: "salles de bains" },
  { value: "25 m²", label: "de salon commun" },
];

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.in}`}>Colocation étudiante · Pontoise</p>
          <h1 className={`display ${styles.title} ${styles.in}`}>
            Villa <em>Marguerite</em>
          </h1>
          <p className={`${styles.lead} ${styles.in}`}>
            Six chambres dans une maison de caractère, un grand salon, un jardin et une cuisine faite pour la
            vie à plusieurs. <strong>Bien dormir pour réussir.</strong>
          </p>
          <div className={`${styles.actions} ${styles.in}`}>
            <a href="#visite" className="btn primary">
              Visiter en 3D <ArrowRight />
            </a>
            <a href="#chambres" className="btn ghost">
              Voir les chambres
            </a>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.arch}>
            <Image
              src={HERO_PHOTO}
              alt="Le salon de la Villa Marguerite"
              fill
              priority
              sizes="(min-width: 1000px) 45vw, 100vw"
            />
          </div>
          <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.address}>
            <MapPin />
            <span>
              {ADDRESS.street}
              <small>{ADDRESS.city}</small>
            </span>
          </a>
        </div>
      </div>

      <div className="container">
        <dl className={styles.facts}>
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{f.value}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

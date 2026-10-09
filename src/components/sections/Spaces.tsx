"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Images } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";
import { SPACES, type Space } from "@/data/villa";
import styles from "./Spaces.module.scss";

export default function Spaces() {
  return (
    <section id="espaces" className="section">
      <div className="container">
        <Reveal className="sectionHead">
          <p className="eyebrow">Espaces partagés</p>
          <h2 className="display">
            Tout ce qu&apos;on <em>partage</em>.
          </h2>
          <p>Salon, cuisine et WC au rez-de-chaussée, salles de bains à l&apos;étage, et le jardin pour les beaux jours.</p>
        </Reveal>

        <div className={styles.list}>
          {SPACES.map((space, i) => (
            <SpaceBlock key={space.id} space={space} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaceBlock({ space, index }: { space: Space; index: number }) {
  const [photo, setPhoto] = useState<number | null>(null);
  const shown = space.photos.slice(0, 3);
  const more = space.photos.length - shown.length;

  return (
    <article className={`${styles.space} ${index % 2 ? styles.flip : ""}`}>
      <Reveal className={`${styles.mosaic} ${styles[`n${shown.length}`] ?? ""}`}>
        {shown.map((src, i) => (
          <button key={src} className={styles.tile} onClick={() => setPhoto(i)} aria-label={`Agrandir la photo ${i + 1}`}>
            <Image
              src={src}
              alt={`${space.name}, photo ${i + 1}`}
              fill
              sizes={i === 0 ? "(min-width: 1000px) 40vw, 100vw" : "(min-width: 1000px) 20vw, 50vw"}
            />
          </button>
        ))}
        {space.photos.length > 1 && (
          <button className={styles.all} onClick={() => setPhoto(0)}>
            <Images /> {more > 0 ? `+${more} photo${more > 1 ? "s" : ""}` : "Voir les photos"}
          </button>
        )}
      </Reveal>

      <Reveal className={styles.text} delay={0.1}>
        <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
        <h3 className="display">{space.name}</h3>
        {space.area && <p className={styles.area}>{space.area}</p>}
        {space.text.map((t) => (
          <p key={t.slice(0, 20)}>{t}</p>
        ))}
        {space.features && (
          <ul className={styles.features}>
            {space.features.map((f) => (
              <li key={f}>
                <Check /> {f}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Lightbox title={space.name} photos={space.photos} index={photo} onChange={setPhoto} />
    </article>
  );
}

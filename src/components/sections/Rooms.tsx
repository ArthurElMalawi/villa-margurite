"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Images } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";
import { ROOMS, type Room } from "@/data/villa";
import { showInTour } from "@/components/sections/Tour";
import styles from "./Rooms.module.scss";

const fmtArea = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 });

export default function Rooms() {
  return (
    <section id="chambres" className={`section ${styles.rooms}`}>
      <div className="container">
        <Reveal className="sectionHead">
          <p className="eyebrow">Les chambres</p>
          <h2 className="display">
            Six chambres, <em>six caractères</em>.
          </h2>
          <p>
            Toutes meublées, avec parquet ancien et grandes fenêtres. De 12 à 24 m², réparties sur trois
            niveaux pour que chacun garde son calme.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {ROOMS.map((room, i) => (
            <RoomCard key={room.key} room={room} delay={(i % 3) * 0.08} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function RoomCard({ room, delay }: { room: Room; delay: number }) {
  const [photo, setPhoto] = useState<number | null>(null);

  return (
    <Reveal as="li" className={styles.card} delay={delay}>
      <button
        className={styles.photo}
        onClick={() => setPhoto(0)}
        aria-label={`Voir les photos de la ${room.name.toLowerCase()}`}
      >
        <Image
          src={room.photos[0]}
          alt={room.name}
          fill
          sizes="(min-width: 1000px) 33vw, (min-width: 600px) 50vw, 100vw"
        />
        <span className={styles.number}>{String(room.id).padStart(2, "0")}</span>
        {room.photos.length > 1 && (
          <span className={styles.count}>
            <Images /> {room.photos.length} photos
          </span>
        )}
      </button>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3>{room.name}</h3>
          <p className={styles.area}>
            {fmtArea(room.area)} <small>m²</small>
          </p>
        </div>
        <p className={styles.meta}>
          {room.floor} · {room.note}
        </p>
        <button className={styles.tourBtn} onClick={() => showInTour({ room: room.key })}>
          <Box /> Voir en 3D
        </button>
      </div>
      <Lightbox title={room.name} photos={room.photos} index={photo} onChange={setPhoto} />
    </Reveal>
  );
}

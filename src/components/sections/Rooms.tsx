import React from "react";
import styles from "./Rooms.module.scss";

export default function Rooms() {
  const rooms: number[] = [];
  for (let i = 1; i <= 6; i++) {
    rooms.push(i);
  }

  return (
    <section id="rooms" className={`section ${styles.rooms}`}>
      <h2>Les chambres</h2>

      <div className={styles.roomsContainer}>
        {rooms.map((roomNumber) => {
          const src = `/assets/rooms/room${roomNumber}/chambre${roomNumber}-1.jpeg`;
          return (
            <div key={`Chambre ${roomNumber}`} className={styles.room}>
              <img
                src={src}
                alt={`Chambre ${roomNumber}`}
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                style={{ display: "block", width: "100%", height: "auto" }}
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

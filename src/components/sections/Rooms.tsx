import React from "react";
import styles from "./Rooms.module.scss";
import Image from "next/image";



function Rooms() {
  const rooms = []

  for(let i=1; i <= 6; i ++){
    rooms.push("chambre"+ i);
  }

  return (
    <section id="rooms" className={`section ${styles.rooms}`}>
      <h2>Les chambres</h2>
      <div className={styles.roomsContainer}>
        {rooms.map((room, index) => (
          <div key={index} className={styles.room}>
            <Image
                key={index} 
                src={`/assets/rooms/room${index + 1}/${room}-1.jpeg`}
                alt={room}
                width={640}
                height={360} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Rooms;

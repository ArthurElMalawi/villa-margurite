"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { FLOORS } from "@/data/villa";
import { showInTour } from "@/components/sections/Tour";
import styles from "./House.module.scss";

export default function House() {
  return (
    <section id="maison" className={`section ${styles.house}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.statement}>
          <p className="eyebrow">La maison</p>
          <h2 className="display">
            Une grande maison de famille, <em>partagée</em> entre six étudiants.
          </h2>
        </Reveal>

        <Reveal className={styles.body} delay={0.1}>
          <p>
            Hauts plafonds, moulures, parquets anciens et carreaux de ciment : la Villa Marguerite a gardé tout son
            caractère. Chaque chambre est meublée et indépendante, les pièces de vie se partagent, et le jardin
            offre un vrai coin de calme pour souffler entre deux révisions.
          </p>

          <ol className={styles.floors} aria-label="Les étages">
            {FLOORS.map((f, i) => (
              <li key={f.name}>
                <button onClick={() => showInTour({ level: FLOORS.length - 1 - i })}>
                  <span className={styles.floorName}>{f.name}</span>
                  <span className={styles.floorRooms}>{f.rooms}</span>
                  <ArrowUpRight aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.hint}>Cliquez sur un étage pour l&apos;explorer en 3D.</p>
        </Reveal>
      </div>
    </section>
  );
}

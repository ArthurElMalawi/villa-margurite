"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Expand, MousePointer2, Move3d, Layers } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { TOUR_SRC } from "@/data/villa";
import styles from "./Tour.module.scss";

type Target = { room?: string; level?: number };

const EVENT = "vm:tour";

/** Ouvre la visite 3D sur une pièce (clé du plan, ex. "ch3") ou un étage (0 = RDC … 3 = 2e). */
export function showInTour(target: Target) {
  window.dispatchEvent(new CustomEvent<Target>(EVENT, { detail: target }));
}

const toMessage = (t: Target) =>
  t.room ? { type: "vm-3d:focus", room: t.room } : { type: "vm-3d:floor", level: t.level };

export default function Tour() {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const frameBox = useRef<HTMLDivElement>(null);
  const pending = useRef<Target | null>(null);

  const send = useCallback((t: Target) => {
    frame.current?.contentWindow?.postMessage(toMessage(t), window.location.origin);
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== "vm-3d:ready") return;
      setReady(true);
      if (pending.current) send(pending.current);
      pending.current = null;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [send]);

  useEffect(() => {
    const onShow = (e: Event) => {
      const target = (e as CustomEvent<Target>).detail;
      frameBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setStarted(true);
      if (ready) send(target);
      else pending.current = target;
    };
    window.addEventListener(EVENT, onShow);
    return () => window.removeEventListener(EVENT, onShow);
  }, [ready, send]);

  return (
    <section id="visite" className={`section ${styles.tour}`}>
      <div className="container">
        <Reveal className="sectionHead">
          <p className="eyebrow">Visite 3D</p>
          <h2 className="display">
            Faites le tour <em>sans vous déplacer</em>.
          </h2>
          <p>
            La maison reconstituée pièce par pièce, étage par étage. Tournez autour, zoomez, coupez les murs pour
            voir l&apos;agencement de chaque chambre.
          </p>
        </Reveal>

        <div ref={frameBox}>
          <Reveal className={styles.frame} delay={0.1}>
            {started ? (
              <iframe
                ref={frame}
                src={`${TOUR_SRC}?embed&theme=light`}
                title="Visite 3D de la Villa Marguerite"
                allow="fullscreen"
              />
            ) : (
              <button className={styles.poster} onClick={() => setStarted(true)}>
                <HouseCut />
                <span className={`btn primary ${styles.play}`}>
                  <Box /> Lancer la visite 3D
                </span>
              </button>
            )}
          </Reveal>
        </div>

        <div className={styles.below}>
          <ul className={styles.tips}>
            <li>
              <MousePointer2 /> Glisser pour tourner
            </li>
            <li>
              <Move3d /> Molette ou pincement pour zoomer
            </li>
            <li>
              <Layers /> Flèches ↑ ↓ pour changer d&apos;étage
            </li>
          </ul>
          <a href="/visite-3d" className="btn ghost">
            <Expand /> Plein écran
          </a>
        </div>
      </div>
    </section>
  );
}

/** Coupe schématique de la maison, en attendant le chargement de la vraie scène. */
function HouseCut() {
  return (
    <svg className={styles.cut} viewBox="0 0 320 240" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M60 200V88l100-56 100 56v112z" />
        <path d="M60 88h200M60 136h200M160 136v64M110 88v48M210 88v48M132 60h56" />
        <path d="M86 200v-34a10 10 0 0 1 20 0v34M214 200v-34a10 10 0 0 1 20 0v34" />
        <path d="M40 200h240" />
      </g>
      <circle cx="160" cy="60" r="5" fill="var(--brass)" />
    </svg>
  );
}

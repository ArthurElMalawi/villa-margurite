"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./Lightbox.module.scss";

type Props = {
  title: string;
  photos: string[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export default function Lightbox({ title, photos, index, onChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onChange((index + dir + photos.length) % photos.length);
    },
    [index, onChange, photos.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <dialog
      ref={dialog}
      className={styles.lightbox}
      aria-label={title}
      onClose={() => onChange(null)}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
    >
      {open && (
        <>
          <header className={styles.bar}>
            <p>
              {title} <span>{index + 1} / {photos.length}</span>
            </p>
            <button onClick={() => onChange(null)} aria-label="Fermer">
              <X />
            </button>
          </header>

          <figure className={styles.stage}>
            <Image
              key={photos[index]}
              src={photos[index]}
              alt={`${title}, photo ${index + 1}`}
              fill
              sizes="100vw"
              className={styles.photo}
            />
          </figure>

          {photos.length > 1 && (
            <>
              <button className={`${styles.nav} ${styles.prev}`} onClick={() => step(-1)} aria-label="Photo précédente">
                <ChevronLeft />
              </button>
              <button className={`${styles.nav} ${styles.next}`} onClick={() => step(1)} aria-label="Photo suivante">
                <ChevronRight />
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}

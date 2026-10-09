import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TOUR_SRC } from "@/data/villa";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Visite 3D · Villa Marguerite",
  description: "Explorez la Villa Marguerite en 3D, étage par étage.",
};

export default async function TourPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams;
  const query = room ? `?room=${encodeURIComponent(room)}&theme=light` : "?theme=light";

  return (
    <main className={styles.page}>
      <iframe src={`${TOUR_SRC}${query}`} title="Visite 3D de la Villa Marguerite" className={styles.frame} />
      <Link href="/#visite" className={styles.back}>
        <ArrowLeft /> Retour au site
      </Link>
    </main>
  );
}

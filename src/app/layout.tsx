import type { Metadata, Viewport } from "next";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";
import "./globals.scss";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Villa Marguerite · Colocation étudiante à Pontoise",
  description:
    "Six chambres meublées dans une maison de caractère avec jardin, au 24 rue Victor Hugo à Pontoise. Visite 3D de la maison en ligne.",
};

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${grotesk.variable}`}>{children}</body>
    </html>
  );
}

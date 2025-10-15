import type { Metadata } from "next";
import { Poppins, MonteCarlo } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  preload: false,
});

const dancingScript = MonteCarlo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing",
  preload: true,
});

export const metadata: Metadata = {
  title: "Villa Marguerite",
  description: "Site vitrine de la résidence étudiante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${dancingScript.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

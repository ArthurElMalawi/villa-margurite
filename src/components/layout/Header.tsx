"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import DaisyMark from "@/components/ui/DaisyMark";
import styles from "./Header.module.scss";

const LINKS = [
  { href: "#maison", label: "La maison" },
  { href: "#chambres", label: "Chambres" },
  { href: "#espaces", label: "Espaces partagés" },
  { href: "#quartier", label: "Quartier" },
  { href: "#visite", label: "Visite 3D" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...LINKS.map((l) => l.href), "#contact"].forEach((h) => {
      const el = document.querySelector(h);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${open ? styles.menuOpen : scrolled ? styles.solid : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <DaisyMark />
          <span>
            Villa <em>Marguerite</em>
          </span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Navigation principale">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active === l.href ? styles.active : ""}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={`btn primary ${styles.cta}`} onClick={() => setOpen(false)}>
            Nous écrire
          </a>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

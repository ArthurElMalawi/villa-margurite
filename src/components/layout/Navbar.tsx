"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const sections = [
  { anchor: "rooms", title: "Les Chambres" },
  { anchor: "livingroom", title: "Le Salon" },
  { anchor: "kitchen", title: "La Cuisine" },
  { anchor: "bathrooms", title: "Les Salles de bain" },
  { anchor: "garden", title: "Le Jardin" },
  { anchor: "contact", title: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  const openMenu = () => setOpen((o) => !o);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)"); // adapte à ton breakpoint
    if (!mq.matches) return;

    const hero = document.getElementById("hero");
    if (!hero) return;

    const computeHeroBottom = () => hero.offsetTop + hero.offsetHeight;
    let heroBottom = computeHeroBottom();

    const onScroll = () => {
      setStuck(window.scrollY >= heroBottom);
    };

    const onResize = () => {
      heroBottom = computeHeroBottom();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ton observer active link (optionnel)
  useEffect(() => {
    const ids = ["hero", ...sections.map((s) => s.anchor)];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.6 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${stuck ? styles.stuck : styles.free}`}
      aria-label="Navigation principale"
    >
      <div className={styles.cross} onClick={openMenu}>
        <FontAwesomeIcon icon={open ? faTimes : faBars} />
      </div>

      <ul className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
        {sections.map((section) => (
          <li key={section.anchor}>
            <a
              href={`#${section.anchor}`}
              className={active === section.anchor ? styles.linkActive : ""}
              onClick={() => setOpen(false)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

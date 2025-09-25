"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const sections = [
  { anchor: "rooms", title: "Les Chambres" },
  { anchor: "livingroom", title: "Le Salon" },
  { anchor: "kitchen", title: "La Cuisine" },
  { anchor: "bathrooms", title: "Les Salles d'eau" },
  { anchor: "garden", title: "Le Jardin" },
  { anchor: "contact", title: "Contact" },
];

function Navbar () {
    const [active, setActive] = useState("");
    const [open, setOpen] = useState(false);

    const openMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
            });
        },
        { threshold: 0.6 }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.anchor);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

 return (
  <nav className={styles.navbar} aria-label="Navigation principale">
    <div className={styles.cross} onClick={openMenu}>
      <FontAwesomeIcon icon={open ? faTimes : faBars} />
    </div>

    <ul className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
      {sections.map((section) => (
        <li key={section.anchor}>
          <a
            href={`#${section.anchor}`}
            className={active === section.anchor ? styles.linkActive : ""}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  );
};

export default Navbar;
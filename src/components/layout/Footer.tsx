"use client";

import React from "react";
import { Github, Linkedin, Mail, Globe, Dribbble } from "lucide-react";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          © {currentYear} <span>Arthur El Malawi</span> — Tous droits réservés.
        </p>

        <div className={styles.socials}>
          <a
            href="https://github.com/arthurelmalawi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/arthur-el-malawi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.behance.net/arthurelmalawi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dribbble"
          >
            <Dribbble size={20} />
          </a>
          <a href="mailto:elmalawia@gmail.com" aria-label="Mail">
            <Mail size={20} />
          </a>
          {/* <a
            href="https://arthurelmalawi.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
          >
            <Globe size={20} />
          </a> */}
        </div>
      </div>
    </footer>
  );
}

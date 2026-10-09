"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { ADDRESS, CONTACT_EMAIL, ROOMS } from "@/data/villa";
import styles from "./Contact.module.scss";

const WEB3FORMS_KEY = "c670c3ea-0310-4df6-8fb7-8987a5bf4cdd";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "Villa Marguerite : nouvelle demande");
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus({ kind: "ok", message: "Merci ! Votre message est bien parti, on vous répond rapidement." });
    } catch (err) {
      console.error(err);
      setStatus({ kind: "error", message: `L'envoi n'a pas fonctionné. Réessayez ou écrivez-nous à ${CONTACT_EMAIL}.` });
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.intro}>
          <p className="eyebrow">Contact</p>
          <h2 className="display">
            Envie de <em>venir voir</em> ?
          </h2>
          <p>
            Une question sur une chambre, les disponibilités ou une visite sur place : écrivez-nous, on vous
            répond directement.
          </p>

          <ul className={styles.details}>
            <li>
              <Mail />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <MapPin />
              <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer">
                {ADDRESS.street}, {ADDRESS.city}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal className={styles.card} delay={0.1}>
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.field}>
              <span>Nom complet</span>
              <input type="text" name="name" autoComplete="name" placeholder="Camille Martin" required />
            </label>
            <label className={styles.field}>
              <span>Adresse e-mail</span>
              <input type="email" name="email" autoComplete="email" placeholder="camille@exemple.fr" required />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Chambre qui vous intéresse</span>
              <select name="chambre" defaultValue="Peu importe">
                <option>Peu importe</option>
                {ROOMS.map((r) => (
                  <option key={r.key}>{r.name}</option>
                ))}
              </select>
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Votre message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Bonjour, je cherche une chambre à partir de septembre…"
                required
              />
            </label>
            <input type="checkbox" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" />

            <button type="submit" className={`btn primary ${styles.full}`} disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Envoi en cours…" : "Envoyer le message"} <ArrowRight />
            </button>

            <p className={`${styles.status} ${styles[status.kind]} ${styles.full}`} role="status">
              {status.message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

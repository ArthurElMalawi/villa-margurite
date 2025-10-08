"use client";

import React, { useState } from "react";
import styles from "./Contact.module.scss";

export default function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const email = "veronique.malawi@gmail.com"

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setLoading(true);
    setResult("");

    const formData = new FormData(form);
    formData.append("access_key", "c670c3ea-0310-4df6-8fb7-8987-a5bf4cdd");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("✅ Votre message a bien été envoyé !");
        form.reset();
      } else {
        setResult("❌ Une erreur est survenue. Merci de réessayer.");
        console.error("Erreur Web3Forms :", data);
      }
    } catch (err) {
      setResult("❌ Impossible d’envoyer le message. Réessayez plus tard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <h2>Contactez-nous</h2>
        <div className={styles.formContainer}>
            <p className={styles.intro}>
                Une question sur la Villa Marguerite ? Un renseignement sur la
                colocation ? Remplissez le formulaire ci-dessous ou contactez-nous par mail à <a href={`mailto:${email}`}>{email}</a>
                , nous vous répondrons dans les plus brefs délais.
            </p>

            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.field}>
                <label htmlFor="name">Nom complet</label>
                <input type="text" id="name" name="name" placeholder="Jean Dupont" required />
                </div>

                <div className={styles.field}>
                <label htmlFor="email">Adresse e-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jean.dupont@email.com"
                    required
                />
                </div>

                <div className={styles.field}>
                <label htmlFor="message">Votre message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Écrivez votre message ici..."
                    required
                ></textarea>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
            </form>

            {result && <p className={styles.result}>{result}</p>}
        </div>
    </section>
  );
}

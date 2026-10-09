# 🏡 Villa Marguerite — Site vitrine de la résidence étudiante

Bienvenue sur le dépôt du site Villa Marguerite, une colocation étudiante chaleureuse située à Pontoise.
Ce projet présente les chambres, les espaces communs et les services proposés dans un environnement calme et verdoyant 🌿

## ✨ Aperçu du projet

Ce site a été conçu pour offrir une visite virtuelle claire et élégante du logement.
Il met en avant les différentes pièces de la maison (chambres, salon, cuisine, jardin…) à travers des sections illustrées, un carrousel d’images et un design responsive.

👉 Le but : permettre aux futurs colocataires de découvrir la Villa avant même de la visiter.

## 🛠️ Stack technique

- **Next.js 16** — Framework principal (React + SSR)
- **TypeScript** — Typage strict pour un code plus robuste
- **SCSS Modules** — Gestion des styles par composant
- **Lucide** — Icônes
- **three.js** — Visite 3D de la maison (`public/visite-3d/plan.html`, scène autonome intégrée en iframe)
- **Web3Forms API** — Formulaire de contact sans backend
- **ntfy.sh** — Système de notification pour le suivi des déploiements 🚀

## 📢 Suivre les mises à jour avec NTFY

Chaque fois qu’une mise à jour est poussée sur la branche main, une notification est envoyée automatiquement grâce à GitHub Actions & ntfy.sh :

🚀 “Le site Villa Marguerite a été mis à jour avec succès !”

💡 Tu peux rejoindre le canal public ntfy pour suivre les prochaines versions et l’avancée du projet :

📲 Lien du canal :
👉 https://ntfy.sh/villa-marguerite

Depuis ton smartphone ou ton navigateur, tu recevras les notifications en direct à chaque mise à jour !

## 🧱 Fonctionnalités principales
- 🎨 Design responsive pensé mobile-first
- 🧊 Visite 3D intégrée : chaque chambre et chaque étage s’ouvre directement dans la maquette
- 🖼️ Galeries photo en plein écran (chambres et pièces communes)
- 🗺️ Carte du quartier (OpenStreetMap) avec temps de marche, tracé à pied et lien « trajet en bus »
- 📩 Formulaire de contact fonctionnel via Web3Forms
- 🏷️ Suivi de version automatique (le package.json s’incrémente à chaque merge sur main)
- 🔔 Notifications de build via ntfy
- 🧭 Navigation sticky avec surlignage automatique de la section active

## 🧊 Visite 3D

La maquette est une page three.js autonome servie depuis `public/visite-3d/plan.html`.

- `?embed` masque son titre (utilisé dans la section « Visite 3D »)
- `?room=ch3` ouvre directement une pièce, `?theme=light|dark` force le thème
- Le site la pilote par `postMessage` : `{ type: "vm-3d:focus", room: "ch3" }` ou `{ type: "vm-3d:floor", level: 2 }`
- Côté React : `showInTour({ room })` / `showInTour({ level })` depuis `components/sections/Tour.tsx`

## 🛠️ Scripts de contenu

| Script | Rôle |
|---|---|
| `python scripts/export-photos.py` | Exporte la sélection de photos (`public/assets/photos-all`, non versionné) vers `public/assets/photos` : redimensionnées, sans EXIF/GPS, et vérifie l'absence de doublons |
| `python scripts/build-plan.py` | Régénère `public/visite-3d/plan.html` depuis l'export du plan 3D (`public/assets/3D-view`, non versionné) |
| `node scripts/fetch-routes.mjs` | Recalcule les itinéraires piétons de la carte du quartier (`src/data/routes.json`) |

## 🚀 Déploiement

Le site est déployé sur Vercel :
🔗 https://villa-marguerite.vercel.app

## 👨‍💻 Auteur

Projet conçu et développé par Arthur El Malawi
Front-end Developer • Passionné par le design web, React et les projets vivants 🌱
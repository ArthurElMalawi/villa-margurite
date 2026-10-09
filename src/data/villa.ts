// Contenu du site. Les surfaces et étages viennent du plan 3D (public/visite-3d/plan.html).

export const ADDRESS = {
  street: "24 rue Victor Hugo",
  city: "95300 Pontoise",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=24+rue+Victor+Hugo+95300+Pontoise",
  coords: [49.054122, 2.102067] as [number, number],
};

export type PlaceKind = "transport" | "etudes" | "courses" | "ville";

export type Place = {
  name: string;
  kind: PlaceKind;
  detail: string;
  coords: [number, number];
  /** minutes à pied, itinéraire piéton OSRM (routing.openstreetmap.de) */
  walk: number;
};

// Lieux et coordonnées issus d'OpenStreetMap (octobre 2026)
export const PLACES: Place[] = [
  { name: "Arrêt Cité Judiciaire", kind: "transport", detail: "Plusieurs lignes de bus", coords: [49.051532, 2.099357], walk: 5 },
  { name: "Boulangerie du Grand Martroy", kind: "courses", detail: "Boulangerie", coords: [49.051016, 2.098049], walk: 7 },
  { name: "Cathédrale Saint-Maclou", kind: "ville", detail: "Centre historique et commerces", coords: [49.050581, 2.097189], walk: 8 },
  { name: "Lidl", kind: "courses", detail: "Supermarché", coords: [49.054554, 2.094193], walk: 13 },
  { name: "Gare de Pontoise", kind: "transport", detail: "RER C, Transilien H et J", coords: [49.046728, 2.095196], walk: 15 },
  { name: "CY Cergy Paris Université", kind: "etudes", detail: "Site de Saint-Martin", coords: [49.042992, 2.084567], walk: 30 },
  { name: "Gare de Cergy-Préfecture", kind: "transport", detail: "RER A, Transilien L · 17 min à vélo", coords: [49.035985, 2.080347], walk: 41 },
];

/** Plan 3D autonome (three.js), servi tel quel depuis /public */
export const TOUR_SRC = "/visite-3d/plan.html";

export const CONTACT_EMAIL = "veronique.malawi@gmail.com";

/** Photos générées par scripts/export-photos.py (sélection sans doublons) */
const gallery = (dir: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/assets/photos/${dir}/${String(i + 1).padStart(2, "0")}.jpg`);

export const HERO_PHOTO = "/assets/photos/hero/01.jpg";

export type Room = {
  id: number;
  /** clé de la pièce dans le plan 3D */
  key: string;
  name: string;
  area: number;
  floor: string;
  note: string;
  /** la première sert de couverture */
  photos: string[];
};

export const ROOMS: Room[] = [
  { id: 1, key: "ch1", name: "Chambre 1", area: 17.75, floor: "1er étage", note: "Bureau d'angle et étagères", photos: gallery("chambre-1", 4) },
  { id: 2, key: "ch2", name: "Chambre 2", area: 20.2, floor: "1er étage", note: "Murs bleu clair, coin bureau à la fenêtre", photos: gallery("chambre-2", 4) },
  { id: 3, key: "ch3", name: "Chambre 3", area: 21.74, floor: "1er étage", note: "Lambris et murs bleu ardoise", photos: gallery("chambre-3", 2) },
  { id: 4, key: "ch4", name: "Chambre 4", area: 23.78, floor: "1er étage", note: "La plus grande, tons vert sauge", photos: gallery("chambre-4", 3) },
  { id: 5, key: "ch5", name: "Chambre 5", area: 12.39, floor: "Demi-étage", note: "Salle de bains privative", photos: gallery("chambre-5", 5) },
  { id: 6, key: "ch6", name: "Chambre 6", area: 18.26, floor: "2e étage", note: "Sous les toits, fenêtres cintrées", photos: gallery("chambre-6", 3) },
];

export const FLOORS = [
  { name: "2e étage", rooms: "Chambre 6, sous les toits" },
  { name: "1er étage", rooms: "Chambres 1 à 4, deux salles de bains, WC" },
  { name: "Demi-étage", rooms: "Chambre 5 et sa salle de bains" },
  { name: "Rez-de-chaussée", rooms: "Vestibule, salon, cuisine, WC" },
];


export type Space = {
  id: string;
  name: string;
  area?: string;
  text: string[];
  features?: string[];
  photos: string[];
};

export const SPACES: Space[] = [
  {
    id: "salon",
    name: "Le salon",
    area: "24,59 m²",
    text: [
      "Lumineux grâce à ses grandes fenêtres et sa belle hauteur sous plafond, le salon est le cœur de la maison : on s'y retrouve pour travailler, regarder un film ou simplement discuter.",
      "Parquet ancien, moulures, lambris : le charme de l'ancien, avec des canapés confortables et une déco simple.",
    ],
    photos: gallery("salon", 3),
  },
  {
    id: "cuisine",
    name: "La cuisine",
    area: "18,50 m²",
    text: [
      "Spacieuse et entièrement équipée, avec ses carreaux de ciment, elle est pensée pour cuisiner à plusieurs sans se marcher dessus.",
    ],
    features: [
      "Plaques de cuisson",
      "Four et micro-ondes",
      "Réfrigérateur",
      "Vaisselle et ustensiles",
      "Bouilloire",
      "Grille-pain",
      "Lave-linge",
    ],
    photos: gallery("cuisine", 2),
  },
  {
    id: "bains",
    name: "Les salles de bains",
    text: [
      "Deux salles de bains partagées au 1er étage : l'une avec baignoire, l'autre avec une douche à l'italienne. La chambre 5 a la sienne.",
      "Deux WC séparés, au rez-de-chaussée et à l'étage.",
    ],
    photos: gallery("salles-de-bains", 2),
  },
  {
    id: "jardin",
    name: "Le jardin",
    text: [
      "Un vrai jardin, arboré et fleuri, avec une terrasse en gravier, une grande table et un parasol pour déjeuner dehors dès les beaux jours.",
      "Massifs de lavande, pelouse en pente douce et beaucoup de calme.",
    ],
    photos: gallery("jardin", 3),
  },
];

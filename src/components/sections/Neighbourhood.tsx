"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker, Polyline } from "leaflet";
import {
  BusFront,
  Footprints,
  GraduationCap,
  Landmark,
  ShoppingBasket,
  Stethoscope,
  TrainFront,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { ADDRESS, PLACES, type Place, type PlaceKind } from "@/data/villa";
import ROUTES from "@/data/routes.json";
import "leaflet/dist/leaflet.css";
import styles from "./Neighbourhood.module.scss";

const KINDS: Record<PlaceKind, { label: string; Icon: typeof TrainFront }> = {
  transport: { label: "Transports", Icon: TrainFront },
  etudes: { label: "Études", Icon: GraduationCap },
  courses: { label: "Courses", Icon: ShoppingBasket },
  sante: { label: "Santé", Icon: Stethoscope },
  ville: { label: "En ville", Icon: Landmark },
};

/** tracés précalculés par scripts/fetch-routes.mjs */
const PATHS = ROUTES as unknown as Record<string, [number, number][]>;

/** à partir de quelle durée de marche on propose le bus */
const BUS_FROM_MIN = 12;

const directions = (p: Place, mode: "transit" | "walking") =>
  "https://www.google.com/maps/dir/?" +
  new URLSearchParams({
    api: "1",
    origin: ADDRESS.coords.join(","),
    destination: p.coords.join(","),
    travelmode: mode,
  });

const OVERVIEW: [number, number][] = [ADDRESS.coords, ...PLACES.map((p) => p.coords)];

export default function Neighbourhood() {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const route = useRef<Polyline | null>(null);
  const leaflet = useRef<typeof import("leaflet") | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Leaflet touche à window : chargé uniquement côté client, quand la carte approche de l'écran
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || map.current || !box.current) return;
        io.disconnect();
        const L = (await import("leaflet")).default;
        if (cancelled || !box.current) return;
        leaflet.current = L;

        const m = L.map(box.current, {
          scrollWheelZoom: true,
          dragging: !L.Browser.mobile,
          zoomControl: false,
          attributionControl: true,
        });
        L.control.zoom({ position: "bottomright" }).addTo(m);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          className: styles.tiles,
        }).addTo(m);

        L.marker(ADDRESS.coords, {
          icon: L.divIcon({
            className: styles.homePin,
            html: `<span>Villa Marguerite</span>`,
            iconSize: [0, 0],
          }),
          zIndexOffset: 1000,
          keyboard: false,
        }).addTo(m);

        markers.current = PLACES.map((p, i) =>
          L.marker(p.coords, {
            icon: L.divIcon({
              className: `${styles.pin} ${styles[p.kind]}`,
              html: `<b>${i + 1}</b>`,
              iconSize: [30, 30],
            }),
            title: p.name,
          })
            .bindTooltip(`<strong>${p.name}</strong><br>${p.walk} min à pied`, {
              direction: "top",
              offset: [0, -16],
              className: styles.tip,
            })
            // re-cliquer sur le lieu sélectionné le désélectionne
            .on("click", () => setActive((a) => (a === i ? null : i)))
            // une seule étiquette à la fois
            .on("tooltipopen", () => markers.current.forEach((o, j) => j !== i && o.closeTooltip()))
            .addTo(m),
        );

        m.fitBounds(OVERVIEW, { padding: [36, 36] });
        map.current = m;
        setReady(true);
      },
      { rootMargin: "300px" },
    );
    if (box.current) io.observe(box.current);

    return () => {
      cancelled = true;
      io.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // lieu sélectionné : trace l'itinéraire piéton et cadre la carte dessus
  useEffect(() => {
    const L = leaflet.current,
      m = map.current;
    if (!ready || !L || !m) return;
    route.current?.remove();
    route.current = null;
    if (active === null) {
      // désélection : retour à la vue d'ensemble
      markers.current.forEach((mk) => mk.closeTooltip());
      m.flyToBounds(OVERVIEW, { padding: [36, 36], duration: 0.8 });
      return;
    }

    const p = PLACES[active];
    const path = PATHS[p.name] ?? [ADDRESS.coords, p.coords];
    route.current = L.polyline(path, { className: styles.route, weight: 5, lineCap: "round" }).addTo(m);
    m.flyToBounds(route.current.getBounds(), { padding: [48, 48], duration: 0.8, maxZoom: 17 });
    // le repère glisse sous le curseur pendant le déplacement (mouseout) : on rouvre son étiquette à l'arrivée
    const open = () => markers.current[active]?.openTooltip();
    m.once("moveend", open);
    return () => {
      m.off("moveend", open);
    };
  }, [active, ready]);

  const pendingRow = useRef<HTMLElement | null>(null);
  const select = (i: number, row: HTMLElement) => {
    if (active === i) return setActive(null);
    pendingRow.current = row;
    setActive(i);
  };

  // une colonne : la carte est collée en haut, on cale la ligne choisie juste en dessous
  // (mesuré après le rendu, une fois la ligne précédente repliée)
  useLayoutEffect(() => {
    const row = pendingRow.current;
    pendingRow.current = null;
    const wrap = box.current?.parentElement;
    if (!row || !wrap || !window.matchMedia("(max-width: 999px)").matches) return;
    // bas de la carte une fois collée (elle peut encore défiler avec la page au moment du clic)
    const pinnedBottom = parseFloat(getComputedStyle(wrap).top) + wrap.offsetHeight;
    // la liste peut être encore en train d'apparaître (translateY de Reveal) : on vise sa position finale
    const reveal = row.closest(".reveal");
    const shift = reveal ? new DOMMatrix(getComputedStyle(reveal).transform).m42 : 0;
    const gap = row.getBoundingClientRect().top - shift - pinnedBottom - 12;
    if (Math.abs(gap) > 4) window.scrollBy({ top: gap, behavior: "smooth" });
  }, [active]);

  return (
    <section id="quartier" className={`section ${styles.neighbourhood}`}>
      <div className="container">
        <Reveal className="sectionHead">
          <p className="eyebrow">Le quartier</p>
          <h2 className="display">
            Tout <em>à pied</em>, ou presque.
          </h2>
          <p>
            À quelques minutes du centre historique de Pontoise, avec les commerces, les bus et la gare à
            portée de marche.
          </p>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.mapWrap}>
            <div ref={box} className={styles.map} role="region" aria-label="Carte du quartier" />
          </Reveal>

          <Reveal as="ol" className={styles.list} delay={0.1}>
            {PLACES.map((p, i) => {
              const { label, Icon } = KINDS[p.kind];
              return (
                <li key={p.name}>
                  <button
                    className={active === i ? styles.on : ""}
                    onClick={(e) => select(i, e.currentTarget)}
                    aria-expanded={active === i}
                  >
                    <span className={`${styles.num} ${styles[p.kind]}`}>{i + 1}</span>
                    <span className={styles.what}>
                      <strong>{p.name}</strong>
                      <small>
                        <Icon aria-hidden="true" /> {label} · {p.detail}
                      </small>
                    </span>
                    <span className={styles.walk}>
                      <Footprints aria-hidden="true" />
                      {p.walk} min
                    </span>
                  </button>
                  {active === i && (
                    <div className={styles.go}>
                      {p.walk >= BUS_FROM_MIN && (
                        <a
                          href={directions(p, "transit")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn primary"
                        >
                          <BusFront /> Trajet en bus
                        </a>
                      )}
                      <a
                        href={directions(p, "walking")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn ghost"
                      >
                        <Footprints /> Itinéraire à pied
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </Reveal>
        </div>
        <p className={styles.note}>
          Temps de marche calculés sur un itinéraire piéton depuis la maison. Les trajets en bus
          s&apos;ouvrent dans Google Maps, avec les lignes et horaires du moment.
        </p>
      </div>
    </section>
  );
}

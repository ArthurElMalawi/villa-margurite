// Calcule les itinéraires piétons maison → lieux (OSRM, données OpenStreetMap)
// et les enregistre dans src/data/routes.json. À relancer si PLACES change :
//   node scripts/fetch-routes.mjs
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("../src/data/villa.ts", import.meta.url), "utf8");
const home = src.match(/coords: \[([\d.]+), ([\d.]+)\] as/).slice(1).map(Number);
const places = [...src.matchAll(/\{ name: "([^"]+)".*?coords: \[([\d.]+), ([\d.]+)\], walk: (\d+)/g)].map(
  ([, name, la, lo, walk]) => ({ name, coords: [+la, +lo], walk: +walk })
);

const routes = {};
for (const p of places) {
  const url =
    `https://routing.openstreetmap.de/routed-foot/route/v1/foot/` +
    `${home[1]},${home[0]};${p.coords[1]},${p.coords[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url, { headers: { "User-Agent": "villa-marguerite-site/1.0" } });
  const { routes: [r] } = await res.json();
  // [lon, lat] → [lat, lon], arrondi à ~1 m
  routes[p.name] = r.geometry.coordinates.map(([lo, la]) => [+la.toFixed(5), +lo.toFixed(5)]);
  const min = Math.round(r.duration / 60);
  console.log(`${p.name}: ${Math.round(r.distance)} m, ${min} min${min !== p.walk ? `  ⚠ walk=${p.walk} dans villa.ts` : ""}`);
  await new Promise((s) => setTimeout(s, 500));
}

writeFileSync(new URL("../src/data/routes.json", import.meta.url), JSON.stringify(routes) + "\n");

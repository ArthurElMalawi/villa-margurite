"""Construit public/visite-3d/plan.html à partir de l'export brut du plan 3D
(ajoute le mode intégré, ?room= et le pilotage par postMessage).

    python scripts/build-plan.py ["chemin/vers/export.html"]
"""
import sys

src = sys.argv[1] if len(sys.argv) > 1 else "public/assets/3D-view/Plan 3D, 24 rue Victor Hugo.html"
dst = "public/visite-3d/plan.html"
s = open(src, encoding="utf-8").read()

# l'export est enveloppé dans un second document : on garde le document interne
start = s.index("<!doctype html>", 1)
end = s.rindex("</html>", 0, s.rindex("</html>")) + len("</html>")
s = s[start:end] + "\n"


def rep(old, new):
    global s
    assert s.count(old) == 1, (old, s.count(old))
    s = s.replace(old, new)


rep("<title>Plan 3D, 24 rue Victor Hugo</title>", """<title>Visite 3D · Villa Marguerite</title>
<script>
/* ?embed : intégré dans le site (titre masqué) · ?theme=light|dark · ?room=ch3 */
(() => { const q = new URLSearchParams(location.search), d = document.documentElement;
  if (q.has('embed')) d.classList.add('embed');
  const t = q.get('theme'); if (t === 'light' || t === 'dark') d.dataset.theme = t; })();
</script>""")

rep("@media (prefers-reduced-motion: reduce)", """.embed #head{display:none}
.embed #hint{top:calc(16px + env(safe-area-inset-top,0px))}
@media (prefers-reduced-motion: reduce)""")

rep("""  <h1>24 rue Victor Hugo</h1>
  <p>Colocation de 6 chambres. Seules les parties louées sont modélisées.</p>""",
    """  <h1>Villa Marguerite</h1>
  <p>24 rue Victor Hugo, Pontoise. Seules les parties louées sont modélisées.</p>""")

rep("b.className = 'room'; b.innerHTML", "b.className = 'room'; b.dataset.k = r.k; b.innerHTML")

rep("requestAnimationFrame(() => document.getElementById('loading').classList.add('done'));",
    """/* pilotage depuis le site : postMessage({ type: 'vm-3d:focus', room: 'ch3' }) ou ?room=ch3 */
function focusRoom(k) {
  const r = ROOMS.find(x => x.k === k && x.lab); if (!r) return false;
  setFloor(ORD.indexOf(r.f), false);
  document.querySelectorAll('.room').forEach(x => x.classList.toggle('on', x.dataset.k === k));
  flyTo([r.lab[0], FL[r.f].y + .6, r.lab[1]], 7.5, null, 1.2);
  return true;
}
window.addEventListener('message', (e) => {
  if (e.origin !== location.origin || !e.data || typeof e.data !== 'object') return;
  if (e.data.type === 'vm-3d:focus') focusRoom(e.data.room);
  if (e.data.type === 'vm-3d:floor') setFloor(+e.data.level);
});
const startRoom = new URLSearchParams(location.search).get('room');
if (startRoom) focusRoom(startRoom);
if (window.parent !== window) window.parent.postMessage({ type: 'vm-3d:ready' }, location.origin);
requestAnimationFrame(() => document.getElementById('loading').classList.add('done'));""")

open(dst, "w", encoding="utf-8", newline="\n").write(s)
print("ok", len(s))

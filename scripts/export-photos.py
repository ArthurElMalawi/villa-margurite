"""Exporte la sélection de photos vers public/assets/photos (redimensionnées, sans EXIF)
et vérifie qu'aucune photo n'apparaît en double, même sous un autre nom ou recadrée.

    python scripts/export-photos.py
"""
import os
import sys
from itertools import combinations

from PIL import Image, ImageOps

SRC = "public/assets/photos-all/Villa Margeritte Photos Cloud"
DST = "public/assets/photos"
MAX = 2000  # px, plus grand côté
DUP = 40    # distance dHash (sur 256 bits) en dessous de laquelle deux photos sont jugées identiques

# première photo = couverture
SELECTION = {
    # l'image d'accueil n'est reprise dans aucune galerie (salon 8 et 9 sont la même prise de vue)
    "hero": [("salon", "salon (7).jpeg")],
    "chambre-1": [("chambre 1", f"chambre 1 ({n}).{e}") for n, e in [(1, "jpeg"), (3, "jpeg"), (4, "jpeg"), (7, "JPG")]],
    "chambre-2": [("chambre 2", f"chambre 2 photo ({n}).{e}") for n, e in [(11, "JPG"), (10, "JPG"), (12, "JPG"), (7, "jpeg")]],
    "chambre-3": [("chambre 3", f"chambre 3 ({n}).jpeg") for n in (2, 1)],
    "chambre-4": [("chambre 4", f"chambre 4 ({n}).{e}") for n, e in [(1, "jpeg"), (2, "jpeg"), (3, "JPG")]],
    "chambre-5": [("chambre 5", f"chambre 5 avec salle de bain privative ({n}).JPG") for n in (1, 2, 5, 6, 8)],
    "chambre-6": [("chambre 6", f"chambre 6 ({n}).jpeg") for n in (2, 5, 1)],
    "salon": [("salon", f"salon ({n}).jpeg") for n in (10, 2, 1)],
    "cuisine": [("cuisine", f"cuisine ({n}).jpeg") for n in (1, 2)],
    "salles-de-bains": [("sdb 1", "salle de bain 1er étage (1).jpeg"), ("sdb 2", "salle de douche 1er étage.jpeg")],
    "jardin": [("jardin", "jardin (1).jpeg"), ("jardin", "jardin (3).jpeg"), ("jardin", "jardin (6).jpg")],
}


def dhash(im, n=16):
    px = im.convert("L").resize((n + 1, n)).load()
    return sum(1 << (y * n + x) for y in range(n) for x in range(n) if px[x, y] > px[x + 1, y])


def main():
    hashes = {}
    for group, items in SELECTION.items():
        os.makedirs(os.path.join(DST, group), exist_ok=True)
        for i, (folder, name) in enumerate(items, 1):
            im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, folder, name))).convert("RGB")
            im.thumbnail((MAX, MAX), Image.LANCZOS)
            out = os.path.join(DST, group, f"{i:02d}.jpg")
            im.save(out, "JPEG", quality=80, optimize=True, progressive=True)  # sans EXIF ni GPS
            hashes[f"{group}/{i:02d} ({name})"] = dhash(im)

    dups = [(a, b, d) for (a, ha), (b, hb) in combinations(hashes.items(), 2)
            if (d := bin(ha ^ hb).count("1")) <= DUP]
    for a, b, d in dups:
        print(f"DOUBLON d={d}: {a}  ==  {b}")
    print(f"{len(hashes)} photos exportées, {len(dups)} doublon(s)")
    sys.exit(1 if dups else 0)


if __name__ == "__main__":
    main()

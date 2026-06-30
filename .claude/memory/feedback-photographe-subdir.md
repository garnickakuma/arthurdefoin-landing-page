---
name: feedback-photographe-subdir
description: "Le fichier déployé par Cloudflare Pages est photographe/index.html, pas index.html à la racine"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 62437ea0-ec59-4dae-892c-4492497a5049
---

Toujours éditer `photographe/index.html` (et `photographe/landing/` pour le CSS), jamais le `index.html` à la racine du repo.

**Why:** Cloudflare Pages est configuré avec Root directory = `photographe`. Le `index.html` à la racine n'est jamais déployé. On a perdu plusieurs heures à cause de ça — tous les changements semblaient pushés mais rien n'apparaissait sur le site.

**How to apply:** Avant toute modif sur la landing page Arthur Defoin, vérifier que le chemin commence par `photographe/`. Pareil pour les CSS dans `photographe/landing/`.

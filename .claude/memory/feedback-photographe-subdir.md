---
name: feedback-photographe-subdir
description: "Cloudflare Pages sert la RACINE du repo — arthurdefoin.com/ = index.html racine (= la VSL depuis juillet 2026)"
metadata:
  node_type: memory
  type: reference
---

**Correction (juillet 2026) :** contrairement à ce qui était noté avant, Cloudflare Pages sert **la racine du repo**, pas `photographe/`. Chaque push sur `master` redéploie tout, et chaque sous-dossier est accessible en sous-chemin.

- **arthurdefoin.com/** = `index.html` à la **racine** = désormais la **[[project-vsl-landing]]** (media buyer, coachs/formateurs/thérapeutes).
- **arthurdefoin.com/photographe/** = l'ancienne landing « Publicité Meta pour photographes » (dossier `photographe/`, autonome avec son propre `photographe/landing/`).
- Autres sous-chemins : `/landing-guy-arnaud/`, `/esthetique/`, `/amour-et-lumiere/`, `/stellar-studio/`, etc.

**How to apply :** pour modifier la page d'accueil arthurdefoin.com, éditer le `index.html` **à la racine** (+ `assets/`, `mentions-legales.html`, `confidentialite.html` à la racine). Pour l'ancienne landing photographe, éditer `photographe/`. Voir [[reference-deployment]] (cache Cloudflare à purger si besoin) et [[feedback-wrangler-deploy]].

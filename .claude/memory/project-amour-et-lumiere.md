---
name: project-amour-et-lumiere
description: "Amour et Lumière — landing page client studio photo Bègles, tunnel réservation + paiement Stripe à intégrer"
metadata: 
  node_type: memory
  type: project
  originSessionId: 76581501-2785-4452-96cd-e80df6c6dc07
---

Client : **Amour et Lumière**, studio photo à **Bègles (Gironde)**.

**Modèle :** le client réserve ET paie directement dans la page (plus de "séance offerte"). Deux formules : **En studio / En extérieur**, chacune avec des packs (séance + photos retouchées). Tunnel de réservation modal jusqu'au paiement.

**Why:** Landing page avec e-commerce intégré, différent des autres clients.

## Fichiers
- Handoff : `Amouretlumiere/design_handoff_amour_et_lumiere/` (README.md + landing/ + assets/ + styles.css + tokens/)
- Construit dans : `amour-et-lumiere/` (React CDN + Babel, même stack que photographe/)
  - `index.html`, `reviews.json`, `fetch-reviews.js`, `assets/`, `workers/`
- Worker Cloudflare : `amour-et-lumiere/workers/` — sert les avis Google (wrangler.toml présent)

## Intégrations à brancher (pas encore fait)
1. **Avis Google** — Worker fetch les vrais avis depuis la fiche Google (fichier `fetch-reviews.js` + `reviews.json` comme cache)
2. **Stripe** — encaisser réellement le créneau (aujourd'hui simulé dans le prototype)

## How to apply
Quand on reprend ce projet, vérifier si Stripe et les avis Google ont été branchés. Le Worker est dans `amour-et-lumiere/workers/` avec son `wrangler.toml`.

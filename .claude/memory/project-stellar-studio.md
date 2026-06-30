---
name: project-stellar-studio
description: "Stellar Studio — landing page client, stack, fichiers, URL de dev, CMS prévu"
metadata: 
  node_type: memory
  type: project
  originSessionId: 76581501-2785-4452-96cd-e80df6c6dc07
---

Client : **Audran Sarzier**, photographe, studio 300 m² à Aubervilliers (93). Site pour vendre des séances photo studio aux artistes (chanteurs, rappeurs, danseurs, créateurs). CTA principal = WhatsApp.

**Promesse de marque :** « Votre image mérite une légende. » Identité dark, signature ambre/or, palette d'ambiances colorées (magenta, teal, blue, violet, red...).

**Why:** Premier client landing page externe (pas Arthur lui-même). Besoin de modifier textes et images fréquemment en autonomie.

## Fichiers

Dossier : `stellar-studio/` à la racine du repo.

Structure :
- `index.html` — entry point React CDN + Babel (même pattern que `landing-new/`)
- `tokens.css` — toutes les variables CSS du design system Stellar Studio
- `stellar.css` — styles globaux, animations, responsive
- `Header.jsx`, `Hero.jsx`, `Gallery.jsx`, `Advantages.jsx`, `Photographer.jsx`, `Pricing.jsx`, `Reviews.jsx`, `Studio.jsx`, `FinalCTA.jsx`, `Footer.jsx`, `App.jsx`
- `assets/` — `logo-stellar.png`, `audran-sarzier.png`, `gallery/` (8 photos)

Handoff source : `C:\Users\arthu\Downloads\STELLAR STUDIO\design_handoff_stellar_landing\`

## Sections (ordre)
Header fixe · Hero (2 col + stats) · Galerie mosaïque · Avantages · Photographe · Tarifs (carrousel snap) · Avis · Studio · CTA final · Footer · Bouton flottant WhatsApp

## Numéro WhatsApp
`33668019999` — **À confirmer avec Audran avant prod.**

## URL de dev
`https://master.stellar-studio-dev.pages.dev`
Projet Cloudflare Pages : `stellar-studio-dev` (deploy direct wrangler, pas connecté GitHub pour l'instant)

## CMS prévu (pas encore buildé)
Le client veut changer textes et images en autonomie → page `/admin` custom :
- **Cloudflare Worker** : API auth (mot de passe simple) + lecture/écriture contenu
- **Cloudflare KV** : stockage textes en JSON
- **Cloudflare R2** : stockage images uploadées
- La landing fetche le contenu depuis le Worker au chargement (plus de valeurs hardcodées)
- Admin = interface visuelle (grille images + formulaires texte), aucun GitHub côté client

**How to apply:** Quand on reprend le projet Stellar Studio, vérifier le numéro WhatsApp et proposer de builder le CMS si pas encore fait.

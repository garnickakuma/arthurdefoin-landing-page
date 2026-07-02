---
name: project-vsl-landing
description: "VSL landing page Arthur Defoin (media buyer) — dark mode, accent bleu, HTML/CSS/JS pur"
metadata:
  node_type: memory
  type: project
---

Landing **VSL** (Video Sales Letter) pour **Arthur Defoin media buyer**, qui installe des systèmes d'acquisition pour **coachs, thérapeutes et formateurs**. Objectif = conversion : regarder la vidéo puis réserver un appel (Calendly) ou laisser ses coordonnées (modal lead). Copy en français, tutoiement, sans emoji.

**Why:** Générer des RDV qualifiés via pub → VSL → appel stratégique.

## Source & construction
- Handoff Claude Design : `Downloads/design_handoff_vsl_landing/` (dézippé depuis `Downloads/c.zip`). README = source de vérité, hifi.
- Construit dans : `landing-vsl/index.html` (repo arthurdefoin-landing-page) — **HTML/CSS/JS pur, un seul fichier autonome**, comme [[project-guy-arnaud]]. Pas de React malgré le proto React/Babel du handoff.

## Direction artistique
- **Dark mode** : fond `#0B0E10`, cartes `#12171A`, void `#07090A`.
- **Accent bleu `#2A7FE6`** (le DS ship en emerald, override en bleu au :root via les tokens `--green-*`).
- Polices : **Space Grotesk** (titres) · **Geist** (corps) · **Geist Mono** (eyebrows/labels/chiffres, UPPERCASE ls 0.18em).
- Profondeur = hairline + glow, pas d'ombres lourdes. Radius 14/20/28px.

## Sections (single page)
Progress bar · bannière sticky · hero (h1 "Remplis ton agenda d'appels qualifiés." + vidéo VSL + CTA) · proof strip 3 stats animées · pour qui c'est (2 cartes ✓/✗, croix rouges) · système Atlas→Orion (connecteur animé) · offre + CTA (carte glow) · FAQ (3 items) · footer · modal capture de lead (ouvre au clic play).

## À brancher (placeholders)
- **Lien Calendly** : var `CALENDLY` en haut du `<script>` (défaut `calendly.com/arthur-defoin/appel-strategique`).
- **Vidéo VSL** : le bouton play ouvre la modal, pas de vraie vidéo encore.
- **Formulaire lead** : le submit passe juste à l'état succès — à câbler au CRM/email/webhook.

## How to apply
Éditer `landing-vsl/index.html` directement. Déploiement Cloudflare Pages via le repo (voir [[reference-deployment]] / [[feedback-wrangler-deploy]]).

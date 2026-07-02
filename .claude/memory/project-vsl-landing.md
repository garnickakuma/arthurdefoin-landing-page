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
- **En ligne à la RACINE = arthurdefoin.com** (depuis juillet 2026). Fichiers à la racine du repo : `index.html`, `assets/` (vidéos + poster), `mentions-legales.html`, `confidentialite.html`. **HTML/CSS/JS pur, un seul fichier autonome**, comme [[project-guy-arnaud]]. Pas de React malgré le proto React/Babel du handoff. (Voir [[feedback-photographe-subdir]] pour la structure de déploiement.)

## Direction artistique
- **Dark mode** : fond `#0B0E10`, cartes `#12171A`, void `#07090A`.
- **Accent bleu `#2A7FE6`** (le DS ship en emerald, override en bleu au :root via les tokens `--green-*`).
- Polices : **Space Grotesk** (titres) · **Geist** (corps) · **Geist Mono** (eyebrows/labels/chiffres, UPPERCASE ls 0.18em).
- Profondeur = hairline + glow, pas d'ombres lourdes. Radius 14/20/28px.

## Sections (single page)
Progress bar · bannière sticky · hero (h1 "Remplis ton agenda d'appels qualifiés." + vidéo VSL + CTA) · proof strip 3 stats animées · pour qui c'est (2 cartes ✓/✗, croix rouges) · système Atlas→Orion (connecteur animé) · offre + CTA (carte glow) · FAQ (3 items) · footer · modal capture de lead (ouvre au clic play).

## Tunnel de conversion (branché, en ligne)
Clic CTA « Réserver mon appel » → **formulaire de candidature** plein écran (questions d'abord, branded) → à l'envoi : POST vers **Google Apps Script** (`QUAL_ENDPOINT` dans le `<script>`) qui écrit dans le Google Sheet **« Candidatures VSL »** + envoie un email à defoin.arthur@gmail.com → redirection **Calendly** (`CALENDLY` = `calendly.com/defoin-arthur/accompagnement-arthur`, prénom+email pré-remplis) → choix du créneau.
- Ordre « questions-first » fait maison car le Routing Form Calendly est payant. Les 9 questions sont donc sur la landing (à retirer de l'event Calendly pour éviter le doublon).
- L'ancienne modal de capture de lead a été **supprimée**.

## Vidéos (dans landing-vsl/assets/, hébergées dans le repo)
- `vsl.mp4` : VSL du hero, **compressée** 1080p/12Mbps → 720p/~1Mbps (230Mo → 23Mo) avec ffmpeg 2 passes, pour passer sous la limite 25Mo de Cloudflare Pages. Se lit au clic (son + controls natifs). Original 1080p gardé en local `vsl-source.mp4` (gitignore).
- `tunnel-de-vente.mp4` : boucle autoplay muette dans la section méthode (1,8Mo).
- ffmpeg installé via winget (`Gyan.FFmpeg`).

## How to apply
Éditer `landing-vsl/index.html` directement. Déploiement Cloudflare Pages via le repo (voir [[reference-deployment]] / [[feedback-wrangler-deploy]]).

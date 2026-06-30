---
name: project-guy-arnaud
description: "Guy Arnaud — landing page client photographe portrait/famille, Portes-lès-Valence, séance offerte"
metadata: 
  node_type: memory
  type: project
  originSessionId: 76581501-2785-4452-96cd-e80df6c6dc07
---

Client : **Guy Arnaud**, photographe portrait/famille/grossesse/nouveau-né à **Portes-lès-Valence**.

**Argument central :** la séance est offerte, le client ne paie que les photos qu'il aime. CTA unique = réservation Fotostudio : `https://www.fotostudio.io/client/res/guyarnaud`

**Why:** Landing page marketing pour remplir son carnet de séances.

## Fichiers
- Handoff : `Guy Arnaud landing page/design_handoff_landing_page/` (README.md + Landing.dc.html + assets)
- Construit dans : `landing-guy-arnaud/` (HTML + CSS simple, **pas React** — stack légère)
  - `index.html`, `styles.css`, `assets/`, `logo.png`, `Guy Arnaud.jpg`

## Direction artistique
Style élégant minimaliste, beaucoup de blanc chaud. **Border-radius: 0 partout** (carré).
- Fond papier `#FBF8F3`, fond crème `#F4EDE2`
- Accent **bleu nuit `#23234F`** (remplace le doré d'origine du design system)
- Polices : **Cormorant Garamond** (titres, italic pour mots accentués) · **Manrope** (corps) · **Pinyon Script** (signature) · **JetBrains Mono** (chiffres/prix) · **Roboto** (section avis, DA Google)
- Max-width 1200px, radius 0, ombres douces et chaudes

## How to apply
Stack HTML+CSS pure (pas de JSX). Si modification demandée, éditer `landing-guy-arnaud/index.html` et `styles.css` directement.

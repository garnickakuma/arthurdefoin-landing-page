---
name: project-landing-page
description: "Landing page photographe — fichier photographe/index.html, stack, design crème/or, structure funnel, constantes (web3forms, Calendly, Pixel)."
metadata:
  node_type: memory
  type: project
  originSessionId: f1c469c5-dfec-48a7-b4c0-576d23ae2230
---

Arthur Defoin est photographe (studio "Amour et Lumière") ET media buyer Meta Ads pour photographes. Ce projet est sa landing page pour acquérir des clients photographes pour ses services de pub Meta.

**Pourquoi :** convertir le trafic des campagnes Meta en appels de découverte.

**Comment l'appliquer :** Le fichier RÉELLEMENT déployé et à éditer est `photographe/index.html` (PAS le `index.html` racine — voir [[feedback-photographe-subdir]]). Racine git = un niveau au-dessus de `photographe/`, donc commit avec `git add "photographe/index.html"`.

## Deux sites (même repo, même stack)
- **SITE 1 — photographe.arthurdefoin.com** : ce projet, `photographe/index.html`. Cloudflare Pages Root directory = `photographe`.
- **SITE 2 — institut.arthurdefoin.com** : projet séparé (centres esthétiques), sert de référence design. Même stack React CDN, même palette crème/or/serif.

## Stack
- React 18 via CDN + Babel Standalone (JSX in-browser, PAS de build step)
- Calendly inline embed : `https://calendly.com/defoin-arthur/accompagnement-arthur`
- Meta Pixel ID : `875967245522285`
- Formulaire : web3forms, access_key `8ff579b2-c217-4683-95bf-49ccd0b57c4d`

## Design (palette actuelle — PAS la vieille "Variante B violette")
- Crème/beige `#F5F1E8`, or `#B8963E`
- Serif Cormorant Garamond + sans Manrope

## Structure de la page
Bandeau → Nav → VSL placeholder → Hero → Section "Votre partenaire" → Section éligibilité → Studio (agenda + galerie) → Footer.

## Funnel de qualification (popup modale au clic sur n'importe quel CTA)
Spécialité → Ancienneté → Réservations → CA → Pub Meta → Objectif (tags CA en or) → Contact → Calendly inline embed.

## Ne pas toucher
- CSS studio/agenda importé depuis `photographe/landing/landing.css` (gros fichier 90 Ko) — NE PAS MODIFIER.
- Les `.jsx` et variantes CSS de thème dans `landing/` sont des sources d'un ancien design React, pas le rendu réel.

## Déploiement
Cloudflare Pages auto-deploy depuis GitHub `master` (~1 min après push). Si modifs invisibles → purger cache Cloudflare. Voir [[reference-deployment]] et [[feedback-always-push]].

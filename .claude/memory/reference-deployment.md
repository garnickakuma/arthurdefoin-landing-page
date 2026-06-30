---
name: reference-deployment
description: Comment arthurdefoin.com est déployé — Cloudflare Pages connecté au repo GitHub
metadata: 
  node_type: memory
  type: reference
  originSessionId: 62437ea0-ec59-4dae-892c-4492497a5049
---

Le site `arthurdefoin.com` est hébergé sur **Cloudflare Pages**, connecté au repo GitHub `garnickakuma/arthurdefoin-landing-page`.

Chaque push sur `master` déclenche un redéploiement automatique.

**Problème de cache :** Cloudflare peut mettre `index.html` en cache et servir l'ancienne version.
- Fix immédiat : Cloudflare dashboard → Caching → Purge Cache → Purge Everything
- Fix permanent : fichier `_headers` à la racine du repo (déjà en place depuis juin 2026)

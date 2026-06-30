---
name: feedback-shopify-push-path
description: "Toujours spécifier --path pour shopify theme push, sinon le CLI tourne depuis le mauvais dossier et efface tout le thème remote"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a8e79bfb-b4e7-4e94-a066-f16256cfe9fc
---

Toujours utiliser `--path` avec `shopify theme push` et `shopify theme pull`.

**Why:** Sans `--path`, le CLI prend le répertoire de travail courant (`e:\arthurdefoin landing page`) au lieu du dossier du thème (`...\barbara-style-final`). Il uploade 0 fichier et efface tout le thème remote (sauf les 4 fichiers protégés), ce qui cause un 404 sur tout le site.

**How to apply:** Commande correcte :
```
shopify theme push --store barbara-style-9610.myshopify.com --theme 186250133832 --allow-live --path "e:\arthurdefoin landing page\barbara-style\barbara-style-final"
```
Ajouter `--nodelete` si on veut être prudent (pas de suppression de fichiers remote).

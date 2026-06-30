---
name: feedback-shopify-pull-first
description: "Toujours pull le thème Shopify avant de faire une modification locale, pour ne pas écraser les changements manuels de l'utilisateur"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a8e79bfb-b4e7-4e94-a066-f16256cfe9fc
---

Toujours faire un `shopify theme pull` avant toute modification de fichier du thème.

**Why:** L'utilisateur peut faire des changements dans l'éditeur Shopify en ligne. Si on modifie et push sans pull d'abord, ses changements sont écrasés.

**How to apply:** Avant chaque session de modifications, commencer par :
```
shopify theme pull --store barbara-style-9610.myshopify.com --theme 186250133832 --path "e:\arthurdefoin landing page\barbara-style\barbara-style-final"
```
Puis faire les modifications, puis pusher avec :
```
shopify theme push --store barbara-style-9610.myshopify.com --theme 186250133832 --allow-live --path "e:\arthurdefoin landing page\barbara-style\barbara-style-final"
```

---
name: feedback-wrangler-deploy
description: wrangler pages deploy permet de déployer sans passer par le dashboard Cloudflare — wrangler est déjà auth sur la machine
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 76581501-2785-4452-96cd-e80df6c6dc07
---

`wrangler pages deploy <dossier> --project-name <nom>` déploie directement sur Cloudflare Pages sans aucune manipulation dans le dashboard. Wrangler est déjà authentifié sur la machine d'Arthur (auth faite lors du setup Workers amour-et-lumiere).

**Workflow :**
1. `npx wrangler pages project create <nom> --production-branch main` (une seule fois)
2. `npx wrangler pages deploy <dossier> --project-name <nom> --commit-dirty=true`
→ URL `*.pages.dev` disponible immédiatement.

**Why:** Découvert lors du deploy de stellar-studio. Pas besoin de connecter GitHub dans le dashboard pour avoir une URL de dev. Arthur pensait qu'il fallait le faire manuellement comme pour les autres landing pages — en réalité c'est parce que les autres utilisaient le flow GitHub auto-deploy (différent).

**Différence des deux flows :**
- `wrangler pages deploy` = upload direct, URL immédiate, pas de CI/CD auto
- GitHub → Cloudflare Pages dashboard = redeploy auto à chaque push, nécessite setup manuel une fois

**How to apply:** Pour toute nouvelle landing page client en dev rapide, utiliser `wrangler pages deploy`. Pour un site en prod avec CI/CD, connecter GitHub dans le dashboard.

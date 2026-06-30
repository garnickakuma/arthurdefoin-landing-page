---
name: reference-handoff-format
description: Format de handoff design utilisé pour les landing pages clients — fichier .dc.html + README.md
metadata: 
  node_type: memory
  type: reference
  originSessionId: 76581501-2785-4452-96cd-e80df6c6dc07
---

Les handoffs de landing pages clients arrivent sous forme d'un ZIP contenant :
- `README.md` — description complète : sections, design tokens, assets, interactions, responsive, state management. C'est la **source de vérité** à lire en premier.
- `*.dc.html` — prototype HTML du design (format "Design Component"). **Ne pas copier tel quel** — c'est une référence visuelle, pas du code de production. Ignorer les balises `<x-dc>`, `<x-import>`, `<sc-for>`, `<helmet>`, `<script type="text/x-dc">`.
- `assets/` — logo, images, photos.
- Un fichier `*standalone.html` peut aussi être présent = export PDF/HTML du prototype, inutilisable directement.

**How to apply:** À la réception d'un handoff client, lire le README en entier avant de coder. Le README contient tout : tokens CSS, breakpoints, comportements d'interaction, contenu texte complet, liste des assets.

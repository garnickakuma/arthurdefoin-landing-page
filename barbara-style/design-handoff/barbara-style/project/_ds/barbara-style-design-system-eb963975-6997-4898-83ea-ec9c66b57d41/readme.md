# Barbara Style — Design System

> **Barbara Style** — bijoux et cache-boutons pour femme. Marque française premium, univers ensoleillé, féminin et élégant. *Côte d'Azur chic* : des bijoux qui scintillent au soleil, de la légèreté, du plaisir — premium mais à petits prix, jamais vulgaire.

Ce dépôt est le système de design de la marque : fondations visuelles (couleurs, typographie, espacement), composants React réutilisables, et un UI kit de la boutique en ligne.

**Cible** : femme 25–45 ans, moderne, qui aime se faire plaisir avec de belles pièces accessibles.
**Mots-clés** : Solaire · Féminin · Lumineux · Épuré · Raffiné.

## Sources
Aucun codebase ni fichier Figma n'a été fourni — ce système a été créé **de zéro** à partir du brief de marque. Les visuels produits (mannequins, ambiances) sont destinés à être **générés en IA** : style vintage doré, lumière naturelle chaude, grain film. Les emplacements d'images dans l'UI kit sont des placeholders (dégradés chauds) à remplacer par ces visuels.

---

## FONDAMENTAUX DE CONTENU (ton & copie)

La voix de Barbara est **chaleureuse, complice et solaire**, jamais racoleuse. On parle à une amie de bon goût.

- **Langue** : français. Vouvoiement doux (« pour celles qui aiment se faire plaisir »), souvent tourné à la 3ᵉ personne (« celles qui… ») ou en « nous » discret pour la marque.
- **Casse** : titres en **bas-de-casse élégant** (serif). Les sur-titres et boutons en **CAPITALES espacées** (`letter-spacing` large). Jamais de SHOUTING en plein texte.
- **Ponctuation française** : espace insécable avant `: ; ! ?` et autour des `« »`. Prix au format français : **24,90 €** (virgule décimale, espace avant €).
- **Registre** : sensoriel et léger — *lumière, soleil, scintiller, éclat, plaisir, légèreté, douceur*. On évoque la matière (plaqué or, nacre) et l'émotion, pas la performance technique.
- **Longueur** : court. Une accroche serif + une phrase. On laisse respirer.
- **Émoji** : **non**. Le raffinement passe par la typographie et l'or, pas les émoji.
- **Exemples** :
  - Sur-titre : `NOUVELLE COLLECTION · ÉTÉ`
  - Accroche : *« Scintiller au soleil »* · *« Lumière d'Azur »*
  - Sous-titre : « Des pièces qui attrapent la lumière, pensées pour celles qui aiment se faire plaisir. »
  - Bouton : `AJOUTER AU PANIER` · `DÉCOUVRIR LA COLLECTION`
  - Argument : « Imaginé en France · Plaqué or fin · Petits prix »
- **À éviter** : superlatifs creux (« incroyable »), urgence agressive (« DERNIÈRE CHANCE !!! »), anglicismes inutiles, jargon.

---

## FONDATIONS VISUELLES

L'identité repose sur un **canevas blanc pur et lumineux**, réchauffé de crème, ponctué d'**or solaire** et adouci de **rose poudré**. Beaucoup d'air, peu d'éléments, finitions soignées.

### Couleurs
- **Neutres chauds** : blanc pur `#ffffff`, lin `--linen-100` (fond de page), crème `--cream-300` (panneaux doux), sable.
- **Or solaire** (signature) : `--gold-400 #cda152` pour les actions et accents ; or pâle `--gold-200` pour les halos ; or bruni `--gold-500` pour le texte doré sur clair.
- **Rose poudré** (féminin) : `--rose-300 #ecc9c2`, voiles tendres et accents doux.
- **Encre** : espresso chaud `--ink-900 #2a2018` pour le texte — **jamais de noir pur ni de gris froid**.
- **Sémantique** : vert sauge `--success`, terre cuite `--danger` (et promos).

### Typographie
- **Display — Cormorant Garamond** (serif haute en contraste) : titres, hero, prix, citations. Graisses 300/500. L'**italique en or** sert d'accent précieux.
- **Texte — Jost** (sans géométrique, esprit Futura/Riviera) : interface, paragraphes, libellés. 300/400/500.
- **Signature** : le **sur-titre en capitales très espacées** (`--ls-eyebrow: .26em`) + un **filet doré** court (`.bs-rule`).

### Espacement & layout
- Échelle base 4 (`--space-*`). Respirations de section généreuses (64–128 px). Conteneur 1240 px.
- Grilles produits aérées, gouttières larges. On préfère le vide au remplissage.

### Fonds, imagerie & texture
- Fonds **unis** : blanc pur ou lin lumineux ; panneaux crème ou rosés pour rythmer. **Pas** de dégradés tape-à-l'œil bleu/violet.
- **Imagerie** : photos vintage dorées, lumière chaude, **grain film** (`.bs-grain`) et **voile de protection chaud** (`.bs-warm-veil`) pour poser le texte. Ambiance Côte d'Azur, mannequins féminins, peau dorée.
- Texture discrète possible : grain, jamais de motif chargé.

### Rayons, ombres, bordures
- **Rayons** doux mais discrets : `md 8px` (cartes, champs), `lg 14px` (panneaux), **pilule** pour boutons et pastilles. Pas de gros arrondis « bonbon ».
- **Ombres chaudes & diffuses**, teintées sable (jamais gris pur). `--shadow-glow` = **halo solaire doré** au survol des pièces phares.
- **Bordures** : filets très fins (`--line-hairline`), souvent crème ou or. Filet `--border-ink` pour le contraste.

### Mouvement & états
- **Animation** : douce, jamais rebondissante. `--ease-out`, durées 140–420 ms. Fondus et légers `translateY`. Pas de boucles décoratives infinies.
- **Survol** : assombrissement léger (or → or profond), halo doré sur les cartes, soulèvement de 4 px, image qui zoome doucement (1.04).
- **Press** : translation de 1 px vers le bas (jamais de gros shrink).
- **Focus** : anneau doré translucide `rgba(205,161,82,.16)` + filet or.
- **Transparence/flou** : parcimonieux — bouton favori en verre dépoli sur les visuels.

---

## ICONOGRAPHIE
- **Jeu d'icônes : Lucide** (trait fin ~1.4, arrondi) — cohérent avec la finesse de la marque. Chargé depuis CDN dans les UI kits, ou redessiné inline en SVG fin pour les composants (cœur, panier, recherche, compte, étoile).
  - ⚠️ **Substitution** : Lucide est un choix par défaut, à confirmer. Si la marque possède un jeu d'icônes propre, le déposer dans `assets/` et l'indiquer ici.
- **Étoiles** (notes) : étoile pleine dorée `--gold-400` sur fond sable `--cream-400`, demi-valeurs gérées par clip.
- **Monogramme** : un **soleil fin** (`assets/monogram-sun.svg`) — cercle + rayons, trait or. Sert de mark/favicon.
- **Émoji** : jamais. **Unicode** : on tolère le séparateur `·` (point médian) et les `« »`.

---

## INDEX DU DÉPÔT

**Racine**
- `styles.css` — point d'entrée global (uniquement des `@import`). Les projets consommateurs lient ce fichier.
- `readme.md` — ce guide.
- `SKILL.md` — manifeste Agent Skill (pour usage hors-plateforme).

**`tokens/`** — fondations CSS
- `fonts.css` (webfonts), `colors.css`, `typography.css`, `spacing.css` (espacement + rayons + ombres + mouvement), `base.css` (défauts + utilitaires `.bs-eyebrow`, `.bs-rule`, `.bs-grain`, `.bs-warm-veil`).

**`guidelines/`** — fiches spécimens (Design System tab) : couleurs (or, rose, neutres, encre), type (display, body, sur-titre, échelle), espacement (échelle, rayons, ombres), marque (logo, imagerie).

**`assets/`** — `logo-wordmark.svg`, `monogram-sun.svg`.

**`components/`** — primitives React réutilisables
- `forms/` : **Button**, **IconButton**, **Input**, **Checkbox**
- `commerce/` : **ProductCard**, **Badge**, **PriceTag**, **Rating**, **QuantityStepper**

**`ui_kits/`**
- `boutique/` — recréation de la boutique en ligne (accueil, collection, fiche produit, panier).

### Points de départ (Starting Points)
- **ProductCard** (Commerce) · **Button** (Formulaires) · écrans de la boutique.

---

## Substitution de polices (à confirmer)
Les polices sont chargées via **Google Fonts CDN** (Cormorant Garamond + Jost), non auto-hébergées. Si vous disposez de fichiers de police sous licence, fournissez-les pour auto-hébergement et remplacez les `@import` de `tokens/fonts.css` par des `@font-face`.

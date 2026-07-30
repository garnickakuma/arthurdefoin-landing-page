# Rapport quotidien Amour et Lumière

Chaque matin, un email arrive avec : **dépense pub (Meta)**, **nombre de vraies
réservations (Cal.com)**, **coût par résa**, et un **récap 7 jours**.

Ça tourne tout seul via GitHub Actions (gratuit). Rien à laisser allumé sur ton PC.

---

## Ce que tu dois faire une seule fois : les 6 secrets

Va sur le repo GitHub → **Settings → Secrets and variables → Actions → New repository secret**.
Crée ces 6 secrets (nom exact à gauche, valeur à droite) :

| Nom du secret | Valeur | Où la trouver |
|---|---|---|
| `META_ACCESS_TOKEN` | le jeton d'accès Meta | voir §1 |
| `META_AD_ACCOUNT_ID` | `act_XXXXXXXXX` | voir §1 |
| `CAL_API_KEY` | `cal_live_...` | voir §2 |
| `BREVO_API_KEY` | `xkeysib-...` | voir §3 |
| `REPORT_TO_EMAIL` | ton email (ex: `defoin.arthur@gmail.com`) | — |
| `REPORT_FROM_EMAIL` | un expéditeur validé dans Brevo (ex: `rapport@amour-et-lumiere.com`) | voir §3 |

### §1 — Meta (dépense pub)

1. **ID du compte pub** : dans Ads Manager, en haut, ton compte affiche un numéro
   `123456789`. Le secret vaut `act_123456789` (préfixe `act_` + le numéro).
2. **Jeton** : le plus solide = un **jeton de System User** (n'expire jamais) :
   - business.facebook.com → **Paramètres d'entreprise** → **Utilisateurs → Utilisateurs système**
   - Crée un utilisateur système (rôle *Admin* ou *Employé*), assigne-lui **ton compte publicitaire** avec l'accès *Voir les performances*.
   - **Générer un jeton** → coche la permission **`ads_read`** → copie le jeton.
   - ⚠️ Le jeton ne s'affiche qu'une fois : colle-le direct dans le secret `META_ACCESS_TOKEN`.
   - (Alternative rapide mais le jeton expire sous 60 j : Graph API Explorer avec `ads_read`.)

### §2 — Cal.com (réservations)

- app.cal.com → **Settings → Developer → API keys → Add** → copie la clé (`cal_live_...`).

### §3 — Brevo (envoi de l'email)

- app.brevo.com → **SMTP & API → API Keys → Generate a new API key** → copie (`xkeysib-...`).
- Expéditeur : dans Brevo → **Senders**, assure-toi d'avoir un expéditeur validé sur
  ton domaine (ex: `rapport@amour-et-lumiere.com`). Mets-le dans `REPORT_FROM_EMAIL`.
  (Le domaine est déjà authentifié DKIM chez Brevo, donc n'importe quelle adresse
  `@amour-et-lumiere.com` passe.)

---

## Tester tout de suite (sans attendre demain matin)

Repo GitHub → onglet **Actions** → *Rapport quotidien Amour et Lumière* →
**Run workflow**. Laisse la date vide pour reporter hier, ou saisis un jour précis
(`2026-07-30`) pour tester sur une journée où tu sais qu'il y a eu des résa.

Tu dois recevoir l'email en ~30 s. Si le workflow est rouge, ouvre-le : le log dit
précisément quel accès coince.

---

## Réglages faciles

- **Heure d'envoi** : dans `.github/workflows/daily-report.yml`, la ligne
  `cron: "0 6 * * *"` = 06:00 UTC. Change le `6` pour une autre heure (UTC → Paris = +1h l'hiver, +2h l'été).
- **Statuts comptés comme résa** : variable `RESA_OK` dans `daily_report.py`.

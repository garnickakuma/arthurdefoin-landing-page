# DNS de amour-et-lumiere.com — relevé du 20 juillet 2026

Relevé **avant** toute migration. À recréer à l'identique si les serveurs de
noms changent, sinon l'e-mail et la délivrabilité tombent.

## Serveurs de noms actuels
```
ns10.wixdns.net
ns11.wixdns.net
```

## ⚠️ E-MAIL — Google Workspace (à recréer EN PREMIER)

Sans ces cinq lignes, les e-mails @amour-et-lumiere.com cessent d'arriver.

| Type | Nom | Valeur | Priorité |
|---|---|---|---|
| MX | @ | `aspmx.l.google.com` | 1 |
| MX | @ | `alt1.aspmx.l.google.com` | 5 |
| MX | @ | `alt2.aspmx.l.google.com` | 5 |
| MX | @ | `alt3.aspmx.l.google.com` | 10 |
| MX | @ | `alt4.aspmx.l.google.com` | 10 |

## TXT — délivrabilité et vérifications

| Nom | Valeur |
|---|---|
| @ | `v=spf1 include:_spf.google.com ~all` |
| @ | `google-site-verification=sbT1ql2VIRVyUxEIoQjzDB1qjAiYMZoNMQP8rKRmbPQ` |
| @ | `brevo-code:bc08c73c30ba62372c8b529c791d8aca` |
| `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |

> Les trois TXT du domaine racine doivent coexister : Google et Brevo vérifient
> chacun la leur. En supprimer une casse une vérification.

## Sous-domaines

| Nom | Type | Valeur | État |
|---|---|---|---|
| `seance` | CNAME | `amour-et-lumiere.pages.dev` | ✅ la landing, fonctionne |
| `www` | CNAME | `cdn1.wixdns.net` | ❌ renvoie 404 |
| `@` (racine) | — | Wix | ❌ renvoie une erreur « ConnectYourDomain » |

## Constat

**Aucun site n'est en ligne sur le domaine principal.** Ni la racine ni le www.
Il n'y a donc rien à préserver côté web — seulement l'e-mail.

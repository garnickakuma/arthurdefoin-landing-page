-- Créneaux de séance photo (Bègles et Arcachon)
-- Un créneau = une demi-heure ouverte à la réservation.
-- etat : libre | attente (paiement en cours) | reserve | bloque
CREATE TABLE IF NOT EXISTS creneaux (
  id            TEXT PRIMARY KEY,          -- begles-2026-09-12-1130
  site          TEXT NOT NULL,             -- begles | arcachon
  jour          TEXT NOT NULL,             -- 2026-09-12
  heure         TEXT NOT NULL,             -- 11:30
  duree         INTEGER NOT NULL DEFAULT 30,
  etat          TEXT NOT NULL DEFAULT 'libre',
  attente_fin   TEXT,                      -- fin de la réservation temporaire pendant le paiement
  nom           TEXT,
  email         TEXT,
  tel           TEXT,
  formule       TEXT,                      -- mini | complete
  message       TEXT,
  stripe_id     TEXT,
  reserve_le    TEXT,
  cree_le       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_site_jour ON creneaux (site, jour);
CREATE INDEX IF NOT EXISTS idx_etat ON creneaux (etat);

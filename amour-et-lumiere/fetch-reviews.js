/**
 * Script de build — récupère les avis Google Places et génère reviews.json
 * Utilise la Places API (New) — v1
 *
 * Variables d'environnement requises :
 *   GOOGLE_PLACES_API_KEY  — clé API Google Cloud (Places API New activée)
 *   GOOGLE_PLACE_ID        — Place ID de la fiche Google
 *
 * Build command Cloudflare Pages : node fetch-reviews.js
 * Output directory               : .   (racine de amour-et-lumiere/)
 */

import { writeFileSync } from 'fs';

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;

if (!PLACE_ID || !API_KEY) {
  console.warn('GOOGLE_PLACE_ID ou GOOGLE_PLACES_API_KEY non defini — reviews.json laisse intact');
  process.exit(0);
}

const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
  },
});

const data = await res.json();

if (!res.ok) {
  console.error('Places API :', data.error?.message ?? res.status);
  process.exit(1);
}

const reviews = (data.reviews ?? []).map(r => ({
  name:   r.authorAttribution?.displayName ?? 'Anonyme',
  text:   r.text?.text ?? '',
  rating: r.rating,
  time:   r.relativePublishTimeDescription ?? '',
}));

const out = {
  rating:    data.rating             ?? null,
  total:     data.userRatingCount    ?? 0,
  reviews,
  fetchedAt: new Date().toISOString(),
};

writeFileSync('reviews.json', JSON.stringify(out, null, 2));
console.log(`${reviews.length} avis ecrits (note globale : ${out.rating}/5 - ${out.total} avis)`);

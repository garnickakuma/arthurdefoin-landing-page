/**
 * Script de build — récupère les avis Google Places et génère reviews.json
 *
 * Variables d'environnement requises (Cloudflare Pages → Settings → Variables) :
 *   GOOGLE_PLACES_API_KEY  — clé API Google Cloud (Places API activée)
 *   GOOGLE_PLACE_ID        — Place ID de la fiche Google (voir README ci-dessous)
 *
 * Trouver le Place ID :
 *   1. Ouvrir Google Maps et rechercher "Amour et Lumière Bègles"
 *   2. Dans l'URL : maps.google.com/maps/place/.../@.../data=...!1s<PLACE_ID>!...
 *      Ou : https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 *
 * Build command Cloudflare Pages : node fetch-reviews.js
 * Output directory               : .   (racine de amour-et-lumiere/)
 */

import { writeFileSync } from 'fs';

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;

if (!PLACE_ID || !API_KEY) {
  console.warn('⚠️  GOOGLE_PLACE_ID ou GOOGLE_PLACES_API_KEY non défini — reviews.json laissé intact');
  process.exit(0);
}

const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
url.searchParams.set('place_id', PLACE_ID);
url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews');
url.searchParams.set('language', 'fr');
url.searchParams.set('reviews_sort', 'newest');
url.searchParams.set('key', API_KEY);

const res  = await fetch(url.toString());
const data = await res.json();

if (data.status !== 'OK') {
  console.error('Places API :', data.status, data.error_message ?? '');
  process.exit(1);
}

const reviews = (data.result.reviews ?? []).map(r => ({
  name:   r.author_name,
  text:   r.text,
  rating: r.rating,
  time:   r.relative_time_description,
}));

const out = {
  rating:    data.result.rating             ?? null,
  total:     data.result.user_ratings_total ?? 0,
  reviews,
  fetchedAt: new Date().toISOString(),
};

writeFileSync('reviews.json', JSON.stringify(out, null, 2));
console.log(`✅  ${reviews.length} avis écrits (note globale : ${out.rating}/5 · ${out.total} avis)`);

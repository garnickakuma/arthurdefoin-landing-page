#!/usr/bin/env python3
"""
Rapport quotidien Amour et Lumière.

Chaque matin : dépense publicitaire Meta + nombre de vraies réservations Cal.com
sur la journée écoulée, coût par réservation, et un récap 7 jours. Envoyé par
email via Brevo.

Toutes les valeurs sensibles arrivent par variables d'environnement (secrets
GitHub) — rien n'est écrit en dur ici.
"""

import os
import sys
import json
import datetime
import requests
from zoneinfo import ZoneInfo

PARIS = ZoneInfo("Europe/Paris")

# --- Accès (secrets) ---------------------------------------------------------
META_TOKEN   = os.environ.get("META_ACCESS_TOKEN", "")
AD_ACCOUNT   = os.environ.get("META_AD_ACCOUNT_ID", "")   # ex: act_123456789
CAL_API_KEY  = os.environ.get("CAL_API_KEY", "")
BREVO_KEY    = os.environ.get("BREVO_API_KEY", "")
REPORT_TO    = os.environ.get("REPORT_TO_EMAIL", "defoin.arthur@gmail.com")
REPORT_FROM  = os.environ.get("REPORT_FROM_EMAIL", REPORT_TO)
META_VERSION = os.environ.get("META_API_VERSION", "v21.0")

# Statuts Cal qui comptent comme une vraie résa (on exclut annulé / refusé)
RESA_OK = {"accepted", "pending", "awaiting_host"}


def euros(v):
    """24.0 -> '24,00 €' (format français)."""
    return f"{v:.2f}".replace(".", ",") + " €"


def target_date():
    """Jour à reporter : hier (Paris), sauf override REPORT_DATE=YYYY-MM-DD."""
    override = os.environ.get("REPORT_DATE", "").strip()
    if override:
        return datetime.date.fromisoformat(override)
    now = datetime.datetime.now(PARIS)
    return (now - datetime.timedelta(days=1)).date()


# --- Meta Ads ----------------------------------------------------------------
def meta_spend(since, until):
    """Dépense totale du compte pub entre deux dates incluses (float €)."""
    url = f"https://graph.facebook.com/{META_VERSION}/{AD_ACCOUNT}/insights"
    params = {
        "access_token": META_TOKEN,
        "level": "account",
        "time_range": json.dumps({"since": since.isoformat(), "until": until.isoformat()}),
        "fields": "spend",
    }
    r = requests.get(url, params=params, timeout=30)
    r.raise_for_status()
    data = r.json().get("data", [])
    return float(data[0]["spend"]) if data and data[0].get("spend") else 0.0


# --- Cal.com -----------------------------------------------------------------
def cal_bookings():
    """Toutes les réservations visibles par la clé API (liste de dicts)."""
    r = requests.get(
        "https://api.cal.com/v1/bookings",
        params={"apiKey": CAL_API_KEY},
        timeout=30,
    )
    r.raise_for_status()
    return r.json().get("bookings", [])


def resa_count(bookings, since, until):
    """Nombre de résa CRÉÉES entre since et until (Paris), hors annulées."""
    n = 0
    for b in bookings:
        created = b.get("createdAt")
        status = (b.get("status") or "").lower()
        if not created or status not in RESA_OK:
            continue
        dt = datetime.datetime.fromisoformat(created.replace("Z", "+00:00")).astimezone(PARIS)
        if since <= dt.date() <= until:
            n += 1
    return n


# --- Email -------------------------------------------------------------------
def build_html(day, spend, resa, spend7, resa7):
    def cpa(s, n):
        return euros(s / n) if n else "—"

    d_fr = day.strftime("%d/%m/%Y")
    return f"""\
<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#3a322c;">
  <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c2978f;margin:0 0 4px;">Amour et Lumière — Rapport pub</p>
  <h1 style="font-size:20px;margin:0 0 18px;color:#2b2521;">Journée du {d_fr}</h1>

  <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">
    <tr>
      <td style="padding:16px;background:#f6f1ec;border-radius:12px;text-align:center;width:33%;">
        <div style="font-size:24px;font-weight:700;color:#2b2521;">{euros(spend)}</div>
        <div style="font-size:12px;color:#8a7f74;margin-top:4px;">Dépensé</div>
      </td>
      <td style="width:8px;"></td>
      <td style="padding:16px;background:#f6f1ec;border-radius:12px;text-align:center;width:33%;">
        <div style="font-size:24px;font-weight:700;color:#2b2521;">{resa}</div>
        <div style="font-size:12px;color:#8a7f74;margin-top:4px;">Réservations</div>
      </td>
      <td style="width:8px;"></td>
      <td style="padding:16px;background:#efe7df;border-radius:12px;text-align:center;width:33%;">
        <div style="font-size:24px;font-weight:700;color:#c2978f;">{cpa(spend, resa)}</div>
        <div style="font-size:12px;color:#8a7f74;margin-top:4px;">Coût / résa</div>
      </td>
    </tr>
  </table>

  <p style="font-size:13px;color:#8a7f74;margin:0 0 6px;font-weight:600;">7 derniers jours</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:6px 0;color:#6e665b;">Dépense totale</td><td style="padding:6px 0;text-align:right;font-weight:600;">{euros(spend7)}</td></tr>
    <tr><td style="padding:6px 0;color:#6e665b;">Réservations</td><td style="padding:6px 0;text-align:right;font-weight:600;">{resa7}</td></tr>
    <tr><td style="padding:6px 0;color:#6e665b;">Coût / résa moyen</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#c2978f;">{cpa(spend7, resa7)}</td></tr>
  </table>

  <p style="font-size:11px;color:#b3a99d;margin-top:26px;">Rapport automatique · réservations = données réelles Cal.com · dépense = Meta Ads.</p>
</div>"""


def send_email(subject, html):
    r = requests.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={"api-key": BREVO_KEY, "content-type": "application/json"},
        json={
            "sender": {"name": "Rapport Amour et Lumière", "email": REPORT_FROM},
            "to": [{"email": REPORT_TO}],
            "subject": subject,
            "htmlContent": html,
        },
        timeout=30,
    )
    r.raise_for_status()


# --- Orchestration -----------------------------------------------------------
def main():
    day = target_date()
    since7 = day - datetime.timedelta(days=6)
    errors = []

    # Dépense (jour + 7 jours) — indépendant du reste
    try:
        spend = meta_spend(day, day)
        spend7 = meta_spend(since7, day)
    except Exception as e:  # noqa: BLE001
        errors.append(f"Meta : {e}")
        spend = spend7 = 0.0

    # Réservations (jour + 7 jours)
    try:
        bookings = cal_bookings()
        resa = resa_count(bookings, day, day)
        resa7 = resa_count(bookings, since7, day)
    except Exception as e:  # noqa: BLE001
        errors.append(f"Cal.com : {e}")
        resa = resa7 = 0

    subject = f"📊 {euros(spend)} · {resa} résa — {day.strftime('%d/%m')}"
    if errors:
        subject = "⚠️ Rapport partiel — " + day.strftime("%d/%m")

    html = build_html(day, spend, resa, spend7, resa7)
    if errors:
        html += (
            '<div style="font-family:Arial;max-width:520px;margin:12px auto;'
            'padding:12px;background:#fbeae6;border-radius:8px;color:#a3402f;font-size:13px;">'
            "Certaines données n'ont pas pu être récupérées :<br>"
            + "<br>".join(errors)
            + "</div>"
        )

    send_email(subject, html)
    print(f"OK — {day} : {euros(spend)}, {resa} résa. Erreurs: {errors or 'aucune'}")
    # On sort en erreur si tout a échoué, pour que GitHub le signale
    if len(errors) >= 2:
        sys.exit(1)


if __name__ == "__main__":
    main()

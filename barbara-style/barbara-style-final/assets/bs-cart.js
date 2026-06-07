'use strict';

const bsEur = (cents) => {
  const n = cents / 100;
  const e = Math.floor(n);
  const c = Math.round((n - e) * 100).toString().padStart(2, '0');
  return `${e},${c} €`;
};

const bsToast = (msg) => {
  const el = document.getElementById('bs-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
};

const FREE_SHIP = 3000;

const bsComputeOffer = (items) => {
  const qty = items.reduce((s, it) => s + it.qty, 0);
  let free = 0;
  if (qty >= 6) free = 2;
  else if (qty >= 3) free = 1;
  if (free === 0) return { qty, free: 0, freeValue: 0 };
  const prices = [...items].flatMap(it => Array(it.qty).fill(it.price)).sort((a, b) => a - b);
  const freeValue = prices.slice(0, free).reduce((s, p) => s + p, 0);
  return { qty, free, freeValue };
};

const bsNextStep = (qty) => {
  if (qty < 3) return { need: 3 - qty, tier: '2+1' };
  if (qty < 6) return { need: 6 - qty, tier: '4+2' };
  return null;
};

let bsCartItems = [];

const bsUpdateUI = () => {
  const offer = bsComputeOffer(bsCartItems);
  const subtotal = bsCartItems.reduce((s, it) => s + it.price * it.qty, 0);
  const afterOffer = subtotal - offer.freeValue;
  const remaining = Math.max(0, FREE_SHIP - afterOffer);
  const pct = Math.min(100, (afterOffer / FREE_SHIP) * 100);
  const totalQty = bsCartItems.reduce((s, it) => s + it.qty, 0);

  const badge = document.getElementById('bs-cart-count');
  if (badge) { badge.style.display = totalQty > 0 ? 'flex' : 'none'; badge.textContent = totalQty; }

  const shipText = document.getElementById('bs-shipping-text');
  const shipFill = document.getElementById('bs-shipping-fill');
  if (shipText) shipText.innerHTML = remaining > 0
    ? `Plus que <strong>${bsEur(remaining)}</strong> pour la livraison offerte`
    : `<strong>Livraison offerte</strong> !`;
  if (shipFill) shipFill.style.width = pct + '%';

  const offerText = document.getElementById('bs-offer-text');
  if (offerText) {
    const step = bsNextStep(offer.qty);
    if (offer.free > 0) {
      offerText.innerHTML = `<strong>Offre ${offer.free === 1 ? '2+1' : '4+2'}</strong> — ${offer.free} article${offer.free > 1 ? 's' : ''} offert${offer.free > 1 ? 's' : ''} (${bsEur(offer.freeValue)})`;
    } else if (step) {
      offerText.innerHTML = `Ajoutez <strong>${step.need}</strong> article${step.need > 1 ? 's' : ''} — offre <strong>${step.tier}</strong>`;
    } else {
      offerText.innerHTML = `2 achetes = 1 offert &nbsp;·&nbsp; 4 achetes = 2 offerts`;
    }
  }

  const offerRow = document.getElementById('bs-offer-row');
  const offerVal = document.getElementById('bs-offer-val');
  const offerLbl = document.getElementById('bs-offer-label');
  if (offerRow) {
    offerRow.style.display = offer.freeValue > 0 ? 'flex' : 'none';
    if (offerLbl) offerLbl.textContent = `Offre ${offer.free === 1 ? '2+1' : '4+2'}`;
    if (offerVal) offerVal.textContent = `− ${bsEur(offer.freeValue)}`;
  }

  const subEl = document.getElementById('bs-subtotal');
  if (subEl) {
    const e = Math.floor(afterOffer / 100);
    const c = Math.round((afterOffer / 100 - e) * 100).toString().padStart(2, '0');
    subEl.innerHTML = `<span style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:26px;">${e}<sup style="font-size:.5em;vertical-align:.65em;">${c}</sup><span style="font-size:.55em;"> €</span></span>`;
  }

  const itemsEl = document.getElementById('bs-cart-items');
  const emptyEl = document.getElementById('bs-cart-empty');
  if (!itemsEl) return;
  itemsEl.querySelectorAll('.bs-cart-item').forEach(el => el.remove());

  if (bsCartItems.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  bsCartItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'bs-cart-item';
    div.innerHTML = `
      <div class="bs-cart-item__img">${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}</div>
      <div class="bs-cart-item__info">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div class="bs-cart-item__type">${item.product_type || ''}</div>
            <div class="bs-cart-item__name">${item.title}</div>
          </div>
          <button class="bs-cart-item__remove" data-id="${item.id}" aria-label="Retirer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="bs-cart-item__bottom">
          <div class="bs-qty">
            <button class="bs-qty__btn" data-id="${item.id}" data-delta="-1">−</button>
            <span class="bs-qty__val">${item.qty}</span>
            <button class="bs-qty__btn" data-id="${item.id}" data-delta="1">+</button>
          </div>
          <span style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:18px;">${bsEur(item.price * item.qty)}</span>
        </div>
      </div>`;
    itemsEl.appendChild(div);
  });

  itemsEl.querySelectorAll('.bs-cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => bsRemove(btn.dataset.id));
  });
  itemsEl.querySelectorAll('.bs-qty__btn').forEach(btn => {
    btn.addEventListener('click', () => bsChangeQty(btn.dataset.id, parseInt(btn.dataset.delta)));
  });
};

const bsRemove = (id) => {
  bsCartItems = bsCartItems.filter(it => String(it.id) !== String(id));
  bsUpdateUI();
  bsSyncCart();
};

const bsChangeQty = (id, delta) => {
  bsCartItems = bsCartItems.map(it => {
    if (String(it.id) !== String(id)) return it;
    return { ...it, qty: Math.max(1, it.qty + delta) };
  });
  bsUpdateUI();
  bsSyncCart();
};

const bsSyncCart = async () => {
  const updates = {};
  bsCartItems.forEach(it => { updates[it.id] = it.qty; });
  try {
    await fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates })
    });
  } catch (_) {}
};

const bsAddToCart = async (variantId, qty, meta) => {
  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: qty })
    });
    const data = await res.json();
    const existing = bsCartItems.find(it => String(it.id) === String(variantId));
    if (existing) {
      existing.qty += qty;
    } else {
      bsCartItems.push({
        id: variantId,
        title: data.product_title || meta?.title || 'Produit',
        product_type: data.product_type || '',
        price: data.price,
        qty,
        image: data.image ? data.image.replace(/\.jpg/, '_180x225_crop_center.jpg') : null
      });
    }
    bsUpdateUI();
    bsOpenCart();
    bsToast(`${data.product_title || 'Produit'} ajouté au panier`);
  } catch (err) {
    bsToast("Erreur lors de l'ajout. Réessayez.");
  }
};

const bsLoadCart = async () => {
  try {
    const res = await fetch('/cart.js');
    const data = await res.json();
    bsCartItems = data.items.map(it => ({
      id: it.id,
      title: it.product_title,
      product_type: it.product_type,
      price: it.price,
      qty: it.quantity,
      image: it.image
    }));
    bsUpdateUI();
  } catch (_) {}
};

const bsOpenCart = () => {
  document.getElementById('bs-cart-drawer')?.classList.add('open');
  document.getElementById('bs-cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const bsCloseCart = () => {
  document.getElementById('bs-cart-drawer')?.classList.remove('open');
  document.getElementById('bs-cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
  bsLoadCart();

  document.getElementById('bs-cart-overlay')?.addEventListener('click', bsCloseCart);
  document.getElementById('bs-cart-close')?.addEventListener('click', bsCloseCart);
  document.getElementById('bs-continue-btn')?.addEventListener('click', bsCloseCart);
  document.getElementById('bs-cart-btn')?.addEventListener('click', bsOpenCart);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-bs-add-to-cart]');
    if (!btn) return;
    e.preventDefault();
    bsAddToCart(btn.dataset.bsAddToCart, 1, { title: btn.dataset.productTitle || 'Produit' });
  });
});

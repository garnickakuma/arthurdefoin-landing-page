/* Barbara Style — theme.js */
'use strict';

// ============================================================
// UTILITAIRES
// ============================================================
const eur = (cents) => {
  const n = cents / 100;
  const e = Math.floor(n);
  const c = Math.round((n - e) * 100).toString().padStart(2, '0');
  return `${e},${c} €`;
};

const toast = (msg, duration = 2600) => {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
};

// ============================================================
// HEADER — scroll pour effet frosted glass
// ============================================================
const headerBar = document.getElementById('header-bar');
if (headerBar) {
  const onScroll = () => {
    headerBar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================================
// LOGIQUE OFFRES (2+1 / 4+2)
// ============================================================
const computeOffer = (items) => {
  const qty = items.reduce((s, it) => s + it.qty, 0);
  let freeCount = 0;
  if (qty >= 6) freeCount = 2;
  else if (qty >= 3) freeCount = 1;

  if (freeCount === 0) return { qty, free: 0, freeValue: 0 };

  const sorted = [...items]
    .flatMap(it => Array(it.qty).fill(it.price))
    .sort((a, b) => a - b);

  const freeValue = sorted.slice(0, freeCount).reduce((s, p) => s + p, 0);
  return { qty, free: freeCount, freeValue };
};

const nextOfferStep = (qty) => {
  if (qty < 3) return { need: 3 - qty, label: 'de plus', tier: '2+1' };
  if (qty < 6) return { need: 6 - qty, label: 'de plus', tier: '4+2' };
  return null;
};

// ============================================================
// PANIER — état en mémoire + API Shopify
// ============================================================
let cartItems = [];
const FREE_SHIP_THRESHOLD = 3000; // 30 € en centimes

const updateCartUI = () => {
  const offer = computeOffer(cartItems);
  const subtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0);
  const afterOffer = subtotal - offer.freeValue;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - afterOffer);
  const pct = Math.min(100, (afterOffer / FREE_SHIP_THRESHOLD) * 100);

  // Badge header
  const totalQty = cartItems.reduce((s, it) => s + it.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.style.display = totalQty > 0 ? 'flex' : 'none';
    badge.textContent = totalQty;
  }

  // Barre livraison
  const shippingText = document.getElementById('shipping-text');
  const shippingFill = document.getElementById('shipping-fill');
  if (shippingText) {
    shippingText.innerHTML = remaining > 0
      ? `Plus que <strong>${eur(remaining)}</strong> pour la livraison offerte ✦`
      : `<strong>Livraison offerte</strong> débloquée&nbsp;!&nbsp;✦`;
  }
  if (shippingFill) shippingFill.style.width = pct + '%';

  // Bandeau offre
  const offerText = document.getElementById('cart-offer-text');
  if (offerText) {
    const step = nextOfferStep(offer.qty);
    if (offer.free > 0) {
      offerText.innerHTML = `<strong>Offre ${offer.free === 1 ? '2+1' : '4+2'}</strong> — ${offer.free} article${offer.free > 1 ? 's' : ''} offert${offer.free > 1 ? 's' : ''} (${eur(offer.freeValue)}).`;
    } else if (step) {
      offerText.innerHTML = `Ajoutez <strong>${step.need}</strong> article${step.need > 1 ? 's' : ''} de plus — offre <span style="color:var(--gold-500)">${step.tier}</span>.`;
    } else {
      offerText.innerHTML = `<strong>2 achetés = 1 offert</strong> · 4 achetés = 2 offerts.`;
    }
  }

  // Ligne remise
  const offerRow = document.getElementById('cart-offer-row');
  const offerLabel = document.getElementById('cart-offer-label');
  const offerVal = document.getElementById('cart-offer-val');
  if (offerRow) {
    if (offer.freeValue > 0) {
      offerRow.style.display = 'flex';
      if (offerLabel) offerLabel.textContent = `Offre ${offer.free === 1 ? '2+1' : '4+2'}`;
      if (offerVal) offerVal.textContent = `− ${eur(offer.freeValue)}`;
    } else {
      offerRow.style.display = 'none';
    }
  }

  // Sous-total
  const subtotalEl = document.getElementById('cart-subtotal');
  if (subtotalEl) {
    const e = Math.floor(afterOffer / 100);
    const c = Math.round((afterOffer / 100 - e) * 100).toString().padStart(2, '0');
    subtotalEl.innerHTML = `<span style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:27px;">${e}<sup style="font-size:.52em;vertical-align:.62em;">${c}</sup><span style="font-size:.56em;"> €</span></span>`;
  }

  // Items
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  if (!itemsEl) return;

  if (cartItems.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    itemsEl.querySelectorAll('.cart-item-row').forEach(el => el.remove());
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  // Rebuild items
  itemsEl.querySelectorAll('.cart-item-row').forEach(el => el.remove());
  cartItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item cart-item-row';
    div.dataset.id = item.id;
    const pE = Math.floor(item.price / 100);
    const pC = Math.round((item.price / 100 - pE) * 100).toString().padStart(2, '0');
    const total = item.price * item.qty;
    const tE = Math.floor(total / 100);
    const tC = Math.round((total / 100 - tE) * 100).toString().padStart(2, '0');
    div.innerHTML = `
      <div class="cart-item__img vx-grain" style="position:relative;overflow:hidden;width:76px;height:92px;border-radius:var(--vx-radius-card);flex:0 0 auto;background:var(--cream-300);">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">` : ''}
      </div>
      <div class="cart-item__info" style="flex:1;">
        <div style="display:flex;justify-content:space-between;gap:8px;">
          <div>
            <div class="cart-item__cat">${item.product_type || ''}</div>
            <div class="cart-item__name">${item.title}</div>
          </div>
          <button class="cart-remove-btn" data-id="${item.id}" aria-label="Retirer" style="background:none;border:none;cursor:pointer;color:var(--ink-500);height:20px;align-self:flex-start;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;">
          <div class="qty-stepper">
            <button class="qty-btn cart-qty-minus" data-id="${item.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn cart-qty-plus" data-id="${item.id}">+</button>
          </div>
          <span style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:19px;">${tE}<sup style="font-size:.52em;vertical-align:.62em;">${tC}</sup><span style="font-size:.56em;"> €</span></span>
        </div>
      </div>`;
    itemsEl.appendChild(div);

    div.querySelector('.cart-remove-btn').addEventListener('click', () => removeItem(item.id));
    div.querySelector('.cart-qty-minus').addEventListener('click', () => changeQty(item.id, -1));
    div.querySelector('.cart-qty-plus').addEventListener('click', () => changeQty(item.id, 1));
  });
};

const removeItem = (id) => {
  cartItems = cartItems.filter(it => it.id !== id);
  updateCartUI();
  syncCart();
};

const changeQty = (id, delta) => {
  cartItems = cartItems.map(it => {
    if (it.id !== id) return it;
    const qty = Math.max(1, it.qty + delta);
    return { ...it, qty };
  }).filter(it => it.qty > 0);
  updateCartUI();
  syncCart();
};

const syncCart = async () => {
  // Recalcule les quantités côté Shopify via /cart/update.js
  const updates = {};
  cartItems.forEach(it => { updates[it.variantId] = it.qty; });
  try {
    await fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates })
    });
  } catch (e) {
    /* silently fail */
  }
};

const addToCart = async (variantId, qty, productData) => {
  // Appel API Shopify
  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: qty })
    });
    const data = await res.json();

    // Mise à jour état local
    const existing = cartItems.find(it => it.variantId === variantId);
    if (existing) {
      existing.qty += qty;
    } else {
      cartItems.push({
        id: variantId,
        variantId,
        title: data.product_title || productData?.title || 'Produit',
        product_type: data.product_type || productData?.type || '',
        price: data.price,
        qty,
        image: data.image ? data.image.replace(/\.jpg/, '_200x250_crop_center.jpg') : null
      });
    }
    updateCartUI();
    openCart();
    toast(`${data.product_title || 'Produit'} ajouté au panier ✦`);
  } catch (err) {
    console.error('Erreur ajout panier', err);
    toast('Erreur lors de l\'ajout au panier. Réessayez.');
  }
};

// Charger le panier Shopify existant au chargement
const loadCart = async () => {
  try {
    const res = await fetch('/cart.js');
    const data = await res.json();
    cartItems = data.items.map(it => ({
      id: it.id,
      variantId: it.variant_id,
      title: it.product_title,
      product_type: it.product_type,
      price: it.price,
      qty: it.quantity,
      image: it.image
    }));
    updateCartUI();
  } catch (e) { /* silently fail */ }
};

// ============================================================
// CART DRAWER — open / close
// ============================================================
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');

const openCart = () => {
  if (!cartDrawer) return;
  cartDrawer.classList.add('open');
  cartOverlay?.classList.add('open');
  cartOverlay?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeCart = () => {
  cartDrawer?.classList.remove('open');
  cartOverlay?.classList.remove('open');
  cartOverlay?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('continue-btn')?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

// ============================================================
// BOUTONS "Ajouter au panier" sur les cards
// ============================================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (!btn) return;
  e.preventDefault();
  const variantId = btn.dataset.addToCart;
  const qty = 1;
  addToCart(variantId, qty, {
    title: btn.dataset.productTitle || 'Produit',
    type: ''
  });
});

// Bouton "Ajouter au panier" sur la fiche produit
const productAddBtn = document.getElementById('add-to-cart-btn');
if (productAddBtn) {
  productAddBtn.addEventListener('click', () => {
    const variantId = productAddBtn.dataset.variantId;
    const qty = parseInt(document.getElementById('qty-value')?.textContent || '1', 10);
    addToCart(variantId, qty, {
      title: productAddBtn.dataset.productTitle || 'Produit',
      type: ''
    });
  });
}

// ============================================================
// WISHLIST (localStorage)
// ============================================================
const WISH_KEY = 'bs_wish';
let wish = JSON.parse(localStorage.getItem(WISH_KEY) || '{}');

const toggleWishlist = (productId) => {
  if (wish[productId]) {
    delete wish[productId];
  } else {
    wish[productId] = true;
  }
  localStorage.setItem(WISH_KEY, JSON.stringify(wish));
  refreshWishlistUI();
};

const refreshWishlistUI = () => {
  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    const id = btn.dataset.wishlist;
    const svg = btn.querySelector('svg');
    if (!svg) return;
    if (wish[id]) {
      svg.setAttribute('fill', 'var(--rose-400)');
      svg.setAttribute('stroke', 'var(--rose-400)');
    } else {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'var(--ink-700)');
    }
  });
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-wishlist]');
  if (!btn) return;
  e.preventDefault();
  toggleWishlist(btn.dataset.wishlist);
});

const wishlistToggle = document.getElementById('wishlist-toggle');
if (wishlistToggle) {
  wishlistToggle.addEventListener('click', () => {
    toggleWishlist(wishlistToggle.dataset.product);
    const svg = wishlistToggle.querySelector('svg');
    if (wish[wishlistToggle.dataset.product]) {
      svg?.setAttribute('fill', 'var(--rose-400)');
      svg?.setAttribute('stroke', 'var(--rose-400)');
    } else {
      svg?.setAttribute('fill', 'none');
      svg?.setAttribute('stroke', 'var(--ink-700)');
    }
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  refreshWishlistUI();
});

/* @ds-bundle: {"format":3,"namespace":"BarbaraStyleDesignSystem_eb9639","components":[{"name":"Badge","sourcePath":"components/commerce/Badge.jsx"},{"name":"PriceTag","sourcePath":"components/commerce/PriceTag.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/commerce/QuantityStepper.jsx"},{"name":"Rating","sourcePath":"components/commerce/Rating.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/commerce/Badge.jsx":"8516663fb276","components/commerce/PriceTag.jsx":"aa39d384c956","components/commerce/ProductCard.jsx":"715aeed25fc7","components/commerce/QuantityStepper.jsx":"916548ae0488","components/commerce/Rating.jsx":"232d5aec69d4","components/forms/Button.jsx":"b8ab2bfa4ceb","components/forms/Checkbox.jsx":"66625466d999","components/forms/IconButton.jsx":"d0c86e89af75","components/forms/Input.jsx":"9de86c1eabc3","ui_kits/boutique/Cart.jsx":"77079e4222e3","ui_kits/boutique/Chrome.jsx":"75c1ea34dd71","ui_kits/boutique/Collection.jsx":"edb6246ba8a2","ui_kits/boutique/Home.jsx":"c635f1b0b370","ui_kits/boutique/Product.jsx":"dcb8937efd12","ui_kits/boutique/data.jsx":"4c4725cfcc39"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BarbaraStyleDesignSystem_eb9639 = window.BarbaraStyleDesignSystem_eb9639 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — Badge
 * Pastille fine pour signaler : Nouveau, promo, best-seller, édition limitée.
 */
function Badge({
  children,
  variant = 'gold',
  style,
  ...rest
}) {
  const variants = {
    gold: {
      background: 'var(--gold-400)',
      color: 'var(--ink-900)',
      border: 'none'
    },
    rose: {
      background: 'var(--rose-300)',
      color: 'var(--ink-900)',
      border: 'none'
    },
    sale: {
      background: 'var(--terracotta-500)',
      color: '#fff',
      border: 'none'
    },
    ink: {
      background: 'var(--ink-900)',
      color: 'var(--linen-100)',
      border: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink-900)',
      border: '1px solid var(--line-strong)'
    },
    cream: {
      background: 'var(--cream-300)',
      color: 'var(--ink-700)',
      border: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Badge.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — PriceTag
 * Affiche le prix en euros. Prix barré optionnel pour les promos.
 * Format français : « 24,90 € ».
 */
function PriceTag({
  price,
  compareAt,
  size = 'md',
  currency = '€',
  style,
  ...rest
}) {
  const fmt = n => typeof n === 'number' ? n.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : n;
  const sizes = {
    sm: {
      now: 14,
      was: 12
    },
    md: {
      now: 19,
      was: 13
    },
    lg: {
      now: 27,
      was: 15
    }
  };
  const onSale = compareAt != null;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 9,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: sizes[size].now,
      lineHeight: 1,
      color: onSale ? 'var(--price-sale)' : 'var(--price-now)'
    }
  }, fmt(price), "\xA0", currency), onSale && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: sizes[size].was,
      color: 'var(--price-was)',
      textDecoration: 'line-through',
      textDecorationColor: 'var(--rose-400)'
    }
  }, fmt(compareAt), "\xA0", currency));
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — QuantityStepper
 * Sélecteur de quantité : − valeur +. Fin, pilule, accent doré.
 */
function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  style,
  ...rest
}) {
  const set = v => {
    const n = Math.max(min, Math.min(max, v));
    onChange && onChange(n);
  };
  const btn = disabled => ({
    width: 34,
    height: 34,
    borderRadius: 'var(--radius-circle)',
    border: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: 18,
    lineHeight: 1,
    color: disabled ? 'var(--text-whisper)' : 'var(--ink-900)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft)'
  });
  const hover = (e, on) => {
    if (e.currentTarget.disabled) return;
    e.currentTarget.style.background = on ? 'var(--gold-200)' : 'transparent';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      border: '1px solid var(--line-hairline)',
      borderRadius: 'var(--radius-pill)',
      padding: 3,
      background: 'var(--white-pure)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Diminuer",
    disabled: value <= min,
    style: btn(value <= min),
    onMouseEnter: e => hover(e, true),
    onMouseLeave: e => hover(e, false),
    onClick: () => set(value - 1)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 15,
      color: 'var(--ink-900)'
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Augmenter",
    disabled: value >= max,
    style: btn(value >= max),
    onMouseEnter: e => hover(e, true),
    onMouseLeave: e => hover(e, false),
    onClick: () => set(value + 1)
  }, "+"));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — Rating
 * Étoiles dorées + nombre d'avis. Demi-étoiles supportées.
 */
function Rating({
  value = 5,
  count,
  size = 14,
  showValue = false,
  style,
  ...rest
}) {
  const stars = [0, 1, 2, 3, 4].map(i => {
    const fill = Math.max(0, Math.min(1, value - i)); // 0..1
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-block'
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--cream-400)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        width: `${fill * 100}%`,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--gold-400)"
    })));
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, stars), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--ink-700)'
    }
  }, value.toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "(", count, ")"));
}
function Star({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.98l-5.9 3.1 1.12-6.57L2.45 9.86l6.6-.96L12 2.2z"
  }));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Rating.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — ProductCard
 * Carte produit boutique : visuel, pastille, cœur favori, nom serif,
 * note, prix. Survol : léger soulèvement + halo doré, révèle « Ajouter ».
 * Compose Badge, PriceTag et Rating.
 */
function ProductCard({
  name,
  category,
  price,
  compareAt,
  image,
  imageStyle,
  badge,
  badgeVariant = 'gold',
  rating,
  ratingCount,
  wishlisted = false,
  onWishlist,
  onAdd,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--line-soft)',
      boxShadow: hover ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      cursor: 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 5',
      overflow: 'hidden',
      background: 'var(--cream-300)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: hover ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)',
      ...imageStyle
    }
  }), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: badgeVariant
  }, badge)), /*#__PURE__*/React.createElement("button", {
    "aria-label": wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris',
    onClick: e => {
      e.stopPropagation();
      onWishlist && onWishlist();
    },
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-circle)',
      border: 'none',
      background: 'rgba(255,255,255,.82)',
      backdropFilter: 'blur(4px)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-soft)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: wishlisted ? 'var(--rose-400)' : 'none',
    stroke: wishlisted ? 'var(--rose-400)' : 'var(--ink-700)',
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z"
  }))), onAdd && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 12,
      opacity: hover ? 1 : 0,
      transform: hover ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onAdd();
    },
    style: {
      width: '100%',
      padding: '11px',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--ink-900)',
      color: 'var(--linen-100)',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      cursor: 'pointer'
    }
  }, "Ajouter au panier"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px 20px'
    }
  }, category && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--text-gold)',
      marginBottom: 6
    }
  }, category), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 21,
      color: 'var(--ink-900)',
      lineHeight: 1.15,
      margin: '0 0 8px'
    }
  }, name), rating != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    count: ratingCount,
    size: 13
  })), /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    compareAt: compareAt
  })));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — Button
 * Bouton pilule, élégant et solaire. Variantes : gold (action principale),
 * ink (sombre), ghost (contour), rose (féminin doux), link (texte souligné).
 */
function Button({
  children,
  variant = 'gold',
  size = 'md',
  full = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 18px',
      fontSize: '12px',
      letterSpacing: '.16em'
    },
    md: {
      padding: '13px 30px',
      fontSize: '13px',
      letterSpacing: '.18em'
    },
    lg: {
      padding: '17px 42px',
      fontSize: '14px',
      letterSpacing: '.2em'
    }
  };
  const variants = {
    gold: {
      background: 'var(--gold-400)',
      color: 'var(--text-on-gold)',
      border: '1px solid var(--gold-400)'
    },
    ink: {
      background: 'var(--ink-900)',
      color: 'var(--text-on-ink)',
      border: '1px solid var(--ink-900)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-900)',
      border: '1px solid var(--ink-900)'
    },
    rose: {
      background: 'var(--rose-300)',
      color: 'var(--ink-900)',
      border: '1px solid var(--rose-300)'
    },
    link: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent',
      borderBottom: '1px solid var(--gold-400)',
      borderRadius: 0,
      padding: '2px 0'
    }
  };
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    textTransform: 'uppercase',
    borderRadius: variant === 'link' ? 0 : 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: full ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    lineHeight: 1,
    transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-soft)',
    ...sizes[size],
    ...variants[variant],
    ...(variant === 'link' ? {
      padding: '2px 0'
    } : {}),
    ...style
  };
  const hover = e => {
    if (disabled) return;
    const el = e.currentTarget;
    if (variant === 'gold') {
      el.style.background = 'var(--gold-500)';
      el.style.boxShadow = 'var(--shadow-glow)';
    } else if (variant === 'ink') {
      el.style.background = 'var(--ink-700)';
    } else if (variant === 'ghost') {
      el.style.background = 'var(--ink-900)';
      el.style.color = 'var(--text-on-ink)';
    } else if (variant === 'rose') {
      el.style.background = 'var(--rose-400)';
    } else if (variant === 'link') {
      el.style.color = 'var(--gold-500)';
    }
  };
  const leave = e => {
    const el = e.currentTarget;
    Object.assign(el.style, {
      background: variants[variant].background,
      color: variants[variant].color,
      boxShadow: 'none'
    });
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseEnter: hover,
    onMouseLeave: leave,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — Checkbox
 * Case à cocher carrée, fine, coche dorée. Pour filtres & conditions.
 */
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const cid = id || `bs-cb-${Math.random().toString(36).slice(2, 8)}`;
  const box = {
    width: 19,
    height: 19,
    flex: '0 0 auto',
    borderRadius: 'var(--radius-xs)',
    border: `1px solid ${checked ? 'var(--gold-400)' : 'var(--line-strong)'}`,
    background: checked ? 'var(--gold-400)' : 'var(--white-pure)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft)'
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 11,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--ink-700)',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: cid,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: box
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2L4.8 8.5L9.5 3.5",
    stroke: "var(--ink-900)",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — IconButton
 * Bouton rond pour icône seule (panier, cœur, recherche, compte).
 * Passer une icône (SVG / lucide) en enfant.
 */
function IconButton({
  children,
  variant = 'plain',
  size = 'md',
  badge = null,
  'aria-label': ariaLabel,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: 34,
    md: 42,
    lg: 50
  };
  const dim = sizes[size];
  const variants = {
    plain: {
      background: 'transparent',
      color: 'var(--ink-700)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'var(--white-pure)',
      color: 'var(--ink-900)',
      border: '1px solid var(--line-hairline)'
    },
    gold: {
      background: 'var(--gold-400)',
      color: 'var(--ink-900)',
      border: '1px solid var(--gold-400)'
    },
    ink: {
      background: 'var(--ink-900)',
      color: 'var(--linen-100)',
      border: '1px solid var(--ink-900)'
    }
  };
  const base = {
    width: dim,
    height: dim,
    borderRadius: 'var(--radius-circle)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    position: 'relative',
    transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)',
    ...variants[variant],
    ...style
  };
  const hover = e => {
    if (disabled) return;
    const el = e.currentTarget;
    if (variant === 'plain') el.style.background = 'var(--surface-rose)';else if (variant === 'outline') {
      el.style.borderColor = 'var(--gold-400)';
      el.style.color = 'var(--gold-500)';
    } else if (variant === 'gold') {
      el.style.background = 'var(--gold-500)';
      el.style.boxShadow = 'var(--shadow-glow)';
    } else if (variant === 'ink') el.style.background = 'var(--ink-700)';
  };
  const leave = e => {
    Object.assign(e.currentTarget.style, {
      ...variants[variant],
      boxShadow: 'none'
    });
  };
  const badgeStyle = {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 17,
    height: 17,
    padding: '0 4px',
    borderRadius: 'var(--radius-pill)',
    background: 'var(--gold-400)',
    color: 'var(--ink-900)',
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid var(--white-pure)'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseEnter: hover,
    onMouseLeave: leave
  }, rest), children, badge != null && /*#__PURE__*/React.createElement("span", {
    style: badgeStyle
  }, badge));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barbara Style — Input
 * Champ de saisie épuré : libellé en sur-titre, filet fin,
 * ligne dorée au focus. Convient aussi à la newsletter (variant "line").
 */
function Input({
  label,
  hint,
  error,
  type = 'text',
  variant = 'box',
  id,
  style,
  ...rest
}) {
  const inputId = id || `bs-input-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  const labelStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    color: error ? 'var(--danger)' : 'var(--text-muted)',
    marginBottom: 8,
    display: 'block'
  };
  const shared = {
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    color: 'var(--ink-900)',
    width: '100%',
    background: 'var(--white-pure)',
    outline: 'none',
    transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
  };
  const boxStyle = {
    ...shared,
    padding: '13px 16px',
    border: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--gold-400)' : 'var(--line-hairline)'}`,
    borderRadius: 'var(--radius-md)',
    boxShadow: focused ? '0 0 0 3px rgba(205,161,82,.16)' : 'none'
  };
  const lineStyle = {
    ...shared,
    padding: '9px 2px',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--gold-400)' : 'var(--line-strong)'}`,
    borderRadius: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: labelStyle
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    style: variant === 'line' ? lineStyle : boxStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      marginTop: 7,
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/boutique/Cart.jsx
try { (() => {
// Barbara Style — Boutique : panier (tiroir latéral)

function CartDrawer({
  open,
  onClose,
  items,
  setItems
}) {
  const {
    Button,
    PriceTag,
    QuantityStepper,
    IconButton
  } = window.BarbaraStyleDesignSystem_eb9639;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const FREE = 49;
  const remaining = Math.max(0, FREE - subtotal);
  const pct = Math.min(100, subtotal / FREE * 100);
  const setQty = (id, qty) => setItems(arr => arr.map(it => it.id === id ? {
    ...it,
    qty
  } : it));
  const remove = id => setItems(arr => arr.filter(it => it.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      pointerEvents: open ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(42,32,24,.34)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: 416,
      maxWidth: '92vw',
      background: 'var(--linen-100)',
      boxShadow: 'var(--shadow-lg)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform var(--dur-slow) var(--ease-out)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      color: 'var(--ink-900)'
    }
  }, "Votre panier"), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Fermer",
    variant: "plain",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon.close, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px',
      background: 'var(--surface-sun)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      color: 'var(--ink-700)',
      marginBottom: 9
    }
  }, remaining > 0 ? /*#__PURE__*/React.createElement("span", null, "Plus que ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ink-900)'
    }
  }, remaining.toFixed(2).replace('.', ','), " \u20AC"), " pour la livraison offerte\xA0\u2726") : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ink-900)'
    }
  }, "Livraison offerte"), " d\xE9bloqu\xE9e\xA0!\xA0\u2726")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      borderRadius: 999,
      background: 'rgba(255,255,255,.6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      borderRadius: 999,
      background: 'var(--gold-500)',
      transition: 'width var(--dur-base) var(--ease-out)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 24px'
    }
  }, items.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '64px 0',
      color: 'var(--ink-500)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Sun, {
    s: 34
  })), "Votre panier est vide."), items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      gap: 14,
      padding: '18px 0',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 92,
      borderRadius: 'var(--radius-sm)',
      flex: '0 0 auto',
      ...it.grad
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--gold-500)'
    }
  }, it.cat), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      color: 'var(--ink-900)',
      marginTop: 2
    }
  }, it.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => remove(it.id),
    "aria-label": "Retirer",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--ink-500)',
      height: 20
    }
  }, /*#__PURE__*/React.createElement(Icon.close, {
    width: "15",
    height: "15"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: it.qty,
    onChange: q => setQty(it.id, q)
  }), /*#__PURE__*/React.createElement(PriceTag, {
    price: it.price * it.qty,
    size: "sm"
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 26px',
      borderTop: '1px solid var(--line-soft)',
      background: 'var(--white-pure)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)'
    }
  }, "Sous-total"), /*#__PURE__*/React.createElement(PriceTag, {
    price: subtotal,
    size: "md"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11.5,
      color: 'var(--ink-500)',
      marginBottom: 16
    }
  }, "Taxes incluses. Livraison calcul\xE9e \xE0 l'\xE9tape suivante."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    full: true,
    disabled: items.length === 0
  }, "Passer la commande"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: '100%',
      marginTop: 10,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      letterSpacing: '.08em',
      color: 'var(--ink-500)',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, "Continuer mes achats"))));
}
Object.assign(window, {
  CartDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/boutique/Cart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/boutique/Chrome.jsx
try { (() => {
// Barbara Style — Boutique : en-tête & pied de page partagés

function Header({
  route,
  go,
  cartCount,
  onOpenCart
}) {
  const {
    IconButton
  } = window.BarbaraStyleDesignSystem_eb9639;
  const nav = ['Nouveautés', 'Boutique', 'Bijoux', 'Cache-boutons', 'À propos'];
  const link = label => {
    const to = label === 'Boutique' || label === 'Bijoux' || label === 'Cache-boutons' || label === 'Nouveautés' ? 'collection' : 'home';
    const active = route === 'collection' && to === 'collection' && label !== 'Nouveautés';
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => go(to),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0',
        fontFamily: 'var(--font-sans)',
        fontSize: 12.5,
        fontWeight: 400,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: active ? 'var(--gold-500)' : 'var(--ink-700)',
        borderBottom: active ? '1px solid var(--gold-400)' : '1px solid transparent'
      }
    }, label);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'rgba(254,251,246,.86)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      background: 'var(--ink-900)',
      color: 'var(--linen-200)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      fontSize: 10.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase'
    }
  }, "Livraison offerte d\xE8s 49\xA0\u20AC\xA0\xA0\xB7\xA0\xA0Imagin\xE9 en France"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px',
      height: 76,
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26
    }
  }, nav.map(link)), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('home'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 30,
      lineHeight: 1,
      color: 'var(--ink-900)'
    }
  }, "Barbara"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 8,
      letterSpacing: '.4em',
      textTransform: 'uppercase',
      color: 'var(--gold-500)'
    }
  }, "Bijoux & cache-boutons")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Recherche",
    variant: "plain"
  }, /*#__PURE__*/React.createElement(Icon.search, null)), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Compte",
    variant: "plain"
  }, /*#__PURE__*/React.createElement(Icon.user, null)), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Favoris",
    variant: "plain"
  }, /*#__PURE__*/React.createElement(Icon.heart, null)), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Panier",
    variant: "outline",
    badge: cartCount || undefined,
    onClick: onOpenCart
  }, /*#__PURE__*/React.createElement(Icon.bag, null)))));
}
function Footer({
  go
}) {
  const {
    Input,
    Button
  } = window.BarbaraStyleDesignSystem_eb9639;
  const col = (title, items) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      marginBottom: 16
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, items.map(t => /*#__PURE__*/React.createElement("a", {
    key: t,
    onClick: () => go('collection'),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      color: 'var(--linen-200)',
      opacity: .82,
      cursor: 'pointer'
    }
  }, t))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-900)',
      color: 'var(--linen-100)',
      marginTop: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '72px 32px 40px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Sun, {
    s: 22,
    c: "#e3c988"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--linen-100)'
    }
  }, "Barbara")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      lineHeight: 1.7,
      color: 'var(--linen-200)',
      opacity: .8,
      maxWidth: 260
    }
  }, "Des bijoux qui scintillent au soleil, pens\xE9s pour celles qui aiment se faire plaisir. Imagin\xE9 en France.")), col('Boutique', ["Boucles d'oreilles", 'Colliers', 'Bracelets', 'Cache-boutons']), col('Maison', ['Notre histoire', 'Journal', 'Boutiques', 'Nous contacter']), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      marginBottom: 16
    }
  }, "Newsletter"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--linen-200)',
      opacity: .8,
      marginBottom: 16
    }
  }, "Un rayon de soleil dans votre bo\xEEte mail \u2014 nouveaut\xE9s & petites attentions."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    variant: "line",
    placeholder: "Votre e-mail",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "sm"
  }, "OK")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-sans)',
      fontSize: 11.5,
      letterSpacing: '.06em',
      color: 'var(--linen-200)',
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Barbara Style"), /*#__PURE__*/React.createElement("span", null, "CGV \xB7 Confidentialit\xE9 \xB7 Livraison & retours"))));
}
Object.assign(window, {
  Header,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/boutique/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/boutique/Collection.jsx
try { (() => {
// Barbara Style — Boutique : page collection (listing + filtres)

function Collection({
  go,
  addToCart,
  wish,
  toggleWish
}) {
  const {
    ProductCard,
    Checkbox,
    Badge
  } = window.BarbaraStyleDesignSystem_eb9639;
  const wrap = {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '0 32px'
  };
  const [filters, setFilters] = React.useState({
    or: true,
    rose: false,
    perle: false,
    neuf: true
  });
  const set = k => setFilters(f => ({
    ...f,
    [k]: !f[k]
  }));
  const FilterGroup = ({
    title,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24,
      marginBottom: 24,
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 16
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13
    }
  }, children));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-rose)',
      padding: '56px 0 52px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11.5,
      letterSpacing: '.1em',
      color: 'var(--ink-500)',
      marginBottom: 14
    }
  }, "Accueil\xA0\xB7\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, "Bijoux")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 58,
      color: 'var(--ink-900)',
      lineHeight: 1
    }
  }, "La Boutique"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--ink-700)',
      marginTop: 14
    }
  }, "Toutes nos pi\xE8ces qui attrapent la lumi\xE8re \u2014 ", window.PRODUCTS.length, " mod\xE8les."))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      marginTop: 44,
      display: 'grid',
      gridTemplateColumns: '232px 1fr',
      gap: 44,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      color: 'var(--ink-900)',
      marginBottom: 22
    }
  }, "Filtrer"), /*#__PURE__*/React.createElement(FilterGroup, {
    title: "Cat\xE9gorie"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Boucles d'oreilles",
    checked: filters.neuf,
    onChange: () => set('neuf')
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Colliers",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Bracelets",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Cache-boutons",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(FilterGroup, {
    title: "Mati\xE8re"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Plaqu\xE9 or",
    checked: filters.or,
    onChange: () => set('or')
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Nacre & perle",
    checked: filters.perle,
    onChange: () => set('perle')
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Rose poudr\xE9",
    checked: filters.rose,
    onChange: () => set('rose')
  })), /*#__PURE__*/React.createElement(FilterGroup, {
    title: "Prix"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Moins de 20 \u20AC",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "20 \u20AC \u2013 30 \u20AC",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Plus de 30 \u20AC",
    onChange: () => {}
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "cream"
  }, "Plaqu\xE9 or \u2715"), /*#__PURE__*/React.createElement(Badge, {
    variant: "cream"
  }, "Nouveaut\xE9s \u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)'
    }
  }, "Trier\xA0:\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, "Nouveaut\xE9s \u25BE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, window.PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    category: p.cat,
    name: p.name,
    price: p.price,
    compareAt: p.was,
    badge: p.badge,
    badgeVariant: p.bv,
    rating: p.rating,
    ratingCount: p.count,
    imageStyle: p.grad,
    wishlisted: !!wish[p.id],
    onWishlist: () => toggleWish(p.id),
    onAdd: () => addToCart(p),
    onClick: () => go('product', p)
  }))))));
}
Object.assign(window, {
  Collection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/boutique/Collection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/boutique/Home.jsx
try { (() => {
// Barbara Style — Boutique : page d'accueil

function Home({
  go,
  addToCart,
  wish,
  toggleWish
}) {
  const {
    Button,
    ProductCard
  } = window.BarbaraStyleDesignSystem_eb9639;
  const wrap = {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '0 32px'
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      paddingTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-grain bs-warm-veil",
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: 560,
      ...window.GRADS.gold,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 72px',
      maxWidth: 620,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '.3em',
      textTransform: 'uppercase',
      color: '#fff',
      marginBottom: 18,
      opacity: .95
    }
  }, "Nouvelle collection \xB7 \xC9t\xE9"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 84,
      lineHeight: .98,
      color: '#fff',
      letterSpacing: '-.01em'
    }
  }, "Scintiller", /*#__PURE__*/React.createElement("br", null), "au ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      fontWeight: 400
    }
  }, "soleil")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 300,
      fontSize: 17,
      lineHeight: 1.6,
      color: '#fff',
      opacity: .94,
      margin: '22px 0 32px',
      maxWidth: 420
    }
  }, "Des pi\xE8ces qui attrapent la lumi\xE8re, \xE0 petits prix. L'\xE9l\xE9gance de la femme, en toute l\xE9g\xE8ret\xE9."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    onClick: () => go('collection')
  }, "D\xE9couvrir la collection"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: () => go('collection'),
    style: {
      color: '#fff',
      borderColor: 'rgba(255,255,255,.7)'
    }
  }, "Les nouveaut\xE9s"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      marginTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 38
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "bs-eyebrow"
  }, "Explorer"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 40,
      color: 'var(--ink-900)',
      marginTop: 8
    }
  }, "Par envie")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 22
    }
  }, window.CATEGORIES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.name,
    onClick: () => go('collection'),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-grain",
    style: {
      height: 240,
      borderRadius: 'var(--radius-md)',
      ...c.grad,
      boxShadow: 'var(--shadow-sm)',
      marginBottom: 14,
      transition: 'box-shadow var(--dur-base) var(--ease-out)'
    },
    onMouseEnter: e => e.currentTarget.style.boxShadow = 'var(--shadow-glow)',
    onMouseLeave: e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--ink-900)'
    }
  }, c.name))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      marginTop: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "bs-eyebrow"
  }, "Coups de c\u0153ur"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 40,
      color: 'var(--ink-900)',
      marginTop: 8
    }
  }, "S\xE9lection solaire")), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => go('collection')
  }, "Tout voir")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, window.PRODUCTS.slice(0, 4).map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    category: p.cat,
    name: p.name,
    price: p.price,
    compareAt: p.was,
    badge: p.badge,
    badgeVariant: p.bv,
    rating: p.rating,
    ratingCount: p.count,
    imageStyle: p.grad,
    wishlisted: !!wish[p.id],
    onWishlist: () => toggleWish(p.id),
    onAdd: () => addToCart(p),
    onClick: () => go('product', p)
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-cream)',
      marginTop: 96,
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 40,
      textAlign: 'center'
    }
  }, [{
    i: /*#__PURE__*/React.createElement(Icon.gem, {
      c: "var(--gold-500)"
    }),
    t: 'Plaqué or fin',
    d: 'Des matières choisies, des finitions soignées qui durent.'
  }, {
    i: /*#__PURE__*/React.createElement(Icon.truck, {
      c: "var(--gold-500)"
    }),
    t: 'Livraison offerte',
    d: 'Dès 49 € en France · expédié sous 48 h depuis nos ateliers.'
  }, {
    i: /*#__PURE__*/React.createElement(Icon.leaf, {
      c: "var(--gold-500)"
    }),
    t: 'Imaginé en France',
    d: 'Dessiné avec amour sur la Côte d\u2019Azur, à petits prix.'
  }].map(x => /*#__PURE__*/React.createElement("div", {
    key: x.t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)'
    }
  }, x.i), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      color: 'var(--ink-900)'
    }
  }, x.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--ink-500)',
      maxWidth: 260
    }
  }, x.d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      marginTop: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "bs-eyebrow"
  }, "On les adore"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 40,
      color: 'var(--ink-900)',
      marginTop: 8
    }
  }, "Best-sellers")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, window.PRODUCTS.slice(4, 8).map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    category: p.cat,
    name: p.name,
    price: p.price,
    compareAt: p.was,
    badge: p.badge,
    badgeVariant: p.bv,
    rating: p.rating,
    ratingCount: p.count,
    imageStyle: p.grad,
    wishlisted: !!wish[p.id],
    onWishlist: () => toggleWish(p.id),
    onAdd: () => addToCart(p),
    onClick: () => go('product', p)
  })))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/boutique/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/boutique/Product.jsx
try { (() => {
// Barbara Style — Boutique : fiche produit

function Product({
  product,
  go,
  addToCart,
  wish,
  toggleWish
}) {
  const {
    Button,
    PriceTag,
    Rating,
    Badge,
    QuantityStepper,
    ProductCard,
    IconButton
  } = window.BarbaraStyleDesignSystem_eb9639;
  const p = product || window.PRODUCTS[0];
  const wrap = {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '0 32px'
  };
  const [qty, setQty] = React.useState(1);
  const [active, setActive] = React.useState(0);
  const thumbs = [p.grad, window.GRADS.sand, window.GRADS.rose, window.GRADS.honey];
  const related = window.PRODUCTS.filter(x => x.id !== p.id).slice(0, 4);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      paddingTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11.5,
      letterSpacing: '.08em',
      color: 'var(--ink-500)',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: () => go('home')
  }, "Accueil"), "\xA0\xB7\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: () => go('collection')
  }, p.cat), "\xA0\xB7\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, p.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, thumbs.map((g, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setActive(i),
    style: {
      width: 72,
      height: 88,
      borderRadius: 'var(--radius-sm)',
      ...g,
      cursor: 'pointer',
      border: active === i ? '1.5px solid var(--gold-400)' : '1px solid var(--line-soft)',
      padding: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bs-grain",
    style: {
      flex: 1,
      aspectRatio: '4/5',
      borderRadius: 'var(--radius-md)',
      ...thumbs[active],
      boxShadow: 'var(--shadow-md)',
      position: 'relative'
    }
  }, p.badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: p.bv
  }, p.badge)))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'var(--text-gold)',
      marginBottom: 12
    }
  }, p.cat), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 52,
      lineHeight: 1.02,
      color: 'var(--ink-900)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      margin: '16px 0 22px'
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: p.rating,
    count: p.count,
    showValue: true
  })), /*#__PURE__*/React.createElement(PriceTag, {
    price: p.price,
    compareAt: p.was,
    size: "lg"
  }), /*#__PURE__*/React.createElement("hr", {
    className: "bs-rule",
    style: {
      margin: '26px 0'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 300,
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-700)',
      maxWidth: 440
    }
  }, "Une pi\xE8ce lumineuse, pens\xE9e pour accompagner vos journ\xE9es d'\xE9t\xE9 comme vos soir\xE9es. Plaqu\xE9 or fin, l\xE9g\xE8re \xE0 porter \u2014 l'\xE9clat qui change tout, sans se ruiner."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      margin: '22px 0 28px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Plaqu\xE9 or fin"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Hypoallerg\xE9nique"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Imagin\xE9 en France")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty,
    max: 10
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    full: true,
    style: {
      flex: 1
    },
    onClick: () => addToCart(p, qty)
  }, "Ajouter au panier"), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Favori",
    variant: "outline",
    size: "lg",
    onClick: () => toggleWish(p.id)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: wish[p.id] ? 'var(--rose-400)' : 'none',
    stroke: wish[p.id] ? 'var(--rose-400)' : 'var(--ink-700)',
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, [['Livraison & retours', 'Offerte dès 49 € · retours gratuits sous 30 jours.'], ['Matière & entretien', 'Laiton plaqué or 3 microns. Éviter eau et parfum.']].map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      borderTop: '1px solid var(--line-soft)',
      padding: '16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      letterSpacing: '.04em',
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("span", null, t), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)'
    }
  }, "\uFF0B")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--ink-500)',
      marginTop: 8
    }
  }, d))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      marginTop: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "bs-eyebrow"
  }, "Pour compl\xE9ter"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 38,
      color: 'var(--ink-900)',
      marginTop: 8
    }
  }, "Vous aimerez aussi")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, related.map(r => /*#__PURE__*/React.createElement(ProductCard, {
    key: r.id,
    category: r.cat,
    name: r.name,
    price: r.price,
    compareAt: r.was,
    badge: r.badge,
    badgeVariant: r.bv,
    rating: r.rating,
    ratingCount: r.count,
    imageStyle: r.grad,
    wishlisted: !!wish[r.id],
    onWishlist: () => toggleWish(r.id),
    onAdd: () => addToCart(r),
    onClick: () => go('product', r)
  })))));
}
Object.assign(window, {
  Product
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/boutique/Product.jsx", error: String((e && e.message) || e) }); }

// ui_kits/boutique/data.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Barbara Style — Boutique : données de démonstration & utilitaires
// Placeholders : dégradés chauds (à remplacer par les visuels IA dorés).

const warm = (a, b, c) => ({
  background: `radial-gradient(120% 95% at 68% 18%, ${a}, ${b} 46%, ${c} 100%)`
});
const GRADS = {
  gold: warm('#ffe9c2', '#e9c7a0', '#cf9d83'),
  rose: warm('#fbe3df', '#ecc6bf', '#cf9aa0'),
  sand: warm('#fdeccf', '#e7cfa6', '#c9a37c'),
  amber: warm('#ffe2b0', '#e3b487', '#b9836a'),
  blush: warm('#fdeae0', '#edcab6', '#d2a088'),
  honey: warm('#ffedc4', '#edcf94', '#caa05e')
};
const PRODUCTS = [{
  id: 'creoles-soleil',
  cat: "Boucles d'oreilles",
  name: 'Créoles Soleil',
  price: 24.9,
  was: 32,
  badge: 'Nouveau',
  bv: 'gold',
  rating: 4.5,
  count: 128,
  grad: GRADS.gold
}, {
  id: 'camelia-poudre',
  cat: 'Cache-boutons',
  name: 'Camélia Poudré',
  price: 16.9,
  badge: 'Best-seller',
  bv: 'rose',
  rating: 5,
  count: 64,
  grad: GRADS.rose
}, {
  id: 'collier-riviera',
  cat: 'Colliers',
  name: 'Collier Riviera',
  price: 29.9,
  rating: 4.5,
  count: 41,
  grad: GRADS.sand
}, {
  id: 'jonc-azur',
  cat: 'Bracelets',
  name: "Jonc d'Azur",
  price: 22.5,
  badge: '−20%',
  bv: 'sale',
  was: 28,
  rating: 4,
  count: 33,
  grad: GRADS.amber
}, {
  id: 'puces-lumiere',
  cat: "Boucles d'oreilles",
  name: 'Puces Lumière',
  price: 18.9,
  rating: 5,
  count: 97,
  grad: GRADS.honey
}, {
  id: 'bague-mistral',
  cat: 'Bagues',
  name: 'Bague Mistral',
  price: 26.0,
  badge: 'Nouveau',
  bv: 'gold',
  rating: 4.5,
  count: 52,
  grad: GRADS.blush
}, {
  id: 'cache-perle',
  cat: 'Cache-boutons',
  name: 'Cache-bouton Perle',
  price: 14.9,
  rating: 4.5,
  count: 76,
  grad: GRADS.sand
}, {
  id: 'medaille-ete',
  cat: 'Colliers',
  name: "Médaille d'Été",
  price: 27.5,
  badge: 'Best-seller',
  bv: 'rose',
  rating: 5,
  count: 88,
  grad: GRADS.gold
}];
const CATEGORIES = [{
  name: "Boucles d'oreilles",
  grad: GRADS.gold
}, {
  name: 'Colliers',
  grad: GRADS.rose
}, {
  name: 'Bracelets',
  grad: GRADS.amber
}, {
  name: 'Cache-boutons',
  grad: GRADS.sand
}];
const Sun = ({
  s = 26,
  c = '#cda152'
}) => /*#__PURE__*/React.createElement("svg", {
  width: s,
  height: s,
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: c,
  strokeWidth: "1.3",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "32",
  cy: "32",
  r: "10.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "32",
  y1: "6",
  x2: "32",
  y2: "13.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "32",
  y1: "50.5",
  x2: "32",
  y2: "58"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "32",
  x2: "13.5",
  y2: "32"
}), /*#__PURE__*/React.createElement("line", {
  x1: "50.5",
  y1: "32",
  x2: "58",
  y2: "32"
}), /*#__PURE__*/React.createElement("line", {
  x1: "13.4",
  y1: "13.4",
  x2: "18.7",
  y2: "18.7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "45.3",
  y1: "45.3",
  x2: "50.6",
  y2: "50.6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "50.6",
  y1: "13.4",
  x2: "45.3",
  y2: "18.7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18.7",
  y1: "45.3",
  x2: "13.4",
  y2: "50.6"
}));

// Icônes Lucide (trait fin)
const Icon = {
  search: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.5-3.5"
  })),
  user: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4 3.5-6 8-6s8 2 8 6"
  })),
  heart: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z"
  })),
  bag: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 7h12l-1 13H7L6 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 7a3 3 0 0 1 6 0"
  })),
  close: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })),
  menu: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M3 12h18M3 18h18"
  })),
  arrow: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  truck: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.3"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 7h11v9H3zM14 10h4l3 3v3h-7z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "18",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "18",
    r: "1.6"
  })),
  gem: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.3"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 3h12l3 6-9 12L3 9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 9h18M9 3 7 9l5 12 5-12-2-6"
  })),
  leaf: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.3"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M4 20c0-9 7-15 16-15 0 9-6 16-16 15z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 15c2-2 5-3 8-3"
  }))
};
Object.assign(window, {
  GRADS,
  PRODUCTS,
  CATEGORIES,
  Sun,
  Icon,
  warm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/boutique/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

})();

/* ══════════════════════════════════
   VÈLO — script.js
══════════════════════════════════ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

// ── PRODUCT GRID RENDERING ──
function buildCardHTML(p) {
  const badge = p.badgeType && p.badgeType !== 'none'
    ? `<span class="p-badge ${veloBadgeClass(p.badgeType)}">${p.badgeLabel}</span>` : '';
  const priceBlock = p.oldPrice
    ? `<span class="p-price">${veloFormatPrice(p.price)}</span><span class="p-was">${veloFormatPrice(p.oldPrice)}</span>`
    : `<span class="p-price">${veloFormatPrice(p.price)}</span>`;
  const swatches = (p.colors || []).map(c => `<div class="p-swatch" style="background:${c}"></div>`).join('');
  const sizes = (p.sizes || []).map(s => `<span class="size-chip" onclick="event.stopPropagation()">${s}</span>`).join('');

  return `
    <div class="p-card" onclick="openModalById('${p.id}')">
      <div class="p-img-wrap">
        <img class="p-img" src="${p.img}" alt="${p.name}" loading="lazy"/>
        <img class="p-img-alt" src="${p.imgAlt}" alt="${p.name} alt" loading="lazy"/>
        ${badge}
        <div class="p-actions">
          <button class="p-action-btn" onclick="toggleWish(event,this)" title="Wishlist">♡</button>
          <button class="p-action-btn" onclick="event.stopPropagation();openModalById('${p.id}')" title="Quick view">⊙</button>
        </div>
        <div class="p-sizes">${sizes}</div>
      </div>
      <div class="p-info">
        <div class="p-meta">
          <div>
            <div class="p-name">${p.name}</div>
            <div class="p-cat">${p.category} · ${p.material}</div>
          </div>
          <div class="p-price-block">${priceBlock}</div>
        </div>
        <div class="p-colors">${swatches}</div>
        <button class="p-add" onclick="event.stopPropagation();addToCart('${p.name.replace(/'/g, "\\'")}')">Add to Bag</button>
      </div>
    </div>`;
}

function renderProductGrid(filterFn) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  let products = veloGetProducts();
  if (typeof filterFn === 'function') products = products.filter(filterFn);
  grid.innerHTML = products.map(buildCardHTML).join('');
}

function openModalById(id) {
  const p = veloGetProducts().find(p => p.id === id);
  if (!p) return;
  openModal(p.name, p.category + ' · ' + p.material, veloFormatPrice(p.price), p.img);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productGrid')) renderProductGrid();
});

// ── CART ──
let cartCount = 0;

function addToCart(name) {
  cartCount++;
  const el = document.getElementById('cartNum');
  el.textContent  = cartCount;
  el.style.display = 'inline';
  showToast('✦ ' + name + ' added to bag');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── WISHLIST ──
function toggleWish(e, btn) {
  e.stopPropagation();
  const on = btn.classList.toggle('wishlisted');
  btn.textContent = on ? '♥' : '♡';
  showToast(on ? '♥ Added to wishlist' : 'Removed from wishlist');
}

// ── GRID VIEW TOGGLE ──
function setView(cols, btn) {
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const g = document.getElementById('productGrid');
  g.className = 'product-grid view-' + cols;
}

// ── HERO VIDEO MUTE ──
let muted = true;

function toggleMute() {
  const v = document.getElementById('heroVideo');
  muted   = !muted;
  v.muted = muted;
  document.getElementById('muteBtn').textContent = muted ? '🔇' : '🔊';
}

// ── QUICK-VIEW MODAL ──
let modalProductName = '';

function openModal(name, cat, price, img) {
  modalProductName = name;
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalCat').textContent   = cat;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalImg').src           = img;
  document.getElementById('modal').classList.add('open');
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

function selSize(el) {
  document.querySelectorAll('.modal-size').forEach(s => s.classList.remove('sel'));
  el.classList.add('sel');
}

function addFromModal() {
  addToCart(modalProductName);
  closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── SIDEBAR COLOR DOTS ──
document.querySelectorAll('.color-dot').forEach(d => {
  d.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(x => x.classList.remove('sel'));
    d.classList.add('sel');
  });
});

// ── PRICE RANGE SLIDER ──
const slider = document.querySelector('.range-slider');
const labels = document.querySelectorAll('.range-labels span');

if (slider) {
  slider.addEventListener('input', () => {
    const v   = slider.value;
    const pct = (v / 2000) * 100;
    labels[1].textContent   = '$' + parseInt(v).toLocaleString();
    slider.style.background = `linear-gradient(to right, var(--gold) ${pct}%, var(--sand) ${pct}%)`;
  });
}

// ── SCROLL-TRIGGERED NAV SHADOW ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(249,246,241,0.97)';
    nav.style.boxShadow  = '0 2px 24px rgba(17,16,16,.07)';
  } else {
    nav.style.background = 'rgba(249,246,241,0.82)';
    nav.style.boxShadow  = 'none';
  }
});

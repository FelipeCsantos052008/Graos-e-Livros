// O conteúdo da página está no index.html.
// Este arquivo cuida só das interações: filtro, busca, favoritos, sacola e janelas.

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

let category = 'Todos';
let query = '';
const favorites = new Set();
const cart = new Set();

const grid  = $('#grid');
const cards = $$('.book-card', grid);
const bookById = id => cards.find(c => c.dataset.id === String(id));

/* ---------- filtro e busca ---------- */
function applyFilter() {
  const q = query.trim().toLowerCase();
  let n = 0;
  cards.forEach(c => {
    const okCat = category === 'Todos' || c.dataset.category === category;
    const okQ = !q || `${c.dataset.title} ${c.dataset.author}`.toLowerCase().includes(q);
    c.hidden = !(okCat && okQ);
    if (!c.hidden) n++;
  });
  $('#count').textContent = `${n} títulos`;
  $$('.pills button').forEach(b => b.classList.toggle('selected', b.dataset.cat === category));
}

$$('.search-input').forEach(input => {
  input.addEventListener('input', () => {
    query = input.value;
    $$('.search-input').forEach(o => { if (o !== input) o.value = query; });
    applyFilter();
  });
});

/* ---------- favoritos ---------- */
function renderFavorites() {
  const box = $('#favGrid');
  box.innerHTML = '';
  if (!favorites.size) {
    box.innerHTML = '<div class="favorite-empty"><p>Salve os livros que despertarem sua curiosidade.</p></div>';
  } else {
    cards.filter(c => favorites.has(+c.dataset.id)).forEach(c => {
      const copy = c.cloneNode(true);
      copy.hidden = false;
      box.append(copy);
    });
  }
  $('#favCount').textContent = `${favorites.size} salvos`;
  $$('.heart').forEach(h => h.classList.toggle('active', favorites.has(+h.closest('.book-card').dataset.id)));
}

/* ---------- sacola ---------- */
function addToCart(id) {
  cart.add(+id);
  const badge = $('#cartCount');
  badge.textContent = cart.size;
  badge.hidden = false;
  toast('Livro adicionado à sacola');
}

function renderCart() {
  const list = $('#cartList');
  if (!cart.size) {
    list.innerHTML = '<div class="empty"><h3>Sua sacola está vazia.</h3><p>Escolha uma história para começar.</p></div>';
    return;
  }
  list.innerHTML = [...cart].map(id => {
    const c = bookById(id);
    return `<div class="cart-row"><img src="${c.querySelector('img').getAttribute('src')}" alt=""><div><b>${c.dataset.title}</b><span>${c.dataset.author}</span><strong>R$ ${c.dataset.price}</strong></div></div>`;
  }).join('');
}

/* ---------- janelas ---------- */
const open  = el => { el.hidden = false; };
const closeAll = () => $$('.modal-backdrop, .drawer-backdrop').forEach(m => m.hidden = true);

function openDetail(card) {
  $('#dImg').src = card.querySelector('img').getAttribute('src');
  $('#dImg').alt = card.dataset.title;
  $('#dCat').textContent = `${card.dataset.category} • USADO`;
  $('#dTitle').textContent = card.dataset.title;
  $('#dAuthor').textContent = card.dataset.author;
  $('#dPrice').textContent = `R$ ${card.dataset.price}`;
  $('#dAdd').dataset.id = card.dataset.id;
  open($('#detailModal'));
}

function toast(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
}

/* ---------- cliques (um único listener) ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  let el;

  // fecha ao clicar no fundo escuro ou no X
  if (t.classList.contains('modal-backdrop') || t.classList.contains('drawer-backdrop') || t.closest('[data-close]')) {
    closeAll(); return;
  }
  if ((el = t.closest('[data-scroll]'))) {
    $('#' + el.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
    $('#mobileNav').hidden = true; return;
  }
  if ((el = t.closest('[data-cat]'))) {
    category = el.dataset.cat;
    applyFilter();
    $('#catalogo').scrollIntoView({ behavior: 'smooth' }); return;
  }
  if ((el = t.closest('.heart'))) {
    const id = +el.closest('.book-card').dataset.id;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    renderFavorites(); return;
  }
  if ((el = t.closest('.add-btn'))) {
    addToCart(el.closest('.book-card').dataset.id); return;
  }
  if ((el = t.closest('[data-open]'))) {
    openDetail(el.closest('.book-card')); return;
  }
  if (t.closest('#dAdd')) {
    addToCart($('#dAdd').dataset.id); closeAll(); return;
  }
  if (t.closest('#bag')) {
    renderCart(); open($('#drawer')); return;
  }
  if (t.closest('[data-sell]')) {
    $('#mobileNav').hidden = true; open($('#sellModal')); return;
  }
  if (t.closest('#menu')) {
    $('#mobileNav').hidden = !$('#mobileNav').hidden; return;
  }
  if (t.closest('.logo-link')) {
    e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' });
  }
});

$('#sf').addEventListener('submit', e => {
  e.preventDefault();
  e.target.reset();
  closeAll();
  toast('Anúncio enviado para demonstração');
});

window.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

// se uma imagem não carregar, esconde o ícone quebrado e deixa o fundo da capa aparecer
document.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);
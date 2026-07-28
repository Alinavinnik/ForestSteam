const openBtnEl = document.querySelector('[data-menu-open]');
const closeBtnEl = document.querySelector('[data-menu-close]');
const menuEl = document.querySelector('[data-menu]');
const burgerEl = document.querySelector('[data-burger]');
const menuLinksEl = document.querySelectorAll('[data-menu-link]');

openBtnEl.addEventListener('click', toggleMenu);
closeBtnEl.addEventListener('click', toggleMenu);

menuEl.addEventListener('click', e => {
  if (e.target === menuEl) {
    toggleMenu();
  }
});

menuLinksEl.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

function toggleMenu() {
  const isOpen = menuEl.dataset.visible === 'open';

  menuEl.dataset.visible = isOpen ? 'close' : 'open';
  burgerEl.dataset.visible = isOpen ? 'show' : 'hide';

  document.body.classList.toggle('no-scroll', !isOpen);
}

// анімація бургера
const hotspotEl = document.querySelector('[data-hero-hotspot]');
const burgerAnimationEl = document.querySelector('[data-hero-burger]');

if (hotspotEl && burgerAnimationEl) {
  hotspotEl.addEventListener('mouseenter', () => {
    burgerAnimationEl.dataset.animation = 'show';
  });

  hotspotEl.addEventListener('mouseleave', () => {
    burgerAnimationEl.dataset.animation = 'hide';
  });
}

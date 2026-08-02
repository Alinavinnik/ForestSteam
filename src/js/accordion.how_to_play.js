export default function () {
  const items = document.querySelectorAll('[data-slide]');
  const decors = document.querySelectorAll('[data-active-slide]');
  const howToPlaySection = document.querySelector('[data-how-to-play]');

  items.forEach(item => {
    const title = item.querySelector('[data-slide-title]');
    if (!title) return;

    title.addEventListener('click', () => {
      const slideNumber = item.dataset.slide;

      items.forEach(el => {
        el.querySelectorAll('[data-hidden]').forEach(child => {
          child.dataset.hidden = 'true';
        });
      });

      item.querySelectorAll('[data-hidden]').forEach(child => {
        child.dataset.hidden = 'false';
      });

      decors.forEach(decor => {
        decor.dataset.activeSlide = slideNumber;
      });

      if (window.innerWidth < 1440) {
        title.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Повторювана вхідна анімація секції при кожній появі у viewport
  if (howToPlaySection) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(howToPlaySection);
  }
}

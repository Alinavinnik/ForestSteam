export default function () {
  const section = document.querySelector('[data-faq]');
  if (!section) return;

  // 1. Вхідна анімація секції — повторюється при кожній появі у viewport
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

  observer.observe(section);

  // Акордеон + плавна поява тексту відповіді
  document.querySelectorAll('[data-item]').forEach(item => {
    const answer = item.querySelector('[data-answer]');
    const summary = item.querySelector('[data-question]');
    let isAnimating = false;

    // Якщо елемент відкритий одразу при завантаженні (data-item open),
    // текст відповіді має бути одразу видимим
    if (item.open) {
      answer.classList.add('is-text-visible');
    }

    summary.addEventListener('click', e => {
      e.preventDefault();
      if (isAnimating) return;

      if (item.open) {
        collapse(item, answer);
      } else {
        expand(item, answer);
      }
    });

    function expand(item, answer) {
      item.open = true;
      isAnimating = true;

      const startHeight = 0;
      const endHeight = answer.scrollHeight;

      answer.style.overflow = 'hidden';
      answer.style.height = startHeight + 'px';

      requestAnimationFrame(() => {
        answer.style.transition = 'height 250ms ease';
        answer.style.height = endHeight + 'px';
        // Текст з'являється трохи згодом, коли контейнер уже відкривається
        setTimeout(() => {
          answer.classList.add('is-text-visible');
        }, 80);
      });

      answer.addEventListener('transitionend', function handler() {
        answer.style.height = '';
        answer.style.overflow = '';
        answer.style.transition = '';
        isAnimating = false;
        answer.removeEventListener('transitionend', handler);
      });
    }

    function collapse(item, answer) {
      isAnimating = true;
      const startHeight = answer.scrollHeight;

      answer.classList.remove('is-text-visible');

      answer.style.overflow = 'hidden';
      answer.style.height = startHeight + 'px';

      requestAnimationFrame(() => {
        answer.style.transition = 'height 250ms ease';
        answer.style.height = '0px';
      });

      answer.addEventListener('transitionend', function handler() {
        item.open = false;
        answer.style.height = '';
        answer.style.overflow = '';
        answer.style.transition = '';
        isAnimating = false;
        answer.removeEventListener('transitionend', handler);
      });
    }
  });
}

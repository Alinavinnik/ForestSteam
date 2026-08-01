document.querySelectorAll('[data-item]').forEach(item => {
  const answer = item.querySelector('[data-answer]');
  const summary = item.querySelector('[data-question]');
  let isAnimating = false;

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

export default function showGoogleBtn() {
  const headerBtn = document.querySelector('[data-visible]');
  const target = document.querySelector('[data-google-show]');

  if (!headerBtn || !target) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const passedTarget = entry.boundingClientRect.top < 0;
      headerBtn.dataset.visible =
        entry.isIntersecting || passedTarget ? 'show' : 'hide';
    });
  });

  observer.observe(target);
}

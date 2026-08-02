document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('[data-about]');

  if (!aboutSection) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.setAttribute(
          'data-visible',
          entry.isIntersecting ? 'true' : 'false'
        );
      });
    },
    {
      threshold: 0.2,
    }
  );

  observer.observe(aboutSection);
});

document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('[data-about]');

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
    {
      threshold: 0.2,
    }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }
});

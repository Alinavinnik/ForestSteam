document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('[data-about]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // анімація тільки один раз
        }
      });
    },
    {
      threshold: 0.2, // спрацьовує, коли 20% секції видно
    }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }
});

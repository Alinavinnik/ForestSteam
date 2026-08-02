import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

export default function () {
  const section = document.querySelector('[data-reviews]');
  const sliderEl = document.querySelector('[data-slider]');

  if (!section || !sliderEl) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

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
    { threshold: 0.2 }
  );

  observer.observe(section);

  // 2. Плавний перехід між слайдами
  new Swiper(sliderEl, {
    modules: [Navigation],

    slidesPerView: 1,
    spaceBetween: 16,

    speed: prefersReducedMotion ? 0 : 550, // швидкість самого слайду
    cssEase: 'ease-in-out', // плавніша крива руху замість дефолтної лінійної

    navigation: {
      nextEl: '[data-next]',
      prevEl: '[data-prev]',
      disabledClass: 'reviews-btn-disabled',
    },

    breakpoints: {
      1440: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    },

    on: {
      slideChangeTransitionStart(swiper) {
        swiper.el.classList.add('is-transitioning');
      },
      slideChangeTransitionEnd(swiper) {
        swiper.el.classList.remove('is-transitioning');
      },
    },
  });
}

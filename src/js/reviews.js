import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

new Swiper('[data-slider]', {
  modules: [Navigation],

  slidesPerView: 1,

  spaceBetween: 16,

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
});

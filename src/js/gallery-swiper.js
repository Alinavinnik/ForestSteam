import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

new Swiper('[data-gallery-swiper]', {
  modules: [Navigation],

  slidesPerView: 2,
  slidesPerGroup: 1,
  spaceBetween: 16,

  navigation: {
    nextEl: '[data-gallery-next]',
    prevEl: '[data-gallery-prev]',
    disabledClass: 'reviews-btn-disabled',
  },

  breakpoints: {
    1440: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
  },
});

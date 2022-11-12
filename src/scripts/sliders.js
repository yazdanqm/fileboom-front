import Swiper, {
  Navigation,
  Pagination,
  Thumbs
} from "swiper";
Swiper.use([Navigation, Pagination, Thumbs]);

import 'swiper/css';
import 'swiper/css/navigation';

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2.5,
    },
    1300: {
      slidesPerView: 3,
    },
  },
});


var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      spaceBetween: 15,
    }
  },
});

var swiper8 = new Swiper(".mySwiper8", {
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2.5,
    },
    1300: {
      slidesPerView: 3,
    },
  },
});

var swiperMockup = new Swiper(".swiperMockup", {
  slidesPerView: 3,
  spaceBetween: 8,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    280: {
      slidesPerView: 2.5,
    },
    768: {
      slidesPerView: 2.5,
    },
    992: {
      slidesPerView: 2.5,
    },
    1300: {
      slidesPerView: 3,
    },
  },
});

var swiperMockup = new Swiper(".swiperMockupCat", {
  slidesPerView: 1.55,
  spaceBetween: 8,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    380: {
      slidesPerView: 1.55,
    },
    477: {
      slidesPerView: 2,
    },
    992 : {
      slidesPerView: 3.5,
    }

  }
});

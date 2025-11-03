 (function(){
    const el = document.querySelector('#coffeeletter-swiper');
    if(!el) return;

    new Swiper(el, {
      speed: 600,
      loop: false,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 24,
      centeredSlides: true,
      keyboard: { enabled: true },
      pagination: { el: '.coffeeletter-swiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.coffeeletter-swiper .swiper-button-next',
        prevEl: '.coffeeletter-swiper .swiper-button-prev'
      },
      breakpoints: {
        900:  { slidesPerView: 1.05, spaceBetween: 28 },
        1280: { slidesPerView: 1.12, spaceBetween: 32 }
      }
    });
  })();
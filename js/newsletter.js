(function () {
  function initCoffeeLetterSwiper() {
    const el = document.getElementById('coffeeletter-swiper');
    if (!el) return;

    const swiper = new Swiper(el, {
      slidesPerView: 3,          // 기본값
      spaceBetween: 36,          // 슬라이드 간 간격
      centeredSlides: false,
      loop: false,
      speed: 600,
      grabCursor: true,
      keyboard: { enabled: true },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev')
      },
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        0:    { slidesPerView: 1.2, spaceBetween: 20 },
        640:  { slidesPerView: 2.0, spaceBetween: 24 },
        960:  { slidesPerView: 3.0, spaceBetween: 32 },
        1280: { slidesPerView: 4.0, spaceBetween: 36 } /* 넓은 화면에서 더 많이 */
      }
    });

    // raise 효과: 대상 요소를 .paper로 변경
  el.querySelectorAll('.paper').forEach((card)=>{
    const slide = card.closest('.swiper-slide');
    if (!slide) return;
    const up   = () => slide.classList.add('raise');
    const down = () => slide.classList.remove('raise');
    card.addEventListener('mouseenter', up);
    card.addEventListener('mouseleave', down);
    card.addEventListener('focusin',   up);
    card.addEventListener('focusout',  down);
  });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoffeeLetterSwiper);
  } else {
    initCoffeeLetterSwiper();
  }
})();
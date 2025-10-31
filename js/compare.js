(function () {
  function initCompare() {
    // 카드 안의 Swiper들을 초기화 (각 카드별로 개별 pagination 바인딩)
    document.querySelectorAll('.compare-card.is-swiper .compareSwiper').forEach((el) => {
      const paginationEl = el.querySelector('.swiper-pagination');

      const swp = new Swiper(el, {
        slidesPerView: 1,
        speed: 700,
        loop: true,
        effect: 'fade',
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: paginationEl, clickable: true }
      });

      // 현재 슬라이드의 data-kicker/data-title를 카드 텍스트에 반영
      const card = el.closest('.compare-card');
      const kickerEl = card.querySelector('.compare-card__kicker');
      const titleEl  = card.querySelector('.compare-card__title');

      const applyText = () => {
        // loop 모드에서는 실제 슬라이드를 구할 때 loopedSlides 오프셋 고려
        const real = swp.realIndex;
        const slideEl = swp.slides[real + swp.loopedSlides];
        const k = slideEl?.getAttribute('data-kicker') || kickerEl.textContent;
        const t = slideEl?.getAttribute('data-title')  || titleEl.textContent;
        kickerEl.textContent = k;
        titleEl.textContent  = t;
      };

      swp.on('init', applyText);
      swp.on('slideChangeTransitionStart', applyText);
      // Swiper 11에서는 init 이벤트가 즉시 발생하지 않을 수 있어 직접 호출
      applyText();
    });
  }

  // 전역에서도 호출 가능하게 노출
  window.initCompare = initCompare;

  // DOM 로드 후 자동 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompare);
  } else {
    initCompare();
  }
})();

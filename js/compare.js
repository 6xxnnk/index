// compare-and-notebook.js
(function () {
  function initCompare() {
    // 카드 내부 스와이퍼 초기화
    document.querySelectorAll('.compare-card.is-swiper .compareSwiper').forEach((el) => {
      const paginationEl = el.querySelector('.swiper-pagination');
      const prevEl = el.querySelector('.swiper-button-prev');
      const nextEl = el.querySelector('.swiper-button-next');

      const options = {
        slidesPerView: 1,
        speed: 700,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: false,
        pagination: paginationEl ? { el: paginationEl, clickable: true } : undefined,
        navigation: (prevEl && nextEl) ? { prevEl, nextEl } : undefined,
        keyboard: { enabled: true },
      };

      const swp = new Swiper(el, options);

      // 현재 슬라이드의 data-kicker/data-title를 카드 텍스트에 반영
      const card = el.closest('.compare-card');
      const kickerEl = card ? card.querySelector('.compare-card__kicker') : null;
      const titleEl  = card ? card.querySelector('.compare-card__title')  : null;

      const applyText = () => {
        if (!kickerEl && !titleEl) return;

        // loop 환경에서 원본 슬라이드만 대상으로 realIndex 매칭
        const real = swp.realIndex;
        const realSlides = el.querySelectorAll('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)');
        const slideEl = realSlides[real];

        const k = slideEl?.getAttribute('data-kicker') ?? kickerEl?.textContent ?? '';
        const t = slideEl?.getAttribute('data-title')  ?? titleEl?.textContent  ?? '';

        if (kickerEl) kickerEl.textContent = k;
        if (titleEl)  titleEl.textContent  = t;
      };

      swp.on('init', applyText);
      swp.on('slideChangeTransitionStart', applyText);
      applyText();
    });

    // 커피 레터(모레스킨) 카드 hover 시 해당 슬라이드 z-index 올리기
    document.querySelectorAll('.moleskine-notebook').forEach((nb) => {
      const slide = nb.closest('.swiper-slide');
      if (!slide) return;

      const up = () => slide.classList.add('raise');
      const down = () => slide.classList.remove('raise');

      nb.addEventListener('mouseenter', up);
      nb.addEventListener('mouseleave', down);
      nb.addEventListener('focusin', up);
      nb.addEventListener('focusout', down);
    });
  }

  // 전역 노출
  window.initCompare = initCompare;

  // DOM 로드 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompare);
  } else {
    initCompare();
  }
})();
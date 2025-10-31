(function () {
  function initCompare() {
    document.querySelectorAll('.compare-card.is-swiper .compareSwiper').forEach((el) => {
      const paginationEl = el.querySelector('.swiper-pagination');
      const prevEl = el.querySelector('.swiper-button-prev');
      const nextEl = el.querySelector('.swiper-button-next');

      const swp = new Swiper(el, {
        slidesPerView: 1,
        speed: 700,
        loop: true,
        effect: 'fade',
        autoplay: false, // ✅ 자동재생 비활성화
        pagination: { el: paginationEl, clickable: true },
        navigation: { prevEl, nextEl },
        keyboard: { enabled: true },
      });

      // 슬라이드 텍스트 연동
      const card = el.closest('.compare-card');
      const kickerEl = card.querySelector('.compare-card__kicker');
      const titleEl = card.querySelector('.compare-card__title');

      const applyText = () => {
        const real = swp.realIndex;
        const slideEl = swp.slides[real + swp.loopedSlides];
        const k = slideEl?.getAttribute('data-kicker') || kickerEl?.textContent || '';
        const t = slideEl?.getAttribute('data-title') || titleEl?.textContent || '';
        if (kickerEl) kickerEl.textContent = k;
        if (titleEl) titleEl.textContent = t;
      };

      swp.on('init', applyText);
      swp.on('slideChangeTransitionStart', applyText);
      applyText();
    });
  }

  window.initCompare = initCompare;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompare);
  } else {
    initCompare();
  }
})();
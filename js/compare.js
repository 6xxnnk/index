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
        loop: true, // (기존 주석 오류 정리)
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

    // [1-C 통합] 밀어서 장바구니 담기: 드래그 스크립트
    bindPriceCta();
  }

  // 중복 바인딩 방지 + 모바일/데스크탑 드래그 지원
  function bindPriceCta(root = document) {
    const wraps = root.querySelectorAll('.price-cta');
    wraps.forEach((wrap) => {
      if (wrap.dataset.bound === '1') return; // 이미 바인딩됨
      const handle = wrap.querySelector('.price-cta__handle');
      if (!handle) return;

      let startX = 0;
      let curX = 0;
      let dragging = false;
      const threshold = 120; // 담기 임계치
      const max = 180;       // 드래그 한계

      const onDown = (e) => {
        dragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
      };

      const onMove = (e) => {
        if (!dragging) return;
        const x = (e.touches ? e.touches[0].clientX : e.clientX);
        curX = Math.min(max, Math.max(0, x - startX));
        handle.style.setProperty('--dragX', curX + 'px');
        // 가로 스와이프 충돌 방지
        e.preventDefault();
      };

      const onUp = () => {
        if (!dragging) return;
        dragging = false;

        if (curX >= threshold) {
          wrap.classList.add('added');
          addToCart(wrap.dataset.productId);
          setTimeout(() => {
            handle.style.setProperty('--dragX', '0px');
            wrap.classList.remove('added');
            curX = 0;
          }, 1100);
        } else {
          handle.style.setProperty('--dragX', '0px');
          curX = 0;
        }
      };

      // 포인터/마우스/터치 이벤트
      handle.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', onUp);

      handle.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);

      wrap.dataset.bound = '1';
    });
  }

  // 실제 장바구니 API 연동 지점 (필요 시 교체)
  function addToCart(productId) {
    // 예시: 프로젝트 API에 맞춰 구현
    // return fetch('/api/cart', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ productId, qty:1 })});
    console.log('add to cart:', productId || '(no id)');
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
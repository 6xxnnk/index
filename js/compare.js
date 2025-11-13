(function () {
  'use strict';

  function initCompare() {
    // --- (1) 카드 내부 스와이퍼 초기화 ---
    document.querySelectorAll('.compare-card.is-swiper .compareSwiper').forEach((el) => {
      const paginationEl = el.querySelector('.swiper-pagination');
      const prevEl = el.querySelector('.swiper-button-prev');
      const nextEl = el.querySelector('.swiper-button-next');

      const swp = new Swiper(el, {
        slidesPerView: 1,
        speed: 700,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: false,
        pagination: paginationEl ? { el: paginationEl, clickable: true } : undefined,
        navigation: (prevEl && nextEl) ? { prevEl, nextEl } : undefined,
        keyboard: { enabled: true },
      });

      // (옵션) 현재 슬라이드의 타이틀/키커를 카드 상단에 동기화하고 싶을 때 사용
      const card    = el.closest('.compare-card');
      const kickerEl = card ? card.querySelector('.compare-card__kicker') : null;
      const titleEl  = card ? card.querySelector('.compare-card__title')  : null;

      const applyText = () => {
        if (!kickerEl && !titleEl) return;
        const active = swp.slides[swp.activeIndex];
        if (!active) return;

        // 우선순위: 슬라이드 내부 텍스트 > data-attr
        const k =
          (active.querySelector('.swiper-slide__kicker')?.textContent || '').trim() ||
          active.getAttribute('data-kicker') || '';
        const t =
          (active.querySelector('.swiper-slide__title')?.textContent || '').trim() ||
          active.getAttribute('data-title') || '';

        if (kickerEl) kickerEl.textContent = k;
        if (titleEl)  titleEl.textContent  = t;
      };

      swp.on('init', applyText);
      swp.on('slideChangeTransitionStart', applyText);
      applyText();
    });

    // --- (2) 커피 레터(모레스킨) 카드 hover 시 z-index 상승 ---
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

    // --- (3) 장바구니 버튼 바인딩 & 토스트 노출 ---
    bindAddBag();

    // --- (4) dock 하단바 활성 표시 토글 ---
    document.querySelectorAll('.dock__item').forEach((it) => {
      it.addEventListener('click', () => {
        document.querySelectorAll('.dock__item').forEach((i) => i.classList.remove('is-active'));
        it.classList.add('is-active');
      });
    });
  }


  // 새 장바구니 버튼(.addbag-btn) 클릭 → addToCart + 토스트
  function bindAddBag(root = document) {
    root.querySelectorAll('.addbag-btn').forEach((btn) => {
      if (btn.dataset.bound === '1') return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId   = btn.dataset.productId;
        const productName = btn.dataset.productName || '상품';

        addToCart(productId);
        showCartToast(`장바구니에 추가 !`);
      });
      btn.dataset.bound = '1';
    });
  }

  // 실제 장바구니 API 연동 지점 (필요 시 교체)
  function addToCart(productId) {
    // 예시:
    // return fetch('/api/cart', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId, qty: 1 })
    // });
    console.log('add to cart:', productId || '(no id)');
  }

  // 하단 고정바 높이(--dock-h) 위로 토스트 노출
  function showCartToast(message) {
  // 기존 토스트 제거(중첩 방지)
  document.querySelectorAll('.cart-toast--compare').forEach((n) => n.remove());

  const toast = document.createElement('div');
  toast.className = 'cart-toast--compare';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2300);
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
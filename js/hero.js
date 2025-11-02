(() => {
  function initHero() {
    console.log("✅ initHero() start");

    if (typeof Swiper === "undefined" || typeof gsap === "undefined") {
      console.warn("⚠ Swiper or GSAP not loaded");
      return;
    }

    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      loop: true,
      effect: "fade",
      speed: 1000,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      on: {
        init: () => fadeSlide(0),
        slideChangeTransitionStart: function () {
          fadeSlide(this.realIndex);
        },
      },
    });

    // ✅ 복제/원본 슬라이드를 인덱스로 동시 타겟팅
    function fadeSlide(realIndex) {
      // 1) 전부 먼저 숨김
      document.querySelectorAll(".swiper-slide .hero__caption, .swiper-slide .hero__btn")
        .forEach(el => gsap.set(el, { opacity: 0 }));

      // 2) 현재 realIndex와 일치하는 모든 슬라이드(원본+복제)를 모두 노출
      const currentSlides = document.querySelectorAll(
        `.swiper-slide[data-swiper-slide-index="${realIndex}"]`
      );

      currentSlides.forEach(slide => {
        const caption = slide.querySelector(".hero__caption");
        const btn = slide.querySelector(".hero__btn");
        if (!caption || !btn) return;

        gsap.to(caption, { opacity: 1, duration: 0.8, ease: "power2.out" });
        gsap.to(btn,     { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 });
      });
    }

    // “더 알아보기” 클릭 → 다음 섹션 스크롤
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".hero__btn a");
      if (!btn) return;
      e.preventDefault();
      const nextSection = document.querySelector(".section-club");
      if (nextSection) {
        window.scrollTo({ top: nextSection.offsetTop, behavior: "smooth" });
      }
    });
  }

  // 전역 등록
  window.initHero = initHero;
})();
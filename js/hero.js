(() => {
  function initHero() {
    console.log("✅ initHero() start");

    // Swiper, GSAP 로드 확인
    if (typeof Swiper === "undefined" || typeof gsap === "undefined") {
      console.warn("⚠ Swiper or GSAP not loaded");
      return;
    }

    // Swiper 초기화
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      loop: true,
      effect: "fade",
      speed: 1000,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      on: {
        init: () => animateSlide(0),
        slideChangeTransitionStart: function () {
          animateSlide(this.realIndex);
        },
      },
    });

    // ✅ 슬라이드별 텍스트/버튼 등장 애니메이션
    function animateSlide(index) {
      const slides = document.querySelectorAll(".swiper-slide");
      slides.forEach((slide, i) => {
        const caption = slide.querySelector(".hero__caption");
        const btn = slide.querySelector(".hero__btn");

        if (i === index) {
          // 현재 활성 슬라이드
          gsap.fromTo(
            caption,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );
          gsap.fromTo(
            btn,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, delay: 0.2, duration: 1, ease: "power3.out" }
          );
        } else {
          gsap.set([caption, btn], { opacity: 0 });
        }
      });
    }

    }

  // ✅ 전역 등록 (index.js에서 접근 가능)
  window.initHero = initHero;
})();
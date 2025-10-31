(function () {
  window.initNewsletter = function initNewsletter() {
    console.log("✅ initNewsletter() start");

    if (typeof gsap === "undefined" || typeof Flip === "undefined") {
      console.error("❌ GSAP or Flip not loaded");
      return;
    }
    if (typeof CustomEase !== "undefined") {
      CustomEase.create("mainEase", "M0,0 C0.65,0.05 0.36,1 1,1");
      CustomEase.create("sideEase", "M0,0 C0.86,0 0.07,1 1,1");
    }

    // DOM 캐시
    const container = document.querySelector(".container");
    const switchEl = document.getElementById("switch");
    const grid = document.getElementById("grid");
    const gridItems = document.querySelectorAll(".grid-item");
    const sliderImage = document.getElementById("slider-image");
    const sliderImageNext = document.getElementById("slider-image-next");
    const sliderImageBg = document.getElementById("slider-image-bg");
    const content = document.getElementById("content");
    const contentTitleSpan = content.querySelector(".content-title span");
    const contentParagraph = document.getElementById("content-paragraph");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const btnGrid = document.querySelector(".switch-button-grid");
    const btnSlider = document.querySelector(".switch-button-slider");

    if (!grid || !gridItems.length) {
      console.warn("⚠ Grid not found — newsletter.js halted");
      return;
    }

    // 스위치 표시 제어
    const updateSwitchVisibility = () => {
      const rect = container.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.7 && rect.bottom > 0) {
        switchEl.classList.add("is-visible");
      } else {
        switchEl.classList.remove("is-visible");
      }
    };
    window.addEventListener("scroll", updateSwitchVisibility, { passive: true });
    window.addEventListener("resize", updateSwitchVisibility);
    updateSwitchVisibility();

    // ===== 이미지 경로 보정 =====
    const imageUrls = Array.from(gridItems).map((i) => {
      let bg = i.querySelector(".grid-item-img").style.backgroundImage;
      bg = bg.replace(/^url\(["']?/, "").replace(/["']?\)$/, ""); // url() 제거
      if (bg.startsWith("../")) bg = bg.replace("../", "img/");
      return bg;
    });

    const slideContent = [
      { title: "URBAN GEOMETRY", paragraph: "The city speaks in angles and lines..." },
      { title: "NATURAL ABSTRACTIONS", paragraph: "Nature doesn't try to be beautiful..." },
      { title: "SHADOW PLAY", paragraph: "Light creates shadow. Shadow defines light..." },
      { title: "MINIMALIST FORMS", paragraph: "When we strip away the unnecessary..." },
      { title: "MONOCHROME SERIES", paragraph: "Without color, we see differently..." },
      { title: "TEXTURAL STUDIES", paragraph: "Touch with your eyes. Feel the rough and smooth..." },
    ];

    const TIMING = { BASE: 0.5, SHORT: 0.3, SHORTEST: 0.2, LONG: 0.8, STAGGER_TINY: 0.03 };

    let currentMode = "grid";
    let isAnimating = false;
    let activeIndex = 4;

    const updateContent = (idx) => {
      contentTitleSpan.textContent = slideContent[idx]?.title || "";
      contentParagraph.textContent = slideContent[idx]?.paragraph || "";
    };

    const setActiveThumb = (idx) => {
      document.querySelector(".thumbnail.active")?.classList.remove("active");
      document.querySelector(`.thumbnail[data-index="${idx}"]`)?.classList.add("active");
    };

    // ===================== MODE TOGGLE =====================
    const toggleView = (mode) => {
      if (isAnimating || currentMode === mode) return;
      isAnimating = true;
      currentMode = mode;

      document.querySelector(".switch-button-current")?.classList.remove("switch-button-current");
      (mode === "slider" ? btnSlider : btnGrid).classList.add("switch-button-current");

      (mode === "slider" ? showSliderView() : showGridView()).then(() => {
        isAnimating = false;
      });
    };

    // ===================== SLIDER VIEW =====================
    const showSliderView = () =>
      new Promise((resolve) => {
        const item = gridItems[activeIndex];
        if (!item) return resolve();
        const rect = item.getBoundingClientRect();
        const url = imageUrls[activeIndex];
        updateContent(activeIndex);

        gsap.set(sliderImage, {
          width: rect.width,
          height: rect.height,
          x: rect.left,
          y: rect.top + window.scrollY,
          opacity: 1,
          visibility: "visible",
          backgroundImage: `url(${url})`,
        });
        gsap.set(sliderImageBg, { backgroundImage: `url(${url})` });

        const h = Flip.getState(sliderImage);
        gsap.set(sliderImage, { height: "100vh", width: rect.width, x: rect.left, y: window.scrollY });
        Flip.from(h, {
          duration: TIMING.BASE,
          ease: "mainEase",
          onComplete: () => {
            const w = Flip.getState(sliderImage);
            gsap.set(sliderImage, { width: "100vw", x: 0 });
            Flip.from(w, {
              duration: TIMING.BASE,
              ease: "mainEase",
              onComplete: () => {
                gsap.to(grid, { opacity: 0, duration: TIMING.SHORTEST });
                gsap.to(content, { opacity: 1, duration: TIMING.SHORT });
                gsap.to(contentTitleSpan, { y: 0, duration: TIMING.BASE, ease: "power2.out" });
                gsap.to(contentParagraph, { opacity: 1, duration: TIMING.BASE });
                gsap.to(thumbnails, {
                  opacity: 1,
                  y: 0,
                  duration: TIMING.SHORT,
                  stagger: TIMING.STAGGER_TINY,
                });
                resolve();
              },
            });
          },
        });
      });

    // ===================== GRID VIEW =====================
    const showGridView = () =>
      new Promise((resolve) => {
        const item = gridItems[activeIndex];
        if (!item) return resolve();
        const rect = item.getBoundingClientRect();

        gsap.to(contentParagraph, { opacity: 0, duration: TIMING.SHORT });
        gsap.to(contentTitleSpan, { y: "100%", duration: TIMING.SHORT });
        gsap.to(thumbnails, { opacity: 0, y: 20, duration: TIMING.SHORT });

        const w = Flip.getState(sliderImage);
        gsap.set(sliderImage, {
          width: rect.width,
          x: rect.left,
          height: "100vh",
          y: window.scrollY,
        });

        Flip.from(w, {
          duration: TIMING.BASE,
          ease: "mainEase",
          onComplete: () => {
            const h = Flip.getState(sliderImage);
            gsap.set(sliderImage, { height: rect.height, y: rect.top + window.scrollY });
            Flip.from(h, {
              duration: TIMING.BASE,
              ease: "mainEase",
              onComplete: () => {
                gsap.to(sliderImage, {
                  opacity: 0,
                  duration: TIMING.SHORTEST,
                  onComplete: () => {
                    sliderImage.style.visibility = "hidden";
                    gsap.to(content, { opacity: 0, duration: TIMING.SHORT });
                    gsap.to(grid, { opacity: 1, duration: TIMING.SHORTEST });
                    resolve();
                  },
                });
              },
            });
          },
        });
      });

    // ===================== 즉시 슬라이드 교체 =====================
    function showSliderImmediate() {
      const url = imageUrls[activeIndex];
      updateContent(activeIndex);
      gsap.set([sliderImageNext, sliderImageBg], {
        backgroundImage: `url(${url})`,
        visibility: "visible",
        opacity: 1,
      });
      gsap.timeline()
        .to(sliderImage, { x: "-30%", duration: TIMING.LONG, ease: "mainEase" }, 0)
        .fromTo(sliderImageNext, { x: "100%" }, { x: 0, duration: TIMING.LONG, ease: "sideEase" }, 0)
        .add(() => {
          sliderImage.style.backgroundImage = `url(${url})`;
          gsap.set([sliderImageNext, sliderImageBg], { opacity: 0, visibility: "hidden", x: 0 });
        });
    }

    // ===================== 클릭 이벤트 =====================
    gridItems.forEach((item) => {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => {
        if (isAnimating) return;
        activeIndex = parseInt(item.getAttribute("data-index")) || 0;
        setActiveThumb(activeIndex);
        if (currentMode !== "slider") toggleView("slider");
        else showSliderImmediate();
      });
    });

    thumbnails.forEach((t) => {
      t.addEventListener("click", () => {
        if (isAnimating) return;
        activeIndex = parseInt(t.getAttribute("data-index")) || 0;
        setActiveThumb(activeIndex);
        if (currentMode !== "slider") toggleView("slider");
        else showSliderImmediate();
      });
    });

    btnGrid?.addEventListener("click", () => toggleView("grid"));
    btnSlider?.addEventListener("click", () => toggleView("slider"));

    console.log("✅ newsletter ready (mode:", currentMode, ")");
  };
})();
window.initNewsletter = initNewsletter;
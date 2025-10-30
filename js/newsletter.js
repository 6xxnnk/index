// ✅ newsletter.js
window.initNewsletter = function initNewsletter() {
  console.log("✅ initNewsletter() start");

  if (typeof gsap === "undefined" || typeof Flip === "undefined") {
    console.error("GSAP/Flip not loaded");
    return;
  }

  // 커스텀 이징
  if (typeof gsap === "undefined" || typeof Flip === "undefined") {
    console.error("GSAP/Flip not loaded");
    return;
  }
  <span style="color:#d00">gsap.registerPlugin(Flip, CustomEase);</span>
  if (typeof CustomEase !== "undefined") {
    CustomEase.create("mainEase", "M0,0 C0.65,0.05 0.36,1 1,1");
    CustomEase.create("sideEase", "M0,0 C0.86,0 0.07,1 1,1");
  }

  const container = document.querySelector(".container");
  const switchEl = document.getElementById("switch");

  // ✅ 스위치 노출 제어
  if (container && switchEl) {
    const updateSwitchVisibility = () => {
      const rect = container.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom > 0) {
        switchEl.classList.add("is-visible");
      } else {
        switchEl.classList.remove("is-visible");
      }
    };
    window.addEventListener("scroll", updateSwitchVisibility, { passive: true });
    window.addEventListener("resize", updateSwitchVisibility);
    updateSwitchVisibility();
  }

  // ✅ GSAP 기반 Newsletter Grid 초기화
  initNewsletterApp();
};

/* ========================== FUNCTION: initNewsletterApp ========================== */
function initNewsletterApp() {
  console.log("✅ initNewsletterApp() 실행됨");

  const TIMING = {
    BASE: 0.512,
    SHORT: 0.384,
    SHORTEST: 0.256,
    LONG: 0.768,
    STAGGER_TINY: 0.032,
    STAGGER_SMALL: 0.064,
  };

  const grid = document.getElementById("grid");
  const gridItems = document.querySelectorAll(".grid-item");
  const sliderImage = document.getElementById("slider-image");
  const sliderImageNext = document.getElementById("slider-image-next");
  const sliderImageBg = document.getElementById("slider-image-bg");
  const content = document.getElementById("content");
  const contentTitleSpan = content?.querySelector(".content-title span");
  const contentParagraph = document.getElementById("content-paragraph");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (!grid) return;

  let currentMode = "grid";
  let isAnimating = false;
  let activeIndex = 4;

  const imageUrls = Array.from(gridItems).map(
    (i) => i.querySelector(".grid-item-img").style.backgroundImage
  );

  const slideContent = [
    { title: "URBAN GEOMETRY", paragraph: "The city speaks in angles and lines..." },
    { title: "NATURAL ABSTRACTIONS", paragraph: "Nature doesn't try to be beautiful..." },
    { title: "SHADOW PLAY", paragraph: "Light creates shadow. Shadow defines light..." },
    { title: "MINIMALIST FORMS", paragraph: "When we strip away the unnecessary..." },
    { title: "MONOCHROME SERIES", paragraph: "Without color, we see differently..." },
    { title: "TEXTURAL STUDIES", paragraph: "Touch with your eyes. Feel the rough and smooth..." },
  ];

  const updateContent = (idx) => {
    if (!contentTitleSpan || !contentParagraph) return;
    contentTitleSpan.textContent = slideContent[idx]?.title || "";
    contentParagraph.textContent = slideContent[idx]?.paragraph || "";
  };

  const showSliderView = () =>
    new Promise((resolve) => {
      const activeItem = gridItems[activeIndex];
      const rect = activeItem.getBoundingClientRect();
      const url = imageUrls[activeIndex];

      sliderImage.style.backgroundImage = url;
      sliderImageBg.style.backgroundImage = url;
      updateContent(activeIndex);

      gsap.set(sliderImage, {
        width: rect.width,
        height: rect.height,
        x: rect.left,
        y: rect.top,
        opacity: 1,
        visibility: "visible",
      });

      const h = Flip.getState(sliderImage);
      gsap.set(sliderImage, { height: "100vh", y: 0, width: rect.width, x: rect.left });
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
              gsap.to(contentTitleSpan, { y: 0, duration: TIMING.BASE });
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

  const showGridView = () =>
    new Promise((resolve) => {
      const activeItem = gridItems[activeIndex];
      const rect = activeItem.getBoundingClientRect();

      gsap.to([contentParagraph], { opacity: 0, duration: TIMING.SHORT });
      gsap.to(contentTitleSpan, { y: "100%", duration: TIMING.SHORT });
      gsap.to(thumbnails, { opacity: 0, y: 20, duration: TIMING.SHORT });
      gsap.to(grid, { opacity: 1, duration: TIMING.SHORTEST });

      const w = Flip.getState(sliderImage);
      gsap.set(sliderImage, { width: rect.width, x: rect.left, height: "100vh", y: 0 });
      Flip.from(w, {
        duration: TIMING.BASE,
        ease: "mainEase",
        onComplete: () => {
          const h = Flip.getState(sliderImage);
          gsap.set(sliderImage, { height: rect.height, y: rect.top });
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
                  resolve();
                },
              });
            },
          });
        },
      });
    });
}
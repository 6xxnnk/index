window.initClub = function initClub(canAnimate) {
  const cards = document.querySelectorAll(".club-card.glossy");
  if (!cards.length) return;

  cards.forEach((card) => {
    const blurLayer = card.querySelector(".glossy__blur");
    const bgLayer   = card.querySelector(".glossy__background");
    const info      = card.querySelector(".glossy__info");

    // 안전 가드
    if (!canAnimate || !blurLayer || !bgLayer) return;

    // 초기 스타일
    gsap.set([card, blurLayer, info], { transformPerspective: 800 });
    gsap.set(blurLayer, { opacity: 0 });
    gsap.set(info, { y: 24, opacity: 0 });

    // 마우스 무브로 틸트/패럴랙스
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) - 0.5;  // -0.5 ~ 0.5
      const py = (y / r.height) - 0.5;

      gsap.to(card, { 
        rotateY: px * 8, 
        rotateX: -py * 8, 
        duration: 0.4, 
        ease: "power2.out" 
      });

      // 배경 약간 따라오기
      gsap.to(bgLayer, {
        x: px * 12,
        y: py * 12,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    // 진입/이탈 시 효과
    card.addEventListener("mouseenter", () => {
      gsap.to(blurLayer, { opacity: 0.55, duration: 0.35, ease: "power2.out" });
      gsap.to(info, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(card, { scale: 1.02, duration: 0.35, ease: "power2.out" });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to([card, bgLayer], { 
        rotateX: 0, rotateY: 0, x: 0, y: 0, scale: 1, 
        duration: 0.5, ease: "power3.out" 
      });
      gsap.to(blurLayer, { opacity: 0, duration: 0.35, ease: "power2.out" });
      gsap.to(info, { y: 24, opacity: 0, duration: 0.45, ease: "power2.out" });
    });
  });
};
window.initClub = initClub;
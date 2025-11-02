(function () {
  // 전역에 노출
  window.initClub = function initClub() {
    console.log("✅ initClub() start");

    const section = document.querySelector(".section-club");
    if (!section) throw new Error(".section-club not found");

    const grid = section.querySelector(".club__grid");
    if (!grid) throw new Error(".club__grid not found inside .section-club");

    const cards = grid.querySelectorAll(".club-card.glossy");
    console.log(`ℹ️ glossy cards found: ${cards.length}`);
    if (!cards.length) throw new Error("No .club-card.glossy cards in .club__grid");

    // ✨ 인라인 스타일 주입 금지!
    // hover 시 클래스만 토글 → 모든 위치/크기/트랜지션은 CSS가 담당
    cards.forEach((card, i) => {
      const info  = card.querySelector(".glossy__info");
      const curve = card.querySelector(".glossy__curve");
      if (!info || !curve) {
        console.warn(`⚠️ card#${i} missing`, { hasInfo: !!info, hasCurve: !!curve });
        return;
      }

      // 마우스/터치 환경 공통: 클래스 토글
      const onEnter = () => card.classList.add("is-hover");
      const onLeave = () => card.classList.remove("is-hover");

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      // 터치 지원(탭 시 토글, 바깥 클릭 시 해제)
      card.addEventListener("touchstart", (e) => {
        card.classList.toggle("is-hover");
      }, { passive: true });
      document.addEventListener("touchstart", (e) => {
        if (!card.contains(e.target)) card.classList.remove("is-hover");
      }, { passive: true });
    });

    console.log("✅ initClub() done");
  };
})();
console.log("✅ index.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM ready");

  // 순서대로 확인 후 실행
  if (typeof window.initHero === "function") {
    console.log("▶ run initHero()");
    window.initHero();
  }
  if (typeof window.initClub === "function") {
    console.log("▶ run initClub()");
    window.initClub();
  }
  if (typeof window.initNewsletter === "function") {
    console.log("▶ run initNewsletter()");
    window.initNewsletter();
  }
});
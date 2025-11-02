console.log("✅ index.js loaded");

function safeRun(name, fn) {
  try {
    console.group(`▶ ${name}()`);
    console.time(name);
    const out = fn && fn();
    console.timeEnd(name);
    console.groupEnd();
    return out;
  } catch (e) {
    console.groupEnd();
    console.error(`❌ ${name}() failed:`, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM ready");
  safeRun("initHero", window.initHero);
  safeRun("initClub", window.initClub);
});

// 전역 에러/Promise 에러 잡아서 무조건 표시
window.addEventListener("error", (e) => {
  console.error("❌ window error:", e.message, e.error);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("❌ unhandled rejection:", e.reason);
});
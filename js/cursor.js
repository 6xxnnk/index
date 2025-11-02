
  const cursor = document.querySelector(".cursor");

function setCursorPosition(left, top) {
  gsap.to(cursor, 0.4, {
    left: `${left}px`,
    top: `${top}px`,
  });
}
window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, 0.4, {
    opacity: 1,
    delay: 0.2,
  });
  setCursorPosition(e.clientX, e.clientY);
});


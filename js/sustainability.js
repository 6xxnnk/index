document.addEventListener("DOMContentLoaded", () => {
  const handles = document.querySelectorAll(".pill__handle");

  handles.forEach((handle) => {
    const pillCTA = handle.parentElement;
    const pill = pillCTA.closest(".pill");
    const itemName = pill.dataset.item;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    handle.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      handle.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      if (currentX < 0) currentX = 0;
      if (currentX > 70) currentX = 70; // 최대 이동거리
      handle.style.transform = `translateX(${currentX}px)`;
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;

      if (currentX > 60) {
        pillCTA.classList.add("success");
        handle.style.transform = `translateX(70px)`;
        handle.style.background = "#78d6a0";

        // 장바구니 알림
        const addedMsg = document.createElement("div");
        addedMsg.className = "cart-toast";
        addedMsg.textContent = `${itemName} 장바구니에 추가됨 🛒`;
        document.body.appendChild(addedMsg);
        setTimeout(() => addedMsg.remove(), 2200);
      } else {
        handle.style.transition = "transform 0.4s ease";
        handle.style.transform = "translateX(0)";
      }
    });
  });
});
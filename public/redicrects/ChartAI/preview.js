const stage = document.querySelector("[data-stage]");
const choices = Array.from(document.querySelectorAll('.screen-picker input[name="screen"]'));
const movement = window.matchMedia("(prefers-reduced-motion: no-preference)");
let gesture;

stage.dataset.swipe = "";

stage.addEventListener("pointerdown", (event) => {
  if (!event.isPrimary || event.button !== 0) return;

  gesture = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    screen: event.target.closest("[data-screen]")?.dataset.screen,
  };

  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", (event) => {
  if (event.pointerId !== gesture?.pointerId || !movement.matches) return;

  const dx = event.clientX - gesture.x;
  const dy = event.clientY - gesture.y;
  if (Math.abs(dx) < Math.max(8, Math.abs(dy)) && !stage.hasAttribute("data-dragging")) return;

  stage.dataset.dragging = "";
  const offset = Math.max(-100, Math.min(100, dx * .55));
  stage.style.setProperty("--drag-offset", `${offset}px`);
});

stage.addEventListener("pointerup", (event) => {
  if (event.pointerId !== gesture?.pointerId) return;

  const dx = event.clientX - gesture.x;
  const dy = event.clientY - gesture.y;

  if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy)) {
    const current = choices.findIndex((choice) => choice.checked);
    const next = current + (dx < 0 ? 1 : -1);
    if (choices[next]) choices[next].checked = true;
  } else if (Math.hypot(dx, dy) < 8 && gesture.screen) {
    const choice = choices.find((option) => option.value === gesture.screen);
    if (choice) choice.checked = true;
  }

  endGesture();
});

stage.addEventListener("lostpointercapture", (event) => {
  if (event.pointerId === gesture?.pointerId) endGesture();
});

function endGesture() {
  delete stage.dataset.dragging;
  stage.style.removeProperty("--drag-offset");
  gesture = undefined;
}

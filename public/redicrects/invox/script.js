const tabs = [...document.querySelectorAll("[role=tab]")];
const screens = [...document.querySelectorAll(".app-screen")];
const descriptions = {
  track: "See paid and unpaid invoices, with your outstanding balance in view.",
  create:
    "Choose a client, add your work and set the details for your invoice.",
  send: "Preview your PDF, then share it with your client or print a copy.",
};
function selectScreen(key) {
  tabs.forEach((t) => {
    const selected = t.dataset.screen === key;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
  });
  screens.forEach((s) =>
    s.classList.toggle("selected", s.dataset.screen === key),
  );
  document.querySelector("#screen-description").textContent = descriptions[key];
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectScreen(t.dataset.screen));
  t.addEventListener("keydown", (e) => {
    let index;
    if (e.key === "ArrowRight") index = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") index = (i + tabs.length - 1) % tabs.length;
    else if (e.key === "Home") index = 0;
    else if (e.key === "End") index = tabs.length - 1;
    else return;
    e.preventDefault();
    selectScreen(tabs[index].dataset.screen);
    tabs[index].focus();
  });
});
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("entered");
          observer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll(".product-showcase")
    .forEach((el) => observer.observe(el));
}
// Native details remain usable without JavaScript; pointer actions get a short, interruptible transition.
document.querySelectorAll(".faq-list details").forEach((details) => {
  const summary = details.querySelector("summary");
  const body = details.querySelector(".faq-body");
  let wanted = details.open;
  let animation;
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    wanted = !wanted;
    const startHeight = details.open ? body.getBoundingClientRect().height : 0;
    if (animation) {
      animation.cancel();
      animation = undefined;
    }
    if (
      event.detail === 0 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      details.open = wanted;
      return;
    }
    if (wanted) details.open = true;
    const endHeight = wanted ? body.scrollHeight : 0;
    const current = body.animate(
      [
        { height: startHeight + "px", opacity: wanted ? 0.45 : 1 },
        { height: endHeight + "px", opacity: wanted ? 1 : 0 },
      ],
      { duration: 200, easing: "cubic-bezier(.23,1,.32,1)" },
    );
    animation = current;
    current.onfinish = () => {
      if (animation !== current) return;
      details.open = wanted;
      animation = undefined;
    };
  });
});

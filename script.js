const modules = document.querySelectorAll(".module");

modules.forEach((module) => {
  module.addEventListener("click", () => {
    modules.forEach((item) => item.classList.remove("active"));
    module.classList.add("active");
  });
});

const form = document.querySelector(".lead-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  button.textContent = "Заявка отправлена";
  button.disabled = true;
});

const revealItems = document.querySelectorAll(".reveal-left, .reveal-right");
const counters = document.querySelectorAll("[data-count]");
const animatedCounters = new WeakSet();

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.round(target * eased)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      entry.target.querySelectorAll("[data-count]").forEach((counter) => {
        if (animatedCounters.has(counter)) return;
        animatedCounters.add(counter);
        animateCounter(counter);
      });
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

counters.forEach((counter) => {
  const parent = counter.closest(".reveal-left, .reveal-right") || counter;
  if (!parent.classList.contains("reveal-left") && !parent.classList.contains("reveal-right")) {
    observer.observe(parent);
  }
});

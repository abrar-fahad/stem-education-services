const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const savedTheme = localStorage.getItem("af-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  if (themeBtn) themeBtn.textContent = "Light";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("af-theme", isDark ? "dark" : "light");
    themeBtn.textContent = isDark ? "Light" : "Dark";
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const counters = document.querySelectorAll("[data-count]");

if ("IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.count);

        if (!Number.isFinite(target)) {
          element.textContent = element.dataset.count;
          countObserver.unobserve(element);
          return;
        }

        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 45));

        const timer = setInterval(() => {
          current += increment;

          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          element.textContent = `${current}+`;
        }, 24);

        countObserver.unobserve(element);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => countObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    counter.textContent = Number.isFinite(target) ? `${target}+` : counter.dataset.count;
  });
}

const previewBtn = document.getElementById("previewAnswerBtn");
const previewAnswer = document.getElementById("previewAnswer");

if (previewBtn && previewAnswer) {
  previewBtn.addEventListener("click", () => {
    previewAnswer.classList.toggle("show-answer");
    previewBtn.textContent = previewAnswer.classList.contains("show-answer")
      ? "Hide Answer"
      : "Reveal Answer";
  });
}

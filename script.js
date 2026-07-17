const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const taipeiDateParts = new Intl.DateTimeFormat("en", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());
const taipeiDateValues = Object.fromEntries(
  taipeiDateParts.map(({ type, value }) => [type, value]),
);
const taipeiDate = `${taipeiDateValues.year}-${taipeiDateValues.month}-${taipeiDateValues.day}`;

const eventSection = document.querySelector("[data-event-section]");
const eventCards = eventSection?.querySelectorAll("[data-event-date]") ?? [];

eventCards.forEach((eventCard) => {
  if (eventCard.dataset.eventDate < taipeiDate) eventCard.remove();
});

if (eventSection && !eventSection.querySelector("[data-event-date]")) {
  eventSection.remove();
  document.querySelector("[data-event-nav]")?.remove();
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -50px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

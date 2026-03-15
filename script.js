/* ============================================================
   KargouSoft — script.js
   ============================================================ */
"use strict";

/* ---- THEME ---- */
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("ks-theme") || "light";
html.setAttribute("data-theme", savedTheme);
applyIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("ks-theme", next);
  applyIcon(next);
});

function applyIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  themeToggle.title =
    theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";
}

/* ---- NAVBAR ---- */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.style.boxShadow =
      window.scrollY > 10
        ? "0 4px 20px rgba(0,0,0,0.13)"
        : "0 2px 12px rgba(0,0,0,0.08)";
  }
  if (backToTop) backToTop.classList.toggle("show", window.scrollY > 400);

  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute("id");
  });
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.classList.toggle("active", href === `#${current}`);
    }
  });
});

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
  });
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (e) => {
    if (navbar && !navbar.contains(e.target)) closeMenu();
  });
}

function closeMenu() {
  if (hamburger) hamburger.classList.remove("open");
  if (navMenu) navMenu.classList.remove("open");
}

/* ---- HERO CAROUSEL ---- */
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

if (slides.length > 0) {
  let cur = 0,
    timer = null;

  function goTo(i) {
    slides[cur].classList.remove("active");
    dots[cur].classList.remove("active");
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add("active");
    dots[cur].classList.add("active");
  }
  function start() {
    timer = setInterval(() => goTo(cur + 1), 4000);
  }
  function reset() {
    clearInterval(timer);
    start();
  }

  dots.forEach((d) =>
    d.addEventListener("click", () => {
      goTo(parseInt(d.dataset.index));
      reset();
    }),
  );
  start();
}

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      if (formSuccess) {
        formSuccess.classList.add("show");
        setTimeout(() => formSuccess.classList.remove("show"), 5000);
      }
    }, 1500);
  });
}

/* ---- BACK TO TOP ---- */
if (backToTop) {
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* ---- FOOTER YEAR ---- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll(
  ".service-card, .product-card, .portfolio-item, .blog-card, .about-grid, .contact-info-wrap, .contact-form-wrap",
);

if (revealEls.length > 0) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.5s ease ${entry.target.dataset.delay || "0s"} forwards`;
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07 },
  );

  revealEls.forEach((el, i) => {
    el.style.opacity = "0";
    el.dataset.delay = `${(i % 3) * 0.08}s`;
    obs.observe(el);
  });
}

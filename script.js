/* ============================================================
   KargouSoft — script.js
   ============================================================ */
"use strict";

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("ks-theme") || "dark";
html.setAttribute("data-theme", savedTheme);
applyThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("ks-theme", next);
  applyThemeIcon(next);
});

function applyThemeIcon(theme) {
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  themeToggle.title =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
}

/* ============================================================
   NAVBAR — scroll shadow boost + active link
   ============================================================ */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  /* Slightly deeper shadow on scroll */
  if (window.scrollY > 10) {
    navbar.style.boxShadow = "0 4px 24px rgba(0,0,0,0.28)";
  } else {
    navbar.style.boxShadow = "0 2px 16px rgba(0,0,0,0.18)";
  }

  /* Back-to-top visibility */
  backToTop.classList.toggle("show", window.scrollY > 400);

  /* Active nav link */
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) closeMenu();
});

function closeMenu() {
  hamburger.classList.remove("open");
  navMenu.classList.remove("open");
}

/* ============================================================
   HERO CAROUSEL
   ============================================================ */
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let current = 0;
let timer = null;

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function startCarousel() {
  timer = setInterval(() => goTo(current + 1), 4000);
}
function resetCarousel() {
  clearInterval(timer);
  startCarousel();
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goTo(parseInt(dot.dataset.index));
    resetCarousel();
  });
});

startCarousel();

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

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
    alert("Please enter a valid email address.");
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    formSuccess.classList.add("show");
    setTimeout(() => formSuccess.classList.remove("show"), 5000);
  }, 1500);
});

/* ============================================================
   BACK TO TOP
   ============================================================ */
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll(
  ".service-card, .product-card, .portfolio-item, .blog-card, .about-grid, .contact-grid",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || "0s";
        entry.target.style.animation = `fadeInUp 0.55s ease ${delay} forwards`;
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.dataset.delay = `${(i % 3) * 0.1}s`;
  observer.observe(el);
});

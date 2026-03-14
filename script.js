/* ============================================================
   KargouSoft – script.js
   ============================================================ */
"use strict";

/* ============================================================
   THEME TOGGLE (Dark / Light)
   ============================================================ */
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("ks-theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("ks-theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-moon";
    themeToggle.setAttribute("title", "Switch to Light Mode");
  } else {
    themeIcon.className = "fas fa-sun";
    themeToggle.setAttribute("title", "Switch to Dark Mode");
  }
}

/* ============================================================
   NAVBAR — scroll effect + active link highlight
   ============================================================ */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  // Sticky style
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Back-to-top button
  backToTop.classList.toggle("show", window.scrollY > 400);

  // Active link detection
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
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

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// Close on nav link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  }
});

/* ============================================================
   HERO CAROUSEL — auto slide every 4 seconds
   ============================================================ */
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let carouselTimer = null;

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function startCarousel() {
  carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

function resetCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goToSlide(parseInt(dot.dataset.index));
    resetCarousel();
  });
});

startCarousel();

/* ============================================================
   CONTACT FORM — validation + fake submit
   ============================================================ */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    showFormError("Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormError("Please enter a valid email address.");
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate API call — replace with real fetch() if needed
  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    formSuccess.classList.add("show");
    setTimeout(() => formSuccess.classList.remove("show"), 5000);
  }, 1500);
});

function showFormError(msg) {
  alert(msg); // swap with a toast/inline error if preferred
}

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
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
const revealEls = document.querySelectorAll(
  ".service-card, .product-card, .portfolio-item, .blog-card, .about-grid, .contact-grid",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.55s ease ${entry.target.dataset.delay || "0s"} forwards`;
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.dataset.delay = `${(i % 3) * 0.1}s`;
  revealObserver.observe(el);
});

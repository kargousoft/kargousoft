/* ============================================================
   KargouSoft — script.js
   ============================================================ */
"use strict";

/* ============================================================
   THEME TOGGLE — default light
   ============================================================ */
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

/* ============================================================
   NAVBAR
   ============================================================ */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  navbar.style.boxShadow =
    window.scrollY > 10
      ? "0 4px 24px rgba(0,0,0,0.14)"
      : "0 2px 16px rgba(0,0,0,0.08)";

  backToTop.classList.toggle("show", window.scrollY > 400);

  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});

/* ============================================================
   HAMBURGER
   ============================================================ */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
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
let autoTimer = null;

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}
function startCarousel() {
  autoTimer = setInterval(() => goTo(current + 1), 4000);
}
function resetCarousel() {
  clearInterval(autoTimer);
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
   TEAM — View Details Toggle
   ============================================================ */
function toggleDetails(btn) {
  const card = btn.closest(".member-card");
  const details = card.querySelector(".member-details");
  const isOpen = details.classList.contains("open");

  // Close all other open cards first
  document.querySelectorAll(".member-details.open").forEach((d) => {
    d.classList.remove("open");
    d.closest(".member-card")
      .querySelector(".btn-view-details")
      .classList.remove("open");
    d.closest(".member-card").querySelector(".btn-text").textContent =
      "View Details";
  });

  // Toggle current
  if (!isOpen) {
    details.classList.add("open");
    btn.classList.add("open");
    btn.querySelector(".btn-text").textContent = "Hide Details";

    // Inject inner HTML if not already done
    if (!details.querySelector(".member-details-inner")) {
      details.innerHTML = details.innerHTML; // already has content from HTML
    }

    // Smooth scroll to card
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
}

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
    formSuccess.classList.add("show");
    setTimeout(() => formSuccess.classList.remove("show"), 5000);
  }, 1500);
});

/* ============================================================
   BACK TO TOP
   ============================================================ */
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll(
  ".service-card, .product-card, .portfolio-item, .blog-card, .member-card, .about-grid, .contact-grid, .team-join-card",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const d = entry.target.dataset.delay || "0s";
        entry.target.style.animation = `fadeInUp 0.55s ease ${d} forwards`;
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);

revealEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.dataset.delay = `${(i % 3) * 0.1}s`;
  observer.observe(el);
});

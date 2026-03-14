/* ============================================================
   KargouSoft – script.js
   ============================================================ */

"use strict";

/* ---- Navbar: scroll effect + active link ---- */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  // Sticky style
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Back-to-top visibility
  backToTop.classList.toggle("show", window.scrollY > 400);

  // Active nav link based on scroll position
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

/* ---- Hamburger menu ---- */
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

/* ---- Hero Carousel ---- */
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let carouselTimer;

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startCarousel() {
  carouselTimer = setInterval(nextSlide, 4000);
}

function resetCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

// Dot click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goToSlide(parseInt(dot.dataset.index));
    resetCarousel();
  });
});

startCarousel();

/* ---- Contact Form ---- */
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission (replace with real API call)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    formSuccess.classList.add("show");
    setTimeout(() => formSuccess.classList.remove("show"), 4000);
  }, 1500);
});

/* ---- Back To Top ---- */
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---- Footer Year ---- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Scroll Reveal (Intersection Observer) ---- */
const revealEls = document.querySelectorAll(
  ".service-card, .product-card, .portfolio-item, .blog-card, .about-grid, .contact-grid",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.animationDelay = `${(i % 3) * 0.1}s`;
  revealObserver.observe(el);
});

// Keyframe injection for scroll reveal
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

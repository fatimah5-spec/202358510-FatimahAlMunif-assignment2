/* =========================================================
   script.js
   Features:
   1. Dark / light theme toggle (persists using in-memory state
      + data attribute; swap to localStorage once hosted if desired)
   2. Mobile navigation toggle
   3. Smooth scrolling + active link highlighting
   4. Time-based greeting message
   5. Contact form validation (no backend)
   6. Back-to-top button
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Theme toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  const applyTheme = (isDark) => {
    body.classList.toggle("dark-theme", isDark);
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  };

  // Default to the visitor's OS preference on first load.
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark);

  themeToggle.addEventListener("click", () => {
    applyTheme(!body.classList.contains("dark-theme"));
  });

  /* ---------- 2. Mobile navigation ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu after a link is tapped.
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 3. Active link highlighting on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  const highlightActiveLink = () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach((anchor) => {
      anchor.classList.toggle("active", anchor.getAttribute("href") === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", highlightActiveLink);
  highlightActiveLink();

  /* ---------- 4. Time-based greeting message ---------- */
  const greetingEl = document.getElementById("greeting");
  const hour = new Date().getHours();
  let greeting = "Hello!";

  if (hour < 12) {
    greeting = "Good morning! 👋";
  } else if (hour < 18) {
    greeting = "Good afternoon! 👋";
  } else {
    greeting = "Good evening! 👋";
  }

  greetingEl.textContent = greeting;

  /* ---------- 5. Contact form validation (no backend) ---------- */
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  const fields = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("nameError"),
      validate: (value) => value.trim().length > 0 || "Please enter your name.",
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Please enter a valid email address.",
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("messageError"),
      validate: (value) => value.trim().length >= 10 || "Message should be at least 10 characters.",
    },
  };

  const validateField = (key) => {
    const { input, error, validate } = fields[key];
    const result = validate(input.value);
    const group = input.closest(".form-group");

    if (result === true) {
      group.classList.remove("invalid");
      error.textContent = "";
      return true;
    }

    group.classList.add("invalid");
    error.textContent = result;
    return false;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const isValid = results.every(Boolean);

    if (!isValid) {
      statusEl.textContent = "Please fix the errors above.";
      statusEl.classList.remove("success");
      return;
    }

    // No backend yet — simulate a successful submission.
    statusEl.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message has been received.`;
    statusEl.classList.add("success");
    form.reset();
  });

  /* ---------- 6. Back-to-top button ---------- */
  const backToTop = document.getElementById("backToTop");
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});

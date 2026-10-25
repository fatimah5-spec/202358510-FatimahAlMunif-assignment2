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

    // Load the saved theme from localStorage (fall back to the OS preference).
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (error) {
    // localStorage can be blocked (e.g. private mode) — just use the default.
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  themeToggle.addEventListener("click", () => {
    const isDark = !body.classList.contains("dark-theme");
    applyTheme(isDark);

    // Save the choice so it is remembered on the next visit.
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
      
    }
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
    /* ---------- 7. Project filter + live search (Assignment 2) ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("projectSearch");
  const projectCards = document.querySelectorAll(".project-card");
  const noResults = document.getElementById("noResults");
  let currentFilter = "all";

  const updateProjects = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const matchesFilter =
        currentFilter === "all" || card.dataset.category === currentFilter;
      const matchesSearch = card.textContent.toLowerCase().includes(query);
      const show = matchesFilter && matchesSearch;

      card.classList.toggle("hidden", !show);
      if (show) visibleCount++;
    });

    // Show the empty-state message when nothing matches
    noResults.classList.toggle("hidden", visibleCount > 0);
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      updateProjects();
    });
  });

  searchInput.addEventListener("input", updateProjects);
    /* ---------- 8. Fetch GitHub repositories (Assignment 2) ---------- */
  const GITHUB_USERNAME = "fatimah5-spec";
  const repoStatus = document.getElementById("repoStatus");
  const repoList = document.getElementById("repoList");
  const retryBtn = document.getElementById("retryBtn");

  const loadRepos = async () => {
    // Loading state
    repoStatus.textContent = "Loading…";
    repoStatus.classList.remove("error", "hidden");
    retryBtn.classList.add("hidden");
    repoList.innerHTML = "";

    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const repos = await response.json();

      // Empty state
      if (repos.length === 0) {
        repoStatus.textContent = "No public repositories yet.";
        return;
      }

      repoStatus.classList.add("hidden");

      repos.forEach((repo) => {
        const card = document.createElement("article");
        card.className = "repo-card";

        const title = document.createElement("h3");
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = repo.name;
        title.appendChild(link);

        const description = document.createElement("p");
        description.textContent = repo.description || "No description provided.";

        const language = document.createElement("span");
        language.className = "tag";
        language.textContent = repo.language || "Other";

        card.append(title, description, language);
        repoList.appendChild(card);
      });
    } catch (error) {
      // Error state with a way to try again
      console.error(error);
      repoStatus.textContent =
        "Couldn't load repositories right now. Please check your connection and try again.";
      repoStatus.classList.add("error");
      retryBtn.classList.remove("hidden");
    }
  };

  retryBtn.addEventListener("click", loadRepos);
  loadRepos();

    /* ---------- 9. Fade-in sections on scroll (Assignment 2) ---------- */
  const fadeSections = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeSections.forEach((section) => observer.observe(section));
  } else {
    // Older browsers: just show everything
    fadeSections.forEach((section) => section.classList.add("visible"));
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});

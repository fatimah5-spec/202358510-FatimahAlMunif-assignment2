# Tima's Personal Portfolio — Assignment 1

> Foundation & AI Integration — a simple, responsive personal portfolio built with HTML, CSS, and JavaScript.

## 📖 Project Description

This is the starting point of my professional portfolio website. It introduces me, showcases a
few of my projects, and gives visitors a way to get in touch. The site is fully responsive
(desktop, tablet, mobile) and includes a few interactive touches: a dark/light theme toggle,
smooth-scrolling navigation, a time-of-day greeting, and client-side contact form validation.

**Live demo:** _add your GitHub Pages / Netlify / Vercel link here once deployed_

## 🗂️ Project Structure

```
assignment-1/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## 🚀 Setup Instructions (Run Locally)

No build step or dependencies are required — this is plain HTML/CSS/JS.

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<student-id>-<your-name>-assignment1.git
   cd <student-id>-<your-name>-assignment1
   ```
2. **Open it in a browser**
   - Easiest: double-click `index.html`, **or**
   - Recommended (avoids some browser file-path quirks, e.g. for `fetch`/modules later):
     use a lightweight local server, such as the VS Code "Live Server" extension, or:
     ```bash
     python3 -m http.server 8000
     # then visit http://localhost:8000
     ```
3. **Resize the browser / open DevTools device toolbar** to check the responsive layout
   at desktop, tablet, and mobile widths.

## 🧩 Features

- **About Me** — short intro, tagline, and photo placeholder.
- **Projects** — three project cards (swap in your own work and screenshots).
- **Skills** — quick-glance skill pills.
- **Contact** — a validated Name / Email / Message form (front-end only, no backend).
- **Dark / light theme toggle** — remembers your OS preference on first load.
- **Smooth scrolling & active-link highlighting** in the navigation.
- **Time-based greeting** in the hero section (morning / afternoon / evening).
- Fully **responsive** layout using CSS Grid & Flexbox with mobile breakpoints.

## 🛠️ Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (DOM APIs, no frameworks)
- Google Fonts (Poppins)

## 🤖 AI Usage

An AI assistant (Claude) was used to help scaffold this project — generating the initial
HTML/CSS/JS structure and drafting documentation, which was then reviewed and will be
personalized. Full details, including tools, prompts, benefits, challenges, and what was
learned, are documented in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

## 📌 Before You Submit — Personalize This!

This repo is a **starting point**. Before submitting, make sure to:

- [ ] Replace `Tima` placeholders with your actual name/branding if different, and update the
      `<title>` and meta description in `index.html`.
- [ ] Rename the GitHub repo to `id-name-assignment1` (your student ID + your first & last name,
      no spaces).
- [ ] Replace `assets/images/avatar.svg` and project images with real photos/screenshots.
- [ ] Update the About Me text, project descriptions, skills, and contact links (email,
      LinkedIn, GitHub) with your own.
- [ ] Finish and personalize `docs/ai-usage-report.md` with your own reflections.
- [ ] Deploy (GitHub Pages / Netlify / Vercel) and add the live link above.
- [ ] Test in multiple browsers and screen sizes, and fix any issues you find.

## 📄 License

This project is for educational purposes as part of a course assignment.

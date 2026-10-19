# Fatimah's Personal Portfolio — Assignment 2

> Interactivity & Modern Web Techniques — building on the Assignment 1 portfolio with dynamic content, data handling, animations, and clear user feedback.

**Author:** Fatimah Ahmed Al Munif — 202358510
**Repository:** https://github.com/fatimah5-spec/202358510-FatimahAlMunif-assignment2
**Live demo:** _add your GitHub Pages link here once deployed_

## 📖 Project Description

A responsive personal portfolio website built with plain HTML, CSS, and JavaScript. It introduces me,
showcases my projects, shows my latest GitHub repositories live, and lets visitors contact me.

Assignment 1 gave the site its structure, responsive layout, theme toggle, and contact form.
Assignment 2 makes it more interactive and user-friendly.

## ✨ What's New in Assignment 2

| Feature | Requirement covered | Description |
|---|---|---|
| Project filter + live search | Dynamic content | Filter buttons (All / Research / Software Eng / Web) and a search box that filters project cards while typing. |
| "No projects found" message | User feedback (empty state) | Shown when no project matches the filter or search. |
| Saved theme | Data handling (`localStorage`) | The dark/light choice is saved and restored on the next visit. |
| Latest GitHub repositories | Data handling (public API) | Fetches my 6 most recently updated repos from the GitHub REST API. |
| Loading / error / retry | User feedback | Shows "Loading…", a friendly error message if the request fails, and a **Try Again** button. |
| Scroll fade-in | Animation | Sections fade and slide in as they scroll into view. |
| Animated success message | Animation | The contact form confirmation slides in. |
| Reduced motion | Accessibility | Animations are turned off for users who prefer reduced motion. |

### Features kept from Assignment 1
- Responsive layout (CSS Grid & Flexbox) with a mobile navigation menu
- Dark / light theme toggle
- Contact form validation with inline error messages
- Time-based greeting, active nav link highlighting, back-to-top button

## 🗂️ Project Structure

```
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

No installs or build tools are needed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/fatimah5-spec/202358510-FatimahAlMunif-assignment2.git
   cd 202358510-FatimahAlMunif-assignment2
   ```
2. **Open the site**
   - Double-click `index.html` to open it in your browser, **or**
   - Use a local server (recommended):
     ```bash
     python3 -m http.server 8000
     ```
     then visit http://localhost:8000
3. An internet connection is needed for the GitHub section and the Google Font.

## 🧭 How to Use

- **Projects:** click a filter button or type in the search box (e.g. `uml`). If nothing matches, a message tells you to try another word or filter.
- **Theme:** click 🌙 / ☀️ in the navbar. Your choice is remembered next time you visit.
- **GitHub section:** if it shows an error, check your internet connection and click **Try Again**.
- **Contact form:** fill in your name, a valid email, and a message of at least 10 characters. Errors appear under each field; a confirmation appears when the form is valid. (The form has no backend, so no message is actually sent.)

## 🛠️ Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox, transitions, keyframes, media queries)
- Vanilla JavaScript (DOM, `localStorage`, `fetch` + `async/await`, `IntersectionObserver`)
- GitHub REST API
- Google Fonts (Poppins)

## 🤖 AI Use (Summary)

I used **Claude (Anthropic)** to plan which features meet each requirement, to get a first version of
the code for each feature fitted to my existing files, to fix Git problems while setting up the
repository, and to draft this documentation. I added each feature myself, tested it in the browser,
and committed it on its own branch with an `Assisted-by` line. Full details are in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

## 📄 License

Educational project for SWE 363 at KFUPM.

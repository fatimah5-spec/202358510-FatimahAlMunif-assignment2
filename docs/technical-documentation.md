# Technical Documentation

## Overview

This project is a static, client-side-only personal portfolio website. It has no backend,
database, or build step — it runs directly in the browser from plain HTML, CSS, and JavaScript
files.

## Architecture

```
Browser
  ├── index.html        (structure / content)
  ├── css/styles.css     (presentation)
  └── js/script.js       (behavior)
```

- **`index.html`** — Semantic HTML5 document split into clearly labeled sections
  (`<header>`, `<main>` with `<section id="...">` blocks for Home/About/Projects/Skills/Contact,
  and `<footer>`). Each interactive element has an `id` used by `script.js`, and images use
  descriptive `alt` text for accessibility.
- **`css/styles.css`** — Organized into numbered blocks (variables/reset, typography, layout
  helpers, then one block per page section, followed by the dark theme override and responsive
  breakpoints). Colors, spacing, and shadows are defined once as CSS custom properties
  (`:root { --color-primary: ...; }`) so the whole theme can be restyled from one place.
- **`js/script.js`** — Vanilla JavaScript, no external libraries. Wrapped in a single
  `DOMContentLoaded` listener and split into clearly commented feature blocks.

## Key Technical Decisions

### Responsive Design
- **CSS Grid** is used for multi-column layouts that need to reflow (About, Projects, Contact).
- **Flexbox** is used for one-dimensional groupings (nav links, buttons, tags, skill pills).
- Two breakpoints (`900px`, `640px`) collapse the grid layouts to single columns and switch the
  navigation to a mobile toggle menu on small screens.
- `clamp()` is used for the hero heading so font size scales smoothly between breakpoints instead
  of jumping at fixed sizes.

### Theming (Dark / Light Mode)
- Implemented with a single `dark-theme` class toggled on `<body>`, which re-declares the CSS
  custom properties. No page reload or duplicate stylesheets are needed.
- On first load, the site respects the visitor's OS-level preference via
  `window.matchMedia("(prefers-color-scheme: dark)")`.
- **Note:** the toggle state currently lives only in memory (it resets on refresh). If you want
  it to persist between visits once deployed, store the preference in `localStorage` and read it
  back before the first paint.

### Navigation
- Smooth scrolling is enabled globally via `scroll-behavior: smooth` in CSS, combined with
  anchor links (`href="#section-id"`).
- An `IntersectionObserver`-style scroll listener (implemented with `scrollY` + `offsetTop`
  checks for simplicity) highlights the nav link matching the section currently in view.

### Form Handling
- The contact form has **no backend** — this satisfies the assignment requirement while keeping
  the project deployable as a static site.
- Validation runs entirely client-side: required-field checks, a regex email check, and a
  minimum message length, each with inline error messages and `aria-live` status updates for
  accessibility.
- To wire this up to a real backend later, replace the `submit` handler's "simulate success"
  branch with a `fetch()` call to a form endpoint (e.g. Formspree, Netlify Forms, or a custom
  API).

## Browser Compatibility

Built using widely supported, standard web APIs only (CSS custom properties, Grid, Flexbox,
`matchMedia`, standard DOM events) — no experimental features. Verified in modern Chromium-based
browsers; recommended to also spot-check in Firefox and Safari before submission, since minor
rendering differences (e.g. font rendering, form control styling) are common across browsers.

## Known Limitations / Future Improvements

- Theme preference is not persisted across page reloads (see note above).
- The contact form does not send data anywhere yet (by design, per assignment scope).
- Project images are placeholder SVGs and should be replaced with real screenshots.
- No automated tests are included; manual testing was done via browser resizing and DevTools
  device emulation.

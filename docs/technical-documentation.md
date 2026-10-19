# Technical Documentation — Assignment 2

## 1. Overview

A static, client-side personal portfolio. There is no backend, database, or build step: the site runs
directly in the browser from plain HTML, CSS, and JavaScript. The only external services are the
GitHub REST API (for the repositories section) and Google Fonts.

## 2. Architecture

```
Browser
  ├── index.html       (structure / content)
  ├── css/styles.css    (presentation, theme, animations)
  └── js/script.js      (behavior)
          └── fetch → https://api.github.com/users/fatimah5-spec/repos
```

- **`index.html`** — Semantic HTML5: `<header>`, `<main>` with sections Home, About, Projects,
  GitHub, Skills, Contact, and `<footer>`. Interactive elements have `id`s used by the script.
- **`css/styles.css`** — Numbered blocks. Blocks 1–12 are from Assignment 1 (variables, layout,
  sections, dark theme, breakpoints). Blocks 13–15 were added in Assignment 2 (filter & search,
  GitHub cards, animations). All colors come from CSS custom properties, so new elements follow the
  dark theme automatically.
- **`js/script.js`** — Vanilla JavaScript inside one `DOMContentLoaded` listener, split into
  numbered feature blocks. Blocks 7–9 are new in Assignment 2.

## 3. Assignment 2 Features

### 3.1 Project Filter + Live Search (`script.js` block 7)
- Each project card has a `data-category` attribute (`research`, `software`, `web`).
- Each filter button has a `data-filter` attribute. Clicking a button moves the `active` class to it
  and stores the value in `currentFilter`.
- The search box listens to the `input` event, so results update on every keystroke.
- `updateProjects()` checks both conditions for every card:
  - `matchesFilter` — the filter is `all` or equals the card's category.
  - `matchesSearch` — the card's text (lower-case) contains the search text.
- Cards that don't match get the `.hidden` class (`display: none`).
- A counter tracks visible cards; when it is 0, the `#noResults` empty-state message is shown.

### 3.2 Theme Saved in localStorage (`script.js` block 1)
- `applyTheme(isDark)` toggles the `dark-theme` class on `<body>`, which overrides the CSS variables.
- On load, the saved value `localStorage.getItem("theme")` is used. If nothing is saved, the
  visitor's OS setting (`prefers-color-scheme`) is used instead.
- On click, the new choice is saved with `localStorage.setItem("theme", "dark" | "light")`.
- Both calls are wrapped in `try/catch` because `localStorage` can be blocked (e.g. some private
  browsing modes). In that case the theme still works for the current visit.

### 3.3 GitHub Repositories via API (`script.js` block 8)
- Endpoint: `GET https://api.github.com/users/fatimah5-spec/repos?sort=updated&per_page=6`
- `loadRepos()` is an `async` function using `fetch` and `await`.
- UI states:

| State | What the user sees |
|---|---|
| Loading | "Loading…" text while the request runs |
| Success | Up to 6 cards: repo name (link), description, language |
| Empty | "No public repositories yet." |
| Error | Red message asking the user to check their connection, plus a **Try Again** button |

- `response.ok` is checked, so HTTP errors (e.g. 403 rate limit, 404) are treated as errors too.
- Cards are built with `document.createElement` and `textContent` (not `innerHTML`), so text from
  the API cannot inject HTML into the page.
- Note: the unauthenticated GitHub API allows about 60 requests per hour per IP address.

### 3.4 Animations (`styles.css` block 15, `script.js` block 9)
- **Scroll fade-in:** sections with the `.fade-in` class start with `opacity: 0` and are moved
  down 30px. An `IntersectionObserver` adds `.visible` when 15% of a section is on screen, and then
  stops watching it, so each section animates only once.
- **Fallback:** if `IntersectionObserver` is not supported, all sections are shown immediately.
- **Success message:** `.form-status.success` uses the `slideIn` keyframe animation.
- **Hover effects:** project and repo cards lift slightly on hover; filter buttons change color.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables these animations.

### 3.5 Contact Form (from Assignment 1)
- Client-side validation for name (required), email (regex), and message (min. 10 characters).
- Inline error messages under each field and a status message with `aria-live="polite"`.
- No backend; a successful submission is simulated and the form is reset.

## 4. Error Handling & User Feedback Summary

| Situation | Feedback |
|---|---|
| Empty or invalid form fields | Inline error under each field + "Please fix the errors above." |
| Valid form | Animated "Thanks, {name}! Your message has been received." |
| No project matches | "No projects found. Try another word or filter." |
| GitHub data loading | "Loading…" |
| GitHub request fails | Friendly error message + **Try Again** button |
| No public repos | "No public repositories yet." |

## 5. Performance
- No JavaScript libraries or frameworks; one CSS file and one JS file.
- Project images use `loading="lazy"`.
- Animations only change `opacity` and `transform`, which the browser can animate cheaply.
- The observer stops watching sections after they appear.
- The API request is limited to 6 repositories.

## 6. Browser & Device Compatibility
- Uses standard, widely supported features: CSS custom properties, Grid, Flexbox, `fetch`,
  `async/await`, `localStorage`, `IntersectionObserver` (with a fallback).
- Responsive breakpoints at `900px` and `640px`; on small screens the filter buttons and search box
  stack vertically and the search box becomes full width.
- Tested in Chrome on macOS and in Chrome DevTools device mode (phone and tablet sizes).
  <!-- Add any other browsers you test, e.g. Safari -->

## 7. Accessibility
- Semantic HTML landmarks and section headings.
- Filter buttons are real `<button>` elements inside a `role="group"` with an `aria-label`.
- The search box has an `aria-label`; the theme toggle updates its `aria-label`.
- Form status uses `aria-live="polite"` so screen readers announce it.
- Reduced-motion preference is respected.

## 8. Known Limitations / Future Work
- The contact form does not send messages; a service like Formspree could be connected later.
- Projects are written directly in the HTML; they could be loaded from a JSON file.
- The GitHub API rate limit can cause the error state if the page is reloaded many times.

# AI Usage Report — Assignment 2

## 1. Tools Used

| Tool (model) | How I used it |
|---|---|
| Claude (Claude Opus 5.5) by Anthropic | Understanding the requirements, choosing features, getting code for each feature fitted to my Assignment 1 files, fixing Git/GitHub setup errors, and drafting the documentation. |

<!-- If you used any other AI tool (Copilot, ChatGPT, ...), add a row here AND in the usage log. -->

## 2. How I Used AI

I used one Claude conversation (C01) for the whole assignment. I worked feature by feature:
for each one I asked Claude where the code should go in my files, added it myself in VS Code,
tested it in the browser, and committed it on its own branch.

Main prompts I gave Claude:
1. Explain what this assignment wants.
2. Give me exactly what to do and where to put each piece of code, one part at a time.
3. Help me fix Git errors when connecting my folder to the new GitHub repository.
4. Give me the commit and push commands for each part.


| Part | What Claude provided | What I did |
|---|---|---|
| Repository setup | Steps and fixes for Git errors (wrong remote URL, an extra nested folder) | Created the repo, ran the commands, fixed the remote |
| Project filter + search | HTML controls, CSS, and `updateProjects()` | Added categories to my 3 projects, placed the code, tested filters and search |
| Theme in localStorage | Replacement for my Assignment 1 theme code | Replaced the code, tested that the theme stays after refresh |
| GitHub API | Section HTML, card CSS, and `loadRepos()` | Added it with my username, tested success and the offline error state |
| Animations | Fade-in CSS + `IntersectionObserver`, success-message animation | Added `fade-in` to my sections and tested scrolling |
| Documentation | Drafts of README, technical docs, this report | Reviewed and edited them |

Claude also read my existing files first, so it reused my CSS variables and class names, and it
pointed out a bug from Assignment 1: the projects section was missing two closing `</div>` tags.

## 3. What I Changed, Verified, and Learned

<!-- ✏️ Edit this section in your own words — the rubric grades YOUR understanding. -->
- **Changes:** chose project categories for my own projects (Research / Software Eng / Web), kept my
  Assignment 1 design, form, and theme toggle instead of replacing them, and changed section
  background colors so they alternate after adding the GitHub section.
- **Verification:** after each feature I opened the site in Chrome and checked it (filter buttons,
  searching `uml` and a word with no results, refreshing after changing the theme, turning Wi-Fi
  off to see the API error and **Try Again**, scrolling for the fade-in), then committed it.
- **Learned:**
  - How `data-*` attributes and `dataset` let JavaScript filter elements.
  - How `localStorage` saves data in the browser between visits, and why it is wrapped in `try/catch`.
  - How `fetch` with `async/await` and `try/catch` handles loading, success, and error states.
  - Why `textContent` is safer than `innerHTML` for data coming from an API.
  - How `IntersectionObserver` detects when an element scrolls into view.
  - How to use Git branches, merges, and `git remote` to fix a wrong repository URL.

## 4. Benefits & Challenges

**Benefits:** Claude made it fast to see which features meet each requirement and how to fit new
code into my existing files without breaking them. It also helped me fix Git errors quickly.

**Challenges:** I had to understand where each piece goes (inside `DOMContentLoaded`, before the
footer code), save files before committing, and fix Git setup mistakes. I made sure I understand
each part of the code so I can explain it.

## 5. Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|---|---|---|---|---|---|
| C01 | Claude (Claude Opus 5.5) | 2026-10-19 | Plan features, Git setup help, step-by-step code for filter/search, localStorage theme, GitHub API, animations, and documentation drafts | index.html, css/styles.css, js/script.js, README.md, docs/technical-documentation.md, docs/ai-usage-report.md | Added each part myself, set my own project categories and GitHub username, kept my Assignment 1 design; tested every feature in Chrome (including offline error state) before each commit |
| A01 | Claude (Claude Opus 5.5) | 2026-10-19 | Code snippets for the 4 features (raw versions saved in `artifacts/`) | index.html, css/styles.css, js/script.js | Placed and adapted them in my files, adjusted section colors, tested in the browser |


## 6. Declaration

I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Fatimah Ahmed Al Munif
**Student ID:** 202358510
**Date:** 2026-10-19

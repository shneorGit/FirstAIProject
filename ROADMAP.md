# FirstAIProject - Test Automation Roadmap 🚀

This document tracks the future enhancements for the Playwright automation framework for Sport5 (`https://www.sport5.co.il/`). It serves as a persistent backlog for developers and AI agents to pick up and implement tasks sequentially.

## 📋 Task Backlog & Progress

- [x] **Task 1: Data-Driven Testing (DDT)**
  - **Goal:** Move hardcoded query terms (e.g., "מכבי") and category targets out of test scripts and into external JSON files (Fixtures). Loop tests dynamically.
  - **Status:** Completed. Added fixtures for `searchQueries.json` and `categories.json` and refactored `sport5Tests.spec.ts` to run dynamically over arrays.
- [ ] **Task 2: Visual Regression Testing**
  - **Goal:** Add visual layout assertions using `expect(page).toHaveScreenshot()` on static elements like header logotype, scoreboard widget structure, or footer links to prevent CSS/UI bugs.
  - **Status:** Pending.
- [ ] **Task 3: Client-Side Performance Metrics**
  - **Goal:** Extract Core Web Vitals and load timing KPIs using browser `window.performance` API. Fail tests if loading times exceed defined SLAs (e.g., LCP > 3 seconds).
  - **Status:** Pending.
- [ ] **Task 4: Static Analysis & Code Quality (ESLint & Prettier)**
  - **Goal:** Set up strict linting rules and automatic formatting to ensure clean, consistent code throughout the workspace. Integrate with GitHub Actions.
  - **Status:** Pending.
- [ ] **Task 5: GitHub Pages Report Hosting**
  - **Goal:** Automate publishing generated Playwright HTML reports directly to GitHub Pages so that test run results are instantly viewable at a public/private link on every commit.
  - **Status:** Pending.

---

## 🛠️ Task Detailed Specifications

### Task 1: Data-Driven Testing (DDT)
* **Files to create/modify:**
  * `src/tests/fixtures/searchData.json`: JSON file with various search queries in Hebrew.
  * `src/tests/fixtures/navigationData.json`: JSON list of menu categories to click and verify.
  * `src/tests/sport5Tests.spec.ts`: Refactor search and navigation tests to run on arrays of fixtures.

### Task 2: Visual Regression Testing
* **Files to create/modify:**
  * `src/tests/sport5Visual.spec.ts`: New spec file focusing only on visual screenshots and comparison.
  * Define visual testing options in `playwright.config.ts` (e.g., `threshold`, `maxDiffPixels`).

### Task 3: Client-Side Performance Metrics
* **Files to create/modify:**
  * `src/pages/basePage.ts`: Add `getPerformanceMetrics()` method extracting load times.
  * `src/tests/sport5Performance.spec.ts`: Validate homepage response SLA requirements.

### Task 4: Static Analysis & Code Quality
* **Files to create/modify:**
  * `.eslintrc.json` / `package.json`: Dependencies and rules configurations.
  * `.prettierrc`: Rules for braces, quotes, and spacing.

### Task 5: GitHub Pages Report Hosting
* **Files to create/modify:**
  * `.github/workflows/playwright.yml`: Append deployment steps using standard action `actions/deploy-pages@v4`.

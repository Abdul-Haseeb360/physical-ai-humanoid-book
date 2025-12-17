# Docusaurus Professional UI Redesign Prompt

## Role & Context

You are a senior Frontend Engineer and UI/UX Designer with deep expertise in **Docusaurus v2**, **React**, **CSS Modules**, and **modern documentation websites**.

I have an existing **Docusaurus-based book/documentation website**. The content and structure are finalized. Your responsibility is to **redesign the UI only**, without modifying the documentation structure, sidebar logic, or markdown content.

---

## Primary Goal

Transform the website into a **clean, modern, professional, and premium documentation platform**, comparable in quality to:

* Stripe Documentation
* Vercel Documentation
* OpenAI Documentation
* GitHub Documentation

The focus must be on **clarity, information hierarchy, readability, and long-form learning comfort**.

---

## Scope of UI Customization

### 1. Homepage – Hero Section

* Replace the default Docusaurus hero with a **custom-designed hero section**
* Clearly present:

  * Book title
  * Subtitle or tagline
  * Short supporting description
* Include:

  * Primary CTA (e.g., “Start Reading”)
  * Secondary CTA (e.g., “View Chapters”)
* Use modern spacing, strong typography, and subtle gradients or abstract patterns
* The design must feel **authoritative, educational, and professional**, not marketing-heavy

---

### 2. Navbar

* Minimal and professional navigation bar
* Layout:

  * Left: Logo + Book Name
  * Right:

    * Docs
    * Chapters / Modules
    * GitHub (if applicable)
    * Search
* Sticky behavior on scroll
* Subtle hover and active states
* No visual clutter

---

### 3. Footer

* Clean, distraction-free footer
* Sections:

  * Book / Documentation
  * Resources
  * Author or Company
* Include copyright information
* Optional social or external links
* Prefer dark or neutral styling

---

### 4. Typography System

* Professional font pairing:

  * Headings: modern and strong (e.g., Inter, DM Sans, Geist, or similar)
  * Body text: highly readable for long sessions
* Clear heading hierarchy
* Comfortable line height and paragraph spacing
* Optimized for **technical book reading**

---

### 5. Color System

* Neutral, professional color palette
* Polished light mode
* Equally refined dark mode
* Accessible contrast (WCAG-compliant)
* Avoid flashy or distracting colors

---

### 6. Documentation Page Layout

* Improve:

  * Sidebar spacing and readability
  * Active item highlighting
  * Code block styling
  * Admonitions and callouts
* Make long chapters easy to scan
* Clear separation between sections and concepts

---

## Technical Constraints

* Follow **Docusaurus v2 best practices**
* Use:

  * `src/css/custom.css`
  * Theme configuration overrides
  * Custom React components where required
* Avoid external UI frameworks unless absolutely necessary
* Prioritize performance, maintainability, and clean architecture

---

## Deliverables

1. UI/UX design approach explanation
2. Updated configuration and code:

   * `docusaurus.config.js` (theme, navbar, footer)
   * Custom CSS
   * Custom homepage (Hero) component
3. Clean, production-ready implementation
4. Brief explanation of design decisions

---

## Design Philosophy

* Professional
* Minimal
* Book-first, not marketing-first
* Designed for serious learners and engineers

---

## Assumptions

If any assumption is required, **ask before implementation**.

---

## Additional Context (Optional)

Assume this is a **technical AI / Engineering book** aimed at developers and professionals. The UI should feel **credible, serious, and optimized for long-form reading**.

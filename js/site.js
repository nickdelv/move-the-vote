/* ============================================
   MOVE THE VOTE — site.js
   Shared behavior across all pages.
   ============================================ */

(function () {
  "use strict";

  // ── Nav: mobile toggle ──────────────────────
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".site-nav__links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close menu when any nav link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();

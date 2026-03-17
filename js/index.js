/* ============================================
   MOVE THE VOTE — index.js
   Page-specific behavior for index.html.
   ============================================ */

(function () {
  "use strict";

  // ── FAQ Accordion ───────────────────────────
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq__question");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all open items
      faqItems.forEach((i) => {
        i.classList.remove("is-open");
        const b = i.querySelector(".faq__question");
        if (b) b.setAttribute("aria-expanded", "false");
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

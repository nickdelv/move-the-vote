/* ============================================
   MOVE THE VOTE — index.js
   Page-specific behavior for index.html.
   ============================================ */

(function () {
  "use strict";

  // ── Voter Turnout Chart ────────────────────
  var turnoutCanvas = document.getElementById("turnout-chart");
  if (turnoutCanvas && typeof Chart !== "undefined") {
    var elections = [
      { year: "'16", type: "Pres", pct: 76 },
      { year: "'17", type: "Town", pct: 16 },
      { year: "'18", type: "Town", pct: 6 },
      { year: "'18", type: "State", pct: 66 },
      { year: "'19", type: "Town", pct: 18 },
      { year: "'20", type: "Town", pct: 25 },
      { year: "'20", type: "Pres", pct: 83 },
      { year: "'21", type: "Town", pct: 15 },
      { year: "'22", type: "Town", pct: 2 },
      { year: "'22", type: "State", pct: 57 },
      { year: "'23", type: "Town", pct: 22 },
      { year: "'24", type: "Town", pct: 34 },
      { year: "'24", type: "Pres", pct: 75 },
      { year: "'25", type: "Town", pct: 27 },
      { year: "'26", type: "Town", pct: 24 },
    ];

    var colors = {
      Pres: "#1e9e7a",
      State: "#35c49a",
      Town: "#e4e4e0",
    };

    new Chart(turnoutCanvas, {
      type: "bar",
      data: {
        labels: elections.map(function (e) {
          return e.year + " " + e.type;
        }),
        datasets: [
          {
            data: elections.map(function (e) {
              return e.pct;
            }),
            backgroundColor: elections.map(function (e) {
              return colors[e.type];
            }),
            borderRadius: 3,
            maxBarThickness: 48,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: function (items) {
                return items[0].label;
              },
              label: function (item) {
                return item.raw + "% turnout";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (v) {
                return v + "%";
              },
              font: { family: "'Barlow Semi Condensed', sans-serif", size: 12 },
              color: "#6b7280",
            },
            grid: { color: "rgba(0,0,0,0.06)" },
            border: { display: false },
          },
          x: {
            ticks: {
              font: { family: "'Barlow Semi Condensed', sans-serif", size: 11 },
              color: "#6b7280",
              maxRotation: 45,
              minRotation: 45,
            },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });
  }

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

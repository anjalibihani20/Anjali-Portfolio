/* =========================================================
   Anjali Bihani — Portfolio JavaScript
   Only two small, genuinely necessary behaviours:
   1. Accessible mobile navigation toggle
   2. Client-side contact form confirmation (no backend)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---- 1. Mobile nav toggle ---- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.querySelector(".sr-only").textContent = isOpen ? "Close menu" : "Open menu";
    });

    /* Close the mobile menu after a nav link is chosen,
       so keyboard and screen reader users land on the new page
       without a leftover open menu state. */
    primaryNav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.querySelector(".sr-only").textContent = "Open menu";
      }
    });
  }

  /* ---- 2. Contact form feedback (no real backend yet) ---- */
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      /* Rely on native HTML5 validation first. */
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var name = document.getElementById("name").value.trim();

      formStatus.textContent =
        "Thanks, " +
        name +
        ". This form isn't connected to a server yet, so nothing was sent " +
        "— but everything you typed passed validation.";
      formStatus.classList.add("is-visible");
      formStatus.setAttribute("tabindex", "-1");
      formStatus.focus();

      contactForm.reset();
    });
  }
});

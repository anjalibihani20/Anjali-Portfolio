/* =========================================================
   Anjali Bihani — Portfolio JavaScript
   Three small, genuinely necessary behaviours:
   1. Light / dark theme toggle (remembers the choice)
   2. Accessible mobile navigation toggle
   3. Client-side contact form confirmation (no backend)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---- 1. Theme toggle ----
     The CSS does the actual theming: it reads the data-theme attribute on <html>.
     JS only decides which value to set and saves it.
     A tiny script in each page's <head> applies a saved theme before first paint. */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit === "dark" || explicit === "light") {
      return explicit;
    }
    return systemDark.matches ? "dark" : "light";
  }

  function syncToggle() {
    themeToggle.setAttribute("aria-pressed", currentTheme() === "dark" ? "true" : "false");
  }

  if (themeToggle) {
    syncToggle();

    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* Storage can be blocked (private mode); the theme still switches for this visit. */
      }
      syncToggle();
    });

    /* If the visitor never chose a theme, follow their system when it changes. */
    systemDark.addEventListener("change", syncToggle);
  }

  /* ---- 2. Mobile nav toggle ---- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primary-nav");

  function setMenu(open) {
    primaryNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      setMenu(!primaryNav.classList.contains("is-open"));
    });

    /* Close the mobile menu after a nav link is chosen. */
    primaryNav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        setMenu(false);
      }
    });

    /* Escape closes the menu and returns focus to the button. */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  /* ---- 3. Contact form feedback (no real backend yet) ---- */
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

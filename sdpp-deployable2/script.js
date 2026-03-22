/* ─── Disclaimer ───────────────────────────────────────────── */
(function () {
  "use strict";

  var disclaimer = document.getElementById("disclaimer");
  var agreeBtn   = document.getElementById("agreeDisclaimer");

  if (agreeBtn && disclaimer) {
    var hasAgreed = localStorage.getItem("sddpDisclaimerAgreed") === "true";
    if (!hasAgreed) {
      disclaimer.classList.remove("hidden");
    }
    agreeBtn.addEventListener("click", function () {
      localStorage.setItem("sddpDisclaimerAgreed", "true");
      disclaimer.classList.add("hidden");
    });
  }

  /* ─── Header Scroll Shrink ─────────────────────────────────── */
  var header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 60) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  /* ─── Scroll Reveal (Intersection Observer) ────────────────── */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    });

    // Observe all .reveal elements and .section-head
    document.querySelectorAll(".reveal, .section-head, .offices-section-head").forEach(function (el) {
      revealObserver.observe(el);
    });

    /* ─── Add .reveal to cards automatically ───────────────────── */
    document.querySelectorAll(".partner-card, .contact-card").forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

    /* ─── Office cards use their own in-view CSS ───────────────── */
    document.querySelectorAll(".office-card").forEach(function (el) {
      revealObserver.observe(el);
    });

    /* ─── Privacy sections scroll reveal ───────────────────────── */
    document.querySelectorAll(".privacy-section").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver not supported
    document.querySelectorAll(".reveal, .section-head, .offices-section-head, .partner-card, .contact-card, .office-card, .privacy-section").forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ─── Nav link ripple on click ─────────────────────────────── */
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var ripple = document.createElement("span");
      ripple.style.cssText =
        "position:absolute;border-radius:50%;" +
        "width:6px;height:6px;" +
        "background:rgba(201,164,92,0.5);" +
        "transform:scale(0);" +
        "animation:navRipple 0.5s ease forwards;" +
        "pointer-events:none;" +
        "left:50%;top:50%;translate:-50% -50%;";
      this.style.position = "relative";
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // Inject nav ripple keyframe once
  var style = document.createElement("style");
  style.textContent =
    "@keyframes navRipple{from{transform:scale(0);opacity:1}to{transform:scale(12);opacity:0}}";
  document.head.appendChild(style);

  /* ─── Smooth stagger on page load for hero ─────────────────── */
  document.querySelectorAll(".hero-copy").forEach(function (el) {
    el.style.visibility = "visible";
  });
})();

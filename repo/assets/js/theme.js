/* Shared Tailwind design tokens (from Stitch "Academic Excellence" design system)
   and small UI behaviors (dark mode, mobile nav). Loaded right after the Tailwind
   Play CDN so the config is picked up before class generation. */
window.tailwind = window.tailwind || {};
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-tint": "#4f6073",
        "on-primary-container": "#8192a7",
        "on-tertiary-fixed": "#2c0051",
        "surface-container-highest": "#e1e3e4",
        "primary-fixed": "#d2e4fb",
        "outline": "#74777d",
        "on-error": "#ffffff",
        "surface-variant": "#e1e3e4",
        "on-secondary-container": "#00476e",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        "inverse-on-surface": "#f0f1f2",
        "on-tertiary": "#ffffff",
        "on-surface": "#191c1d",
        "inverse-surface": "#2e3132",
        "tertiary-fixed": "#f0dbff",
        "tertiary-container": "#3d0d68",
        "surface-container": "#edeeef",
        "primary-container": "#1a2b3c",
        "on-primary-fixed": "#0b1d2d",
        "error-container": "#ffdad6",
        "secondary-fixed": "#cce5ff",
        "on-surface-variant": "#44474c",
        "on-tertiary-container": "#aa7dd8",
        "error": "#ba1a1a",
        "on-tertiary-fixed-variant": "#5c3187",
        "on-primary": "#ffffff",
        "secondary-container": "#5cb8fd",
        "primary": "#041627",
        "surface-container-high": "#e7e8e9",
        "outline-variant": "#c4c6cd",
        "primary-fixed-dim": "#b7c8de",
        "on-primary-fixed-variant": "#38485a",
        "surface-container-low": "#f3f4f5",
        "tertiary-fixed-dim": "#dcb8ff",
        "surface-dim": "#d9dadb",
        "surface": "#f8f9fa",
        "on-background": "#191c1d",
        "on-secondary-fixed-variant": "#004b73",
        "on-secondary-fixed": "#001d31",
        "background": "#f8f9fa",
        "inverse-primary": "#b7c8de",
        "secondary-fixed-dim": "#92ccff",
        "surface-container-lowest": "#ffffff",
        "tertiary": "#230043",
        "surface-bright": "#f8f9fa",
        "secondary": "#006397"
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: {
        "container-max": "1200px",
        "stack-lg": "4rem",
        "section-padding-desktop": "80px",
        "gutter": "1.5rem",
        "stack-md": "1.5rem",
        "stack-sm": "0.5rem",
        "section-padding-mobile": "48px"
      },
      fontFamily: {
        "headline-md": ["Manrope"],
        "headline-lg": ["Manrope"],
        "body-lg": ["Inter"],
        "display-lg": ["Manrope"],
        "body-md": ["Inter"],
        "label-bold": ["Inter"],
        "display-md": ["Manrope"],
        "headline-lg-mobile": ["Manrope"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.3", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.7", fontWeight: "400" }],
        "display-lg": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-bold": ["14px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "600" }],
        "display-md": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.3", fontWeight: "700" }]
      }
    }
  }
};

/* --- Dark mode: apply saved preference ASAP to avoid flash --- */
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();

document.addEventListener("DOMContentLoaded", function () {
  // Dark mode toggle(s)
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isDark = document.documentElement.classList.toggle("dark");
      try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) {}
      updateThemeIcons(isDark);
    });
  });
  updateThemeIcons(document.documentElement.classList.contains("dark"));

  // Mobile nav toggle
  var mobileBtn = document.querySelector("[data-mobile-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }
});

function updateThemeIcons(isDark) {
  document.querySelectorAll("[data-theme-toggle] .material-symbols-outlined").forEach(function (icon) {
    icon.textContent = isDark ? "light_mode" : "dark_mode";
  });
}

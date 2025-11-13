/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Ana palet
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-darker": "var(--color-primary-darker)",
        "primary-darkest": "var(--color-primary-darkest)",

        // Arka plan ve yüzey
        base: "var(--color-base)",
        "base-dark": "var(--color-base-dark)",
        panel: "var(--color-panel)",
        "panel-alt": "var(--color-panel-alt)",
        "panel-alt2": "var(--color-panel-alt2)",
        "panel-hover": "var(--color-panel-hover)",
        "panel-dark": "var(--color-panel-dark)",
        "panel-dark-alt": "var(--color-panel-dark-alt)",

        // Metinler
        content: {
          primary: "var(--color-content-primary)",
          secondary: "var(--color-content-secondary)",
          muted: "var(--color-content-muted)",
          "dark-primary": "var(--color-content-dark-primary)",
          "dark-secondary": "var(--color-content-dark-secondary)",
          "dark-muted": "var(--color-content-dark-muted)",
        },

        // Kenarlıklar
        edge: {
          primary: "var(--color-edge-primary)",
          secondary: "var(--color-edge-secondary)",
          accent: "var(--color-edge-accent)",
          "dark-primary": "var(--color-edge-dark-primary)",
          "dark-secondary": "var(--color-edge-dark-secondary)",
        },

        // Butonlar
        button: {
          primary: "var(--color-button-primary)",
          hover: "var(--color-button-hover)",
          active: "var(--color-button-active)",
          disabled: "var(--color-button-disabled)",
          light: "var(--color-button-light)",
          "dark-primary": "var(--color-button-dark-primary)",
          "dark-hover": "var(--color-button-dark-hover)",
          "dark-active": "var(--color-button-dark-active)",
        },

        // Etkileşimli öğeler
        interactive: {
          DEFAULT: "var(--color-interactive)",
          hover: "var(--color-interactive-hover)",
          selected: "var(--color-interactive-selected)",
          ring: "var(--color-interactive-ring)",
          dark: "var(--color-interactive-dark)",
          "dark-hover": "var(--color-interactive-dark-hover)",
          "dark-selected": "var(--color-interactive-dark-selected)",
        },

        // Özel renkler
        caret: "var(--color-caret)",
        "mood-indicator": "var(--color-mood-indicator)",
        "focus-ring": "var(--color-focus-ring)",
        "gradient-start": "var(--color-gradient-start)",
        "gradient-end": "var(--color-gradient-end)",
        "gradient-landing-start": "var(--color-gradient-landing-start)",
        "gradient-landing-end": "var(--color-gradient-landing-end)",
        "chart-start": "var(--color-chart-start)",
        "chart-end": "var(--color-chart-end)",
        "icon-inactive": "var(--color-icon-inactive)",
        ring: "var(--color-ring)",
      },
    },
  },
  plugins: [],
};

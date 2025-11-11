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
        // Primary brand colors
        primary: {
          DEFAULT: "#f8c994",
          hover: "#e2b680",
          light: "#f5e1b8",
          dark: "#c3a277",
          darker: "#846f53",
          darkest: "#5e5346",
        },
        // Background colors
        base: {
          DEFAULT: "#f6ede4",
          dark: "#2a241f",
        },
        panel: {
          DEFAULT: "#fff9f3",
          alt: "#fff7ea",
          alt2: "#f6e3d0",
          alt3: "#fffaf5",
          hover: "#fef3e7",
          dark: "#3a3329",
          "dark-alt": "#4a4236",
        },
        // Text colors
        content: {
          primary: "#463b2d",
          secondary: "#5e5346",
          tertiary: "#4f412f",
          muted: "#66513e",
          dark: {
            primary: "#f5e1b8",
            secondary: "#d9b58d",
            muted: "#c3a277",
          },
        },
        // Border colors
        edge: {
          primary: "#5e5346",
          secondary: "#e0c9a6",
          tertiary: "#efe0c8",
          light: "#ead7bf",
          lighter: "#e2cfba",
          accent: "#fec9a4",
          ring: "#d9b58d",
          dark: {
            primary: "#5e5346",
            secondary: "#4a4236",
            light: "#3a3329",
          },
        },
        // Button colors
        button: {
          primary: "#f8c994",
          hover: "#e2b680",
          active: "#c3a277",
          disabled: "#846f53",
          light: "#ffd7aa",
          dark: {
            primary: "#c3a277",
            hover: "#d9b58d",
            active: "#846f53",
          },
        },
        // Interactive elements
        interactive: {
          DEFAULT: "#fae0c3",
          hover: "#f8c994",
          selected: "#f3e0c9",
          ring: "#d9b58d",
          dark: {
            DEFAULT: "#4a4236",
            hover: "#5e5346",
            selected: "#3a3329",
          },
        },
        // Special purpose colors
        caret: "#fab584",
        "mood-indicator": "#f6c37e",
        "focus-ring": "#e2b680",
        "gradient-start": "#f8c994",
        "gradient-end": "#f5e1b8",
        "gradient-landing-start": "#F9FAFB",
        "gradient-landing-end": "#fdeec7",
        "chart-start": "#ffd89b",
        "chart-end": "#f6e3d5",
        "icon-inactive": "#8a7a60",
      },
    },
  },
  plugins: [],
};

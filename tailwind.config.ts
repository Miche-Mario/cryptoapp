import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
    "./src/constants/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "var(--primary-default)",
          secondary: "var(--primary-secondary)",
          tertiary: "var(--primary-tertiary)",
          contrast: "var(--primary-contrast)",
        },
        light: {
          default: "var(--light-default)",
          secondary: "var(--light-secondary)",
          tertiary: "var(--light-tertiary)",
          contrast: "var(--light-contrast)",
        },
        accent: {
          default: "var(--accent-default)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
          contrast: "var(--accent-contrast)",
        },
        surface: {
          default: "var(--surface-default)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
        },
        content: {
          default: "var(--content-default)",
          secondary: "var(--content-secondary)",
          tertiary: "var(--content-tertiary)",
        },
        solid: {
          100: "var(--solid-100)",
          200: "var(--solid-200)",
          300: "var(--solid-300)",
          400: "var(--solid-400)",
          500: "var(--solid-500)",
        },
      },
    },
  },
  plugins: [],
};
export default config;

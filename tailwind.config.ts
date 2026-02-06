import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables dark mode via the 'dark' class on <html>
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define CSS variables in globals.css for background and foreground
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;

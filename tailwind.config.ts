import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { void: "#080A09", surface: "#101512", phosphor: "#9DBFA2", dim: "#506D56", amber: "#B69A62", paper: "#D8DED8" },
    fontFamily: { mono: ["var(--font-mono)", "ui-monospace", "monospace"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
};
export default config;

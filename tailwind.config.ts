import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        steel: "#475467",
        sky: "#E0F2FE",
        rose: "#FDE1E7",
        amber: "#FEF7CD",
        emerald: "#D1FADF",
        royal: "#0B4F6C"
      },
      boxShadow: {
        card: "0 20px 45px rgba(17, 24, 39, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular"]
      }
    }
  },
  plugins: []
};

export default config;

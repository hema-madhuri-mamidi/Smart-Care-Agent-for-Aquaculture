/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#050d1a",
        depth: "#0a1628",
        surface: "#0f2038",
        card: "#12243d",
        cardhover: "#15304f",
        border: "#1c3454",
        aqua: {
          50: "#e6fbff",
          100: "#b3f2ff",
          200: "#7fe8ff",
          300: "#4ddcf5",
          400: "#2bc4e0",
          500: "#1fa8c9",
          600: "#2b7fd4",
          700: "#1c5fa8",
        },
        status: {
          good: "#2fd47a",
          warn: "#f5b642",
          bad: "#f0505a",
          info: "#3ea1f0",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(43,196,224,0.15), 0 8px 30px -10px rgba(43,196,224,0.25)",
        card: "0 4px 24px -8px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "ocean-gradient":
          "linear-gradient(180deg, #06111f 0%, #0a1a2e 45%, #0d2439 100%)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-10px) translateX(6px)" },
        },
        rise: {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "100%": { transform: "translateY(-500px)", opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        rise: "rise 8s linear infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
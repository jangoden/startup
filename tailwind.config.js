/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#00906d",
          dark: "#007a5c",
          light: "#33a68a",
        },
        secondary: "#111827",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          DEFAULT: "#0ea5e9",
          orange: "#f97316",
        },
      },
      boxShadow: {
        'soft': "0 2px 10px rgba(0, 0, 0, 0.03)",
        'card': "0 0 20px rgba(0, 0, 0, 0.05)",
        'card-hover': "0 10px 40px rgba(0, 0, 0, 0.08)",
        'glow': "0 0 20px rgba(0, 144, 109, 0.3)",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gradient-move": "gradientMove 10s ease infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")],
};

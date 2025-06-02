// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if needed
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gray: {
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          800: "#1F1F1F",
          900: "#111111",
        },
        blue: {
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
      },
      spacing: {
        18: "4.5rem",
        28: "7rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "blue-glow": "0 0 15px 2px rgba(37, 99, 235, 0.6)",
      },
    },
  },
  plugins: [],
};

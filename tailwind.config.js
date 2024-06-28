/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "375px",
      },
      fontFamily: {
        macan: ["var(--font-macan)"],
        helvetica: ["var(--font-helvetica)"],
        noto: ["var(--font-noto)"],
      },
    },
  },
  plugins: [],
};

export default config;

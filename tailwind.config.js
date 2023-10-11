/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#FFC436",
        "custom-blue-light": "#337CCF",
        "custom-blue-medium": "#1450A3",
        "custom-blue-dark": "#191D88",
      },
    },
    screens: {
      tablet: "768px",
      laptop: "1024px",
      desktop: "1440px",
    },
  },
  plugins: [],
};

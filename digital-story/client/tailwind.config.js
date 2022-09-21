/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D5A021",
        "primary-hover": "#D19602",
        light: "#FFFFFF",
        dark: "#272932",
        "dark-overlay": "#30323D",
        "dark-accent": "#FE5F55",
      },
      fontSize: {
        "2xs": "0.5rem",
      },
    },
  },
  plugins: [],
};

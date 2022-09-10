/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B03931",
        light: "#E9E9E9",
      },
      backgroundImage: {
        qrPlaceholder: "url(/public/assets/qr-placeholder.svg)",
      },
    },
  },
  plugins: [],
};

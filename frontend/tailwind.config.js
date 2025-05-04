/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}".replace(/\\/g, "/"),
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
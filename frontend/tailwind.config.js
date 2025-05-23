/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0B1120',
      },
      boxShadow: {
        glow: '0 0 8px 2px rgba(0, 255, 255, 0.5)', // Your original custom glow
      },
    },
  },
  plugins: [],
}
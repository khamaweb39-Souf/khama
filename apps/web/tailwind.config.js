/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#800020',
          dark: '#4d0013',
          light: '#a62644',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#f1d592',
          dark: '#aa8c2c',
        }
      },
    },
  },
  plugins: [],
}

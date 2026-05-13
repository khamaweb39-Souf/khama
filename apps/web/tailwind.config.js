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
          DEFAULT: '#2D3561',
          dark: '#1A1A2E',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F0E6C8',
          dark: '#8B6914',
        },
        ecru: '#F5F0E8',
        'off-white': '#FEFCF8',
        charcoal: '#1A1A2E',
        grege: '#9E8E7E',
        sage: '#4A7C59',
        sienna: '#C4713A',
        garance: '#B23B3B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

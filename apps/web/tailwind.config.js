/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 2025 Luxury Textile Palette
        midnight: {
          DEFAULT: '#0D0C0A',
          light: '#1A1917',
          deep: '#050505',
        },
        amber: {
          DEFAULT: '#C9A84C',
          light: '#E8CC7A',
          dark: '#9A7A2E',
        },
        terracotta: {
          DEFAULT: '#C4713A',
          light: '#D98E5F',
          dark: '#A65A2B',
        },
        olive: {
          DEFAULT: '#4A7C59',
          light: '#6B9A7A',
          dark: '#355C41',
        },
        burgundy: {
          DEFAULT: '#5C0029',
          dark: '#3D001B',
        },
        ecru: {
          DEFAULT: '#F5F0E8',
          muted: 'rgba(245, 240, 232, 0.72)',
          ghost: 'rgba(245, 240, 232, 0.14)',
        },
        charcoal: '#1A1A2E',
        obsidian: '#0D0C0A',
        silk: '#EDE6D6',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

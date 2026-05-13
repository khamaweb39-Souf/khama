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
        // Core Premium Palette
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8D4A2',
          dark: '#A68B39',
        },
        navy: {
          DEFAULT: '#0A1628',
          light: '#1A2B45',
          dark: '#050D18',
        },
        copper: {
          DEFAULT: '#B87333',
          light: '#D2915A',
          dark: '#8C5727',
        },
        // Secondary Textile Colors
        emerald: '#2D6A4F',
        burgundy: '#722F37',
        cream: '#FDF8F0',
        charcoal: '#1A1A1A',
        // Status Colors (Premium tints)
        success: '#1B4332',
        warning: '#8B4513',
        error: '#660708',
      },
      fontFamily: {
        display: ['Cairo', 'sans-serif'],
        body: ['Tajawal', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gold': 'linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(201, 168, 76, 0.05))',
        'silk-gradient': 'linear-gradient(90deg, #FDF8F0 0%, #F5F0E8 50%, #FDF8F0 100%)',
      },
      boxShadow: {
        'silk': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'gold-glow': '0 0 15px rgba(201, 168, 76, 0.2)',
      },
    },
  },
  plugins: [],
}

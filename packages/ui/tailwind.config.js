module.exports = {
  content: [
    "../../apps/web/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#722F37',
          dark: '#5A252C',
          light: '#8B3A42',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C76B',
          dark: '#B8960C',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shark: {
          100: '#fcfdfd',
          200: '#f4f5f6',
          300: '#eeeff0',
          600: '#2c3335',
          700: '#27292e',
          800: '#1f2125',
          900: '#1a1d1e'
        }
      }
    }
  },
  plugins: []
}

import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'light': 'inset 1px 1px 1px rgba(255, 255, 255, 0.45)',
        'dark': 'inset 1px 1px 1px rgba(0, 0, 0, 0.45)'
      },
      fontFamily: {
        digi: ['DS-DIGI','sans-serif']
      }
    },
  },
  plugins: [],
}


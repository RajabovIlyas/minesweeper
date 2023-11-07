import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    textColor: {
      'ct1': '#06b6d4',
      'ct2': '#84cc16',
      'ct3': '#ef4444',
      'ct4': '#1d4ed8',
      'ct5': '#854d0e',
      'ct6': '#0e7490',
      'ct7': '#262626',
      'ct8': '#38bdf8',
    },
    colors: {
      'close': '#94a3b8',
      'close_hover': '#475569',
      'open': '#e2e8f0',
    },
    extend: {
    },
  },
  plugins: [],
}


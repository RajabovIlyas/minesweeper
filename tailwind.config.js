import plugin from 'tailwindcss';
import { GameStatus } from './src/enums/game-status.enum.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        }
      },
      boxShadow: {
        'light': 'inset 1px 1px 1px rgba(255, 255, 255, 0.45)',
        'dark': 'inset 1px 1px 1px rgba(0, 0, 0, 0.45)',
        'switch': 'inset 3px -3px 0px 0px #eff6ff'
      },
      fontFamily: {
        digi: ['DS-DIGI', 'sans-serif']
      }
    }
  },
  plugins: []
};

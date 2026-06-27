/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Optimus
        primary: '#136041',
        secondary: '#1D9D6A',
        accent: '#147a51',
        // Neutras / Backgrounds
        'bg-dark': '#000000',
        'panel-dark': '#0f172a',
        'card-dark': '#1e293b',
        // Metálicos / Decorativos
        'gear-light': '#d9d9d9',
        'gear-dark': '#1a704e',
        // Textos
        'text-light': '#f5f5f5',
        'text-dark': '#000000',
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-slow-reverse': 'spin-reverse 45s linear infinite',
        'circuit-pulse': 'circuit-pulse 4s ease-in-out infinite',
        'equalize': 'equalize 1s ease-in-out infinite',
        'float-up': 'float-up linear infinite',
        'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'circuit-pulse': {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.6' },
        },
        equalize: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-110vh) scale(0.4)', opacity: '0' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.92' },
          '50%': { opacity: '0.7' },
          '55%': { opacity: '0.95' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

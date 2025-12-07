/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: {
            bg: '#0A0A0A',
            card: '#141414',
            border: '#1F1F1F',
            hover: '#1A1A1A',
          }
        },
        animation: {
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.5s ease-out',
          'scale-in': 'scaleIn 0.3s ease-out',
          'glow': 'glow 2s ease-in-out infinite',
        },
        keyframes: {
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          glow: {
            '0%, 100%': { boxShadow: '0 0 20px rgba(230, 0, 0, 0.3)' },
            '50%': { boxShadow: '0 0 30px rgba(230, 0, 0, 0.6)' },
          },
        },
      },
    },
    plugins: [],
  }

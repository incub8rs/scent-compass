/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#1c1726',
          soft: '#3a3450',
        },
        compass: {
          50: '#f6f3ff',
          100: '#ece6ff',
          200: '#d8ccff',
          300: '#bda7ff',
          400: '#9d78f7',
          500: '#7f4ee8',
          600: '#6a35d1',
          700: '#5727ab',
          800: '#48238a',
          900: '#3c2071',
        },
        gold: {
          400: '#e6b860',
          500: '#d99e3a',
        },
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(60, 32, 113, 0.25)',
        glow: '0 0 60px -10px rgba(127, 78, 232, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'scale-in': 'scale-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f6ff',
          100: '#e5e9ff',
          200: '#c5cdff',
          300: '#9da7ff',
          400: '#6b70ff',
          500: '#4f4cff',
          600: '#3b34d9',
          700: '#2e29ac',
          800: '#23207f',
          900: '#19175f',
        },
      },
    },
  },
  plugins: [],
}


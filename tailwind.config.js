/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        handloom: {
          red: '#B0413E',
          gold: '#CBA135',
          indigo: '#1F3A5F',
          teal: '#0F766E',
          cream: '#FAF3E0',
        }
      }
    },
  },
  plugins: [],
}



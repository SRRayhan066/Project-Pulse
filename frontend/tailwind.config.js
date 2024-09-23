/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Azeret Mono', 'sans-serif'], 
        silkscreen: ['Silkscreen', 'sans-serif'],
      },
      screens: {
        'xs' : '230px',
      }
    },
  },
  plugins: [],
}


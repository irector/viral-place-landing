/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '3xl': '1.75rem',
      },
      colors: {
        'primary': '#1C1C1D',
        'secondary': '#606069',
        'accent': '#EF4D2A',
      }
    },
  },
  plugins: [],
}


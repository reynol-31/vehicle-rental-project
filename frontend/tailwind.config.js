/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5A827E',
        secondary: '#84AE92',
        accent: '#B9D4AA',
        light: '#FAFFCA',
      },
    },
  },
  plugins: [],
}

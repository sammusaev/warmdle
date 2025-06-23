/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-correct': '#c51a1a',
        'game-hot': '#d36627',
        'game-warm': '#d0a822',
        'game-default': '#1f2937'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/aspect-ratio'),
    // eslint-disable-next-line no-undef
    require("tailwindcss-animate"),

  ],
}

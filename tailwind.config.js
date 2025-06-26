// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#F8BBD0',
        darkpink: '#F48FB1',
        blushPink: '#FCE4EC',
        ivory: '#FFF8F0',
        ivorycard: '#FFEFF3',
        green: '#C8E6C9',
        mintgreen: '#A5D6A7',
        charcoal: '#333333',
        warmgrey: '#666666',
        lightgrey: '#E0E0E0',
      },
    },
  },
  plugins: [],
}

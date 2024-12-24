/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#008CFF',
        'second': '#BAE0FF'
      },
      backgroundImage: {
        'gradient-15': 'linear-gradient(15deg, #008CFF 20%, #FFFFFF 60%)'
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary" : "#0C9709",
        "secondary" : "#63847C",
        "mainBg" : "#F2F2F2",
        "veryWeak" : "#f50505",
        "weak": "#e18700",
        "good":"#e1bb00",
        "strong":"#23AD52",
      },
    },

    fontFamily:{
      primary : "Oswald"
    },
  },
  plugins: [],
}

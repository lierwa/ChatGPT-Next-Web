/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderColor: 'rgb(222, 222, 222)',
    },
    colors: {
      white: 'rgb(255, 255, 255)',
      "d-white": "rgb(30, 30, 30)",
      black: 'rgb(48, 48, 48)',
      'd-black': 'rgb(187, 187, 187)',
      gray: 'rgb(250, 250, 250)',
      'd-gary': 'rgb(21, 21, 21)',
      primary: 'rgb(29, 147, 171)',
      second: 'rgb(231, 248, 255)',
      'd-second': 'rgb(27 38 42)',
      disabled: '#BFBFBF',
      'hover-color': '#f3f3f3',
      'd-hover-color': '#323232',
      'bar-color': 'rgba(0, 0, 0, 0.1)',
      'd-bar-color': 'rgba(255, 255, 255, 0.1)',
      
      'theme-color': 'rgb(250, 250, 250)',
      "b-color": 'rgb(222, 222, 222)',
      "d-b-color": 'rgba(255, 255, 255, 0.192)',
    },
    boxShadow: {
      default: '50px 50px 100px 10px rgb(0, 0, 0, 0.1)',
      'card-shadow': '0px 2px 4px 0px rgb(0, 0, 0, 0.05)',
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["light", "dark", "cupcake", "bumblebee"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}


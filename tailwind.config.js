/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.js"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sfondo_desktop': 'url("../background/flat-comic.png")',
      },
      fontFamily: {
        'muli': ['Mulish'],
        'roboto': ['Roboto']
      },
      content: {
        //png
        'goback': 'url("../images/GoBack.png")',
      }
    },
  },
  plugins: [],
}

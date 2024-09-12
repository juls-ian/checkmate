/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Merriweather"', "sans-serif"],
        customFont: ['"Lato"', "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

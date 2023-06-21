/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0072F5',
        'primary-dark': '#0952A5',
        'primary-light': '#3694FF',
        'secondary': '#9750DD',
        'success': '#17C964',
        'warning': '#F5A524',
        'error': '#F31260',
        'white': '#FFFF',
        'neutral': '#697177',
        'black': '#000000',
        'accent-dark': '#16181A',
        'accent-light': '#F1F3F5'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
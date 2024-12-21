/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Include all files in the `app` directory
    './pages/**/*.{js,ts,jsx,tsx}', // Include `pages` directory for older Next.js versions
    './components/*.{js,ts,jsx,tsx}', // Include any components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-inter)', 'sans-serif'],
        mona: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // Untuk Next.js dengan App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // Untuk Next.js dengan Pages Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

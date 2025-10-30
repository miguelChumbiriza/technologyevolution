/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        whatsapp: '#25D366',
        facebook: '#1877F2',
        instagram: '#E1306C',
        tiktok: '#000000',
      }
    },
  },
  plugins: [],
}
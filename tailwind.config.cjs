// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 activa el modo oscuro basado en clases
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
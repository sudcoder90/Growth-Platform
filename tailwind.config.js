/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walmart: {
          blue: '#0071CE',
          yellow: '#FFC220',
          navy: '#004F9A',
          lightBlue: '#78B9E7',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
    },
  },
  plugins: [],
}

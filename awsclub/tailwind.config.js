/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {animation: {
        'bounce-slow': 'bounce 8s infinite',
        'bounce-slower': 'bounce 12s infinite',
        'bounce-faster': 'bounce 4s infinite',
      },},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noble-black': '#0A1B2E',
        'solo': '#F2F6FB',
        'wainscot-green': '#A1B2C4',
        'hive-delight': '#E1E8F0',
        'stone-ground': '#7A8CA6',
        'olivia': '#557392',
        'deep-bronze': '#34506D',
      },
      fontFamily: {
        playfair: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        montserrat: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'cinema': '0.25em',
        'ultra': '0.35em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(196, 210, 225, 0.16)',
        'gold-glow-lg': '0 0 45px rgba(196, 210, 225, 0.22)',
        'bronze-surface': '0 18px 50px -28px rgba(0, 0, 0, 0.72), inset 0 1px 0 rgba(225, 232, 240, 0.07)',
      }
    },
  },
  plugins: [],
}

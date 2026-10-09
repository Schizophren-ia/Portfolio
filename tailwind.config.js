/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noble-black': '#1E2524',
        'solo': '#CCD4D0',
        'wainscot-green': '#9D9F87',
        'hive-delight': '#F1C34C',
        'stone-ground': '#D39730',
        'olivia': '#986626',
        'deep-bronze': '#504530',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'cinema': '0.25em',
        'ultra': '0.35em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(241, 195, 76, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(241, 195, 76, 0.4)',
        'bronze-surface': '0 10px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(204, 212, 208, 0.08)',
      }
    },
  },
  plugins: [],
}

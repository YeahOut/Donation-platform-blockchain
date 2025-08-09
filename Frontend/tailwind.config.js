/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        grayText: '#757B83',
        divider: '#E6EBF0',
        stroke: '#D7DBE2',
        primary: '#1AA0FB',
      },
      borderRadius: {
        xl: '12px',
      },
    },
  },
  plugins: [],
}


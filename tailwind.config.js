/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4CAF50',
        'primary-dark': '#2E7D32',
        'primary-light': '#A5D6A7',
        'secondary': '#FFC107',
        'text': '#212121',
        'background': '#FAFAFA',
      },
      animation: {
        'winner-pulse': 'winner-pulse 1.5s infinite',
        'pop-in': 'pop-in 0.3s ease forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-in': 'slide-in 0.3s ease forwards',
      },
      keyframes: {
        'winner-pulse': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-in': {
          'from': { transform: 'translateY(-20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'xl': '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'game': '8px',
      },
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
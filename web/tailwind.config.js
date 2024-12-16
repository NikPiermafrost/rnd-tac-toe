module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        yellow: '#F6C962',
        blue: '#373B47',
        darkBlue: '#21242b',
        white: '#F3F5EF',
        pink: '#b99e9a'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

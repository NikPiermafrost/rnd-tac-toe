module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        yellow: '#F6C962',
        blue: '#373B47',
        darkBlue: '#21242b',
        white: '#F3F5EF'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

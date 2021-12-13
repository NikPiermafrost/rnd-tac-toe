module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
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
  plugins: [],
}

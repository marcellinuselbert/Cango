module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{ 
      'sans':['Poppins']
    },
    extend: {
      spacing: {
        ext:'35rem',
        extr:'30rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

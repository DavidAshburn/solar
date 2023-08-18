const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        'inter': ['Inter Tight', 'sans-serif'],
        'abril': ['Abril Fatface', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        sitemain: '#214265',
        sitesecond: '#07a7cb',
        sitethird: '#00728b',
        sitedark: '#092038',
        gold: '#efc634',
      },
      letterSpacing: {
        logo: '-.2em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}

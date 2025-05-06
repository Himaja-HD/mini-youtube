module.exports = {
    content: [
      "./views/**/*.ejs",  // HTML templates
      "./public/**/*.js",  // Any custom JS
    ],
    theme: {
      extend: {
        colors: {
          'primary-dark': '#0f0f0f',
          'primary-light': '#ffffff',
          'transparent-light-10': 'rgba(255,255,255,0.1)',
          'transparent-light-15': 'rgba(255,255,255,0.15)',
          'border-color': '#333333',
          'cover-color': 'rgba(0,0,0,0.5)',
        },
      },
    },
    plugins: [],
  }
  
const browserslist = require('./package.json').browserslist;

module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: {
        overrideBrowserslist: browserslist,
      },
      features: {},
    },
    'postcss-sorting': {
      'properties-order': 'alphabetical',
    },
  },
};

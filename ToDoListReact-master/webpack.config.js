const path = require('path');

module.exports = {
  // ... שאר ההגדרות
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};

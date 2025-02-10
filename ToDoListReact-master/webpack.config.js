const path = require('path');

module.exports = {
  mode: 'development', // או 'production' בהתאם לצורך שלך
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // תומך בקבצי JavaScript ו-JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // משתמש ב-Babel כדי לקמפל את הקוד
        },
      },
    ],
  },
};

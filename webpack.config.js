const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/pages/Home.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'home.js',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
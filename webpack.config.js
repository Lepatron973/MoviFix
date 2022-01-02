const path = require('path');
const config = require('./config/config');
console.log(config.MODE)
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: config.MODE,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  devtool: "eval",
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
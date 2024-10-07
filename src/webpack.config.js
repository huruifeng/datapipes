// webpack.config.js
module.exports = {
  // other configuration options...
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // Add .ts and .tsx
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // Match .ts and .tsx files
        use: 'ts-loader', // or 'babel-loader' if you're using Babel
        exclude: /node_modules/,
      },
      // other loaders
    ],
  },
};
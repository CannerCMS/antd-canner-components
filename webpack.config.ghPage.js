const path = require("path");

module.exports = {
  entry: './_gh-pages/index.js',
  output: {
    path: path.join(__dirname, '_gh-pages/static'),
    filename: 'bundle.js',
    libraryTarget: 'var'
  },
  externals: {
    'react': "React",
    'react-dom': "ReactDOM"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      packages: path.resolve(__dirname, "./packages"),
      utils: path.resolve(__dirname, "./utils"),
      '@canner/react-cms-helpers': path.resolve(__dirname, 'node_modules', '@canner/react-cms-helpers'),
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components')
    }
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style'
          },
          {
            loader: 'css'
          }
        ]
      }
    ]
  }
};
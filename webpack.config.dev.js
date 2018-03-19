const path = require("path");
const pkg = require("./package.json");
const theme = pkg.theme;

module.exports = {
  entry: "./docs/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      packages: path.resolve(__dirname, "./packages"),
      utils: path.resolve(__dirname, "./utils"),
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
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          }
        ],
        exclude: [/\.antd.scss$/, /\.lib.scss$/]
      },
      {
        test: [/\.antd.scss$/, /\.lib.scss$/],
        use: [
          {
            loader: 'style'
          },
          {
            loader: 'css'
          },
          {
            loader: 'sass'
          }
        ],
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
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style'
          },
          {
            loader: 'css'
          },
          {
            loader: 'less',
            // antd - customized themes
            // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
            options: {
              modifyVars: theme
            }
          }
        ],
      }
    ]
  }
};

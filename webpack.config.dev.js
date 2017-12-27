var path = require("path");
var webpack = require("webpack");
var pkg = require("./package.json");
var theme = pkg.theme;

module.exports = {
  devtool: "eval-source-map",
  entry: ["webpack-hot-middleware/client", "./docs/index.js"],
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
      utils: path.resolve(__dirname, "./utils")
    }
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        loaders: [
          "style?sourceMap",
          "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
          "resolve-url",
          "sass?sourceMap"
        ],
        exclude: [/\.antd.scss$/, /\.lib.scss$/]
      },
      {
        test: [/\.antd.scss$/, /\.lib.scss$/],
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: "style!css?modules",
        include: /flexboxgrid/
      },
      {
        // exclude flexboxgrid is for https://github.com/Canner/react-qa-core-plugins
        test: /\.css$/,
        loaders: ["style", "css"],
        exclude: /flexboxgrid/
      },
      {
        test: /\.less$/,
        loaders: [
          "style",
          "css",
          // antd customized themes，modifyVars 裡可以放要 overwrite 的 antd styles
          // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
          `less?{"modifyVars":${JSON.stringify(theme)}}`
        ]
      }
    ]
  }
};

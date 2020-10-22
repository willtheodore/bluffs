const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-class-properties", {"loose": true}],
              ]
            }
          },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.(jpe?g|png)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html"
    })
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devServer: {
    historyApiFallback: true,
  }
}
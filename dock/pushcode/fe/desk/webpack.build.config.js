const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "src");
const resolve = (dir) => path.resolve(__dirname, dir);
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  output: {
    path: resolve("build-html")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false
            }
          },
          "postcss-loader"
        ],
        include: defaultInclude
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{ loader: "file-loader?name=images/[name].[ext]" }],
        include: defaultInclude
      },
      // {
      //   test: /\.svg$/,
      //   use: ["file-loader"],
      // },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{ loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" }],
        include: defaultInclude
      }
    ]
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "bundle.css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    })
    // new MinifyPlugin(),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  },
  optimization: {
    minimize: true
  },
  resolve: {
    alias: {
      "@": resolve("src")
    },
    extensions: [".ts", ".js", ".jsx"]
  }
};

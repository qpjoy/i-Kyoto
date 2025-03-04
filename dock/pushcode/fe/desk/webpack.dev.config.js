const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { spawn } = require("child_process");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "src");
const resolve = (dir) => path.resolve(__dirname, dir);
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log("Goal: ", env.goal); // 'local'
  console.log("Production: ", env.production); // true
  console.log("NODE_ENV", process.env.NODE_ENV);
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                esModule: false
              }
            },
            { loader: "postcss-loader" }
          ],
          include: defaultInclude
        },
        {
          test: /\.jsx?$/,
          use: [{ loader: "babel-loader" }],
          include: defaultInclude
        },
        // {
        //   test: /\.(jpe?g|png|gif)$/,
        //   use: [
        //     {
        //       loader: "file-loader?name=images/[name].[ext]",
        //     },
        //   ],
        //   include: defaultInclude,
        // },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: ["file-loader"],
          include: defaultInclude
        },
        {
          test: /\.svg$/,
          use: [
            "@svgr/webpack",
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "[name].[hash].[ext]",
                outputPath: "images"
              }
            }
          ]
        },
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
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
      })
    ],
    devtool: "cheap-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "build-html"),
      stats: {
        colors: true,
        chunks: false,
        children: false
      },
      before() {
        spawn("electron", ["."], {
          shell: true,
          env: process.env,
          stdio: "inherit"
        })
          .on("close", (code) => process.exit(0))
          .on("error", (spawnError) => console.error(spawnError));
      }
    },
    resolve: {
      alias: {
        "@": resolve("src")
      },
      extensions: [".ts", ".js", ".jsx"]
    }
  };
};

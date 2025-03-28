const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const siteDir = path.join(__dirname, "..", "Site");
  const devServerPort = 2200;
  return {
    mode: argv.mode,
    devtool: isDev ? "source-map" : "eval-source-map",
    entry: "./src/index.ts",
    output: {
      path: siteDir,
      filename: "js/bundle.js",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: { "#": path.resolve(__dirname, "src/") },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        }, {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "css/bundle.css" }),
    ],
    optimization: {
      minimize: !isDev,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devServer: {
      static: siteDir,
      compress: true,
      port: devServerPort,
      hot: true,
    },
  };
};

/**
 * Main Webpack configuration
 */

const { mainConfig, baseConfig } = require("./configuration");
const babelConfig = require("../babel.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfig = {
    mode: mainConfig.isProductionEnv ? "production" : "development",

    entry: [
        // "react-hot-loader/patch",
        mainConfig.src.appEntrypoint
    ],
    output: {
        path: baseConfig.distDirectory,
        filename: mainConfig.dist.bundleFilename,
    },

    target: "browserslist",

    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js",
            ".jsx",
        ],
        // alias: {
        //     "react-dom": "@hot-loader/react-dom"
        // }
    },

    watchOptions: {
        aggregateTimeout: 100,
    },
    devServer: {
        static: baseConfig.distDirectory
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(js|ts|jsx|tsx)/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: babelConfig,
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: mainConfig.src.indexHtml,
            filename: mainConfig.dist.htmlFilename,
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin()
    ]
};

module.exports = webpackConfig;

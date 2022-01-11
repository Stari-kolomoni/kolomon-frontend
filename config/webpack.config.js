/**
 * Main Webpack configuration
 */

const { mainConfig, baseConfig } = require("./configuration");
const babelConfig = require("../babel.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: mainConfig.isProductionEnv ? "production" : "development",

    entry: [
        mainConfig.src.appEntrypoint
    ],
    output: {
        path: baseConfig.distDirectory,
        filename: mainConfig.dist.bundleFilename,
        publicPath: "/"
    },

    target: "browserslist",

    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js",
            ".jsx",
        ],
    },

    watchOptions: {
        aggregateTimeout: 100,
    },
    // TODO is this in production as well? the webpack documentation mentions something along those lines
    devtool: mainConfig.isProductionEnv ? false : "source-map",
    devServer: {
        static: baseConfig.distDirectory,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.svg/i,
                use: "raw-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    mainConfig.isProductionEnv ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("dart-sass"),
                            sassOptions: {
                                fiber: require("fibers"),
                                sourceMap: !mainConfig.isProductionEnv,
                                outputStyle: mainConfig.isProductionEnv ? "compressed" : "expanded",
                            }
                        }
                    }
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
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new HtmlWebpackPlugin({
            template: mainConfig.src.indexHtml,
            filename: mainConfig.dist.htmlFilename,
        }),
        new CleanWebpackPlugin(),
        new DefinePlugin({
            IS_PRODUCTION: mainConfig.isProductionEnv,
            // TODO move this into the config file
            API_ENDPOINT_URL: mainConfig.isProductionEnv ? "\"https://TODO.KOLOMON.FINAL.URL\"" : "\"http://localhost:8000\"",
        }),
    ]
};

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('./../../config/index');
const env = require('./../../config/env');
const utils = require('./../utils');

module.exports = merge(common, {
    mode: 'development',

    output: {
        filename: utils.contentsDir('[name].js'),
        publicPath: config.dev.publicPath,
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: utils.contentsDir('[name].css'),
            chunkFilename: utils.contentsDir('[name].css'),
        }),
    ],

    performance: {
        hints: false
    },

    devtool: "#source-map",

    serve: {
        content: config.build.bundleDir,
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,
    },
});

console.log("開発モードでバンドルします");

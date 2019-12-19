const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('./../../config/index');
const env = require('./../../config/env');
const utils = require('./../utils');

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: utils.contentsDir('[name].[hash:7].js'),
        publicPath:  config.build.publicPath,
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'spa_index.html',
            template: 'index.html',
            inlineSource: /\.(sa|sc|c)ss$/,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new MiniCssExtractPlugin({
            filename: utils.contentsDir('[name].[hash:7].css'),
            chunkFilename: utils.contentsDir('[name].[hash:7].css'),
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            include: 'initial',
            as(entry) {
                if (/\.(woff2|woff|eot|ttf|otf)$/.test(entry)) return 'font';
                if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(entry)) return 'image';
                if (/\.(sa|sc|c)ss$/.test(entry)) return 'style';
                return 'script'
            }
        }),
    ],

    performance: {
        hints: false
    },

    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    devtool: false,

});

console.log("本番モードでバンドルします");

const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('./../../config/index');
const env = require('./../../config/env');
const utils = require('./../utils');

module.exports = {
    entry:  './src/index.jsx',

    output: {
        path: config.build.bundleDir,
    },

    resolve: {
        // モジュールを読み込むときに検索するディレクトリの設定
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        // importするときに省略できる拡張子の設定
        extensions: ['.js', '.jsx'],
        alias: {
            // 例えばmain.js内で `import Vue from 'vue';` と記述したときの`from vue`が表すファイルパスを指定
            'vue$': 'vue/dist/vue.esm.js',
            'jquery': "jquery/dist/jquery.js",
            '@': utils.resolve('src'),
        },
    },

    plugins: [
        //jQueryグローバル設定
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new webpack.EnvironmentPlugin(env.ENVS),
        new CopyWebpackPlugin(
            [
                {from: '', to: '',},
            ],
            {context: 'assets'}
        ),
    ],

    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        },
    },

    stats: 'minimal',

    bail: true,

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // CSSをバンドルするための機能
                    env.ENV_IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            minimize: true,
                            sourceMap: false,
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            minimize: true,
                            sourceMap: !env.ENV_IS_PROD,
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.staticsDir('image/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.staticsDir('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.staticsDir('font/[name].[hash:7].[ext]')
                }
            },
        ]
    },
};

console.log(env.ENVS);

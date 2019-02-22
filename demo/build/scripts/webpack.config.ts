///<reference path="../typings/index.d.ts"/>
import util from './util'
import * as VueLoaderPlugin from 'vue-loader/lib/plugin'
import config from '../config';
import MiniCssExtractPlugin = require('mini-css-extract-plugin')
import autoprefixer = require('autoprefixer');
const { root, isDev, assetsPath, getEntryByGlob } = util;

export default {
    entry: getEntryByGlob(config.entry),
    output: {
        filename: '[name].js',
        path: root(config.outputDir),
        libraryExport: 'default'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': root('src'),
            '@lib': root('src/lib'),
            '@service': root('src/service')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: root('src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                [
                                    "transform-vue-jsx",
                                ],
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        "corejs": 2
                                    }
                                ],
                                [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                include: root('src'),
                loader: "ts-loader",
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                [
                                    "transform-vue-jsx",
                                ],
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        "corejs": 2
                                    }
                                ],
                                [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ],
            },
            {
                test: /\.vue$/,
                include: root('src'),
                loader: 'vue-loader',
            },
            {
                test: /\.(css|scss)$/,
                include: root('src'),
                use: [
                    'style-loader',
                    isDev ? 'vue-style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer("last 100 versions")
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.html$/,
                include: root('src'),
                loader: "mustache-loader"
            },

        ]
    },
    externals: {
        'vue': '(window.Vue.default = window.Vue)',
        'vue-router': '(window.VueRouter.default = window.VueRouter)',
        'vuex': '(window.Vuex.default = window.Vuex)'
    },
    plugins: [
        new VueLoaderPlugin()
    ]

}
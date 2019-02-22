process.env.NODE_ENV = 'production'

import * as merge from 'webpack-merge'
import * as webpack from 'webpack'
import baseConfig from './webpack.config';
import util from './util';
import config from '../config';
import MiniCssExtractPlugin = require('mini-css-extract-plugin')
import ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
import CopyWebpackPlugin = require('copy-webpack-plugin');
import OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
import cleanWebpackPlugin = require('clean-webpack-plugin');
const { root, getEntryByGlob, getTemplates, assetsPath } = util;
const entry = getEntryByGlob(config.entry);

export default merge(baseConfig, {
    mode: 'production',
    output: {
        publicPath: '<%=cdn%>',
        filename: assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: assetsPath('js/[id].[chunkhash].js')
    },
    devtool: false,
    optimization: {
        minimize: true,
        nodeEnv: 'production',
        runtimeChunk: {
            name: entrypoint => `runtimechunk~${entrypoint.name}`
        }
    },
    stats: 'none',
    plugins: [
        new cleanWebpackPlugin(config.outputDir, {
            root: root(''),
            allowExternal: true,
            verbose: false
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            },
            'process.env.VUE_ENV': '"client"'
        }),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[contenthash].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([{
            from: root('src/static'),
            to: assetsPath('assets'),
            ignore: ['.*']
        }]),
        ...getTemplates(entry, i => {
            return {
                title: config.title,
                filename: config.templateOutputDir + i + '.ejs',
                minify: true,
                cache: false,
                template: config.template[i] && util.root(config.template[i])
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtimechunk..*.js$/
        }),
        config.showAnalyze ? (new (<any>require('webpack-bundle-analyzer')).BundleAnalyzerPlugin)({
            analyzerPort: 9090
        }) : e => { }
    ],
})
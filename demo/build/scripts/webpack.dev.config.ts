process.env.NODE_ENV = 'development'

import * as merge from 'webpack-merge'
import * as webpack from 'webpack'
import util from './util'
import baseConfig from './webpack.config'
import config from '../config'
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
import CopyWebpackPlugin = require('copy-webpack-plugin');
const { getEntryByGlob, getTemplates,root, assetsPath } = util
const entry = getEntryByGlob(config.entry)


export default merge(baseConfig, {
    mode: 'development',
    output: merge(baseConfig.output, {
        publicPath: '/'
    }),
    devtool: "#cheap-module-eval-source-map",
    plugins: [
        ...getTemplates(entry, (name) => {
            return {
                title: config.title,
                filename: `${name}.html`,
                template: config.template[name] && util.root(config.template[name])
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"development"'
            }
        }),
        new CopyWebpackPlugin([{
            from: root('src/static'),
            to: assetsPath(''),
            ignore: ['.*']
        }]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ],

})

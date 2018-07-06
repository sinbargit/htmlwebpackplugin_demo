const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const config = {
    entry: {client: path.join(__dirname, '../webcontent/projects','demo/client.js')},
    output: {
        'publicPath': '//gamestatic.iqiyi.com/game/react/resource/demo',
        'path': path.join(__dirname, '../resource/demo'),
        'filename': '[name]-[hash:6].js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'react'],
                    },
                },
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            exclude: '/(node_modules)/',
            compress: {
                unused: true,
                drop_console: false,
                drop_debugger: true,
                dead_code: true,
                properties: false,
                warnings: false,
                screw_ie8: false,
            },
            mangle: {
                screw_ie8: false,
            },
            output: {
                screw_ie8: false,
            },
            comments: false,
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '../webcontent/projects','demo/dest/asset.js'),
            template: path.join(__dirname,'../webcontent/asset.ejs'),
            inject: false,
        }),
    ],
}


module.exports = config
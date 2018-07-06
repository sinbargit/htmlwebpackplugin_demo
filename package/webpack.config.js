const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = {
    entry: {},
    output: {},
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    },
    module: {
        rules: [
            {test: /\.json$/, use: {loader: 'json-loader'}},
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'stage-0', 'react', 'es3'],
                    },
                },
            },
            {
                enforce: 'post',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'es3ify-loader',
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/__static/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins:[]
                            }
                        }],
                }),
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
            },
        }),
        new ExtractTextPlugin('styles.css'),
        new LiveReloadPlugin({
            ignore: 'node_modules',
        }),
    ],
};
const production = {
    watch: false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            exclude:'/(node_modules)/',
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
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
            },
        }),
        new ExtractTextPlugin('styles.css'),
    ],
};
process.env.NODE_ENV === 'production' && Object.assign(config, production);
module.exports = config;
const fs = require('fs')
const rm = require('rimraf').sync
const webpack = require('webpack')
const config = require('../config')
const baseConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

webpack(baseConfig, function (err, info) {
    err || console.log(info)
})


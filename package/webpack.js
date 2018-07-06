const webpack = require('webpack')
const baseConfig = require('./webpack.config')


webpack(baseConfig, function (err, info) {
    err || console.log(info)
})


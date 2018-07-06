const fs = require('fs')
const rm = require('rimraf').sync
const webpack = require('webpack')
const config = require('../config')
const baseConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const spawn = require('child_process').spawn
const scriptInject = '<script>' +
    'if(window.WebSocket){' +
    'document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':35729/livereload.js?snipver=1"></\' + \'script>\')'+
    '}' +
'</script>'
let project = process.argv[3] || 'demo'
if (!project) {
    console.warn('non project ')
}
const mode = process.argv[2] || 'dev'
console.info('mode', mode, 'project', project)
const path = require('path')
const find = require('find')
const dest = path.join(__dirname, '../resource', project)
if (fs.existsSync(dest)) {
    rm(dest)
    console.log('remove', dest)
}
const targets = new RegExp('client.js$')
const targetsArr = find.fileSync(targets,
    path.join(__dirname, '../webcontent/projects', project))
console.info(targetsArr)
const configs = []
targetsArr.forEach((ele) => {
    const relative = path.relative(
        path.join(__dirname, '../webcontent/projects'), path.dirname(ele)).
        replace(path.sep, '/')
    const obj = {
        entry: {
            client: [
                require.resolve('es5-shim'),
                require.resolve('es5-shim/es5-sham'),
                require.resolve('es6-promise/auto'),
                require.resolve('fetch-ie8'),
                path.join(__dirname, '../webcontent/lib/flexible.js'), ele],
        },
        output: {
            publicPath: config.cdn + relative,
            path: path.join(path.join(__dirname, '../resource'), relative),
            filename: (mode === 'dev' ? '[name].js' : '[name]-[hash:6].js'),
        },
    }
    const final = Object.create(baseConfig)
    const template = path.join(path.dirname(ele), 'template.html')
    const template_ssr = path.join(__dirname, '../webcontent/asset.ejs')
    const filename = path.join(
        path.join(__dirname, '../webcontent/projects', project, 'dest'),
        path.relative(path.join(__dirname, '../webcontent/projects', project),
            path.dirname(ele)), 'template.html')
    const filename_ssr = path.join(
        path.join(__dirname, '../webcontent/projects', project, 'dest'),
        path.relative(path.join(__dirname, '../webcontent/projects', project),
            path.dirname(ele)), 'asset.js')
    if (fs.existsSync(template)) {
        obj.plugins = final.plugins.slice()
        obj.plugins.push(new HtmlWebpackPlugin({
            devscript: process.env.NODE_ENV === 'production' ? '' : scriptInject,
            filename: filename,
            template: template,
        }))
    } else if (fs.existsSync(template_ssr)) {
        obj.plugins = final.plugins.slice()
        obj.plugins.push(new HtmlWebpackPlugin({
            devscript: process.env.NODE_ENV === 'production' ? '' : scriptInject,
            filename: filename_ssr,
            template: template_ssr,
            inject: false
        }))
    }
    configs.push(Object.assign(final, obj))
})
webpack(configs, function (err, info) {
    err || console.log(info)
})
if (process.env.NODE_ENV !== 'production') {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'run'],
        {stdio: [0, 1, 2]})
}
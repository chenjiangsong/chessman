var express = require('express')
var webpack = require('webpack')
var webpackConf = require('./webpack.config')

Object.keys(webpackConf.entry).forEach(function (name) {
  webpackConf.entry[name] = ['./build/dev-client'].concat(webpackConf.entry[name])
})

var app = express()
var compiler = webpack(webpackConf)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)

app.use(hotMiddleware)

app.listen(8080)

// webpack(webpackConf, function (err, stats) {
//   if (err) throw err
  
//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
//   }) + '\n\n')
// })
var webpack = require('webpack')
var webpackConf = require('./webpack.config.js')
var chalk = require('chalk')
var rm = require('rimraf')
var path = require('path')

rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err
  webpack(webpackConf, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    
    console.log(chalk.cyan('  Build complete.\n'))
  })
})
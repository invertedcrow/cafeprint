var fs = require("fs");
var str = fs.readFileSync("./hash");

module.exports = {
   // filenameHashing: false,
    productionSourceMap: false,
    outputDir: '../assets/app',   
    chainWebpack: config => {
      config.module.rule('images').use('url-loader')
        .loader('file-loader') // replaces the url-loader
        .tap(options => Object.assign(options, {
          name: 'img/[name].[ext]'
        }))
      config.module.rule('svg').use('file-loader')
        .tap(options => Object.assign(options, {
          name: 'img/[name].[ext]'
        }))
      config.output.chunkFilename(`js/[name].${str.toString()}.js`)
      config.output.filename(`js/[name].${str.toString()}.js`)
    },
  }

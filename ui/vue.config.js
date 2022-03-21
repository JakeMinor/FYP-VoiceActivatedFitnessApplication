const path = require('path')

module.exports = {
 chainWebpack: config => {
  config.module.rules.delete("svg");
 },
 configureWebpack: {
  module: {
   rules: [
    {
     test: /\.svg$/,
     loader: 'vue-svg-loader',
    },
   ]
  }
 },
 outputDir: path.resolve(__dirname, '../server/public')
}
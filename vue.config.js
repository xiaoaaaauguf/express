const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    resolve:{
      alias:{
        'components':'@/components',
        'assets':'@/assets',
        'views':'@/views',
        'common':'@/common',
        'network':'@/network'
      }
    }
  }
}
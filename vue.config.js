var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/world-cup-scores/'
    : '/',

  devServer: {
    port: 8080
  },

  css: {
    loaderOptions: {
      sass: {
        data: '@import ./src/styles/util/util.sass',
      }
    }
  },

  configureWebpack: {
    plugins: [
      // service worker caching
      new SWPrecacheWebpackPlugin({
        cacheId: 'world-cup-scores',
        filename: 'service-worker.js',
        staticFileGlobs: ['dist/**/*.{js,html,css}'],
        minify: true,
        stripPrefix: 'dist/'
      })
    ]
  }
};

var cssLoader = require('./css-loader')

/**
 * @param  {object} cooking - provide add, remove, config method
 * @param  {object} [options]
 */
module.exports = function (cooking) {
  var SOURCE_MAP = cooking.config.sourceMap

  // add loader
  cooking.add('loader.vue', {
    test: /\.vue$/,
    loaders: ['vue-loader']
  })

  cooking.add('loader.html', {
    test: /\.html$/,
    loaders: ['vue-html-loader?minimize=false']
  })

  // add extension
  cooking.config.resolve.extensions.push('.vue')

  // add vue config
  if (process.env.NODE_ENV === 'production') {
    cooking.config.vue = {
      loaders: cssLoader({
        sourceMap: SOURCE_MAP ? '#source-map' : false,
        extract: !!cooking.config.extractCSS
      })
    }
  } else {
    cooking.config.vue = {
      loaders: cssLoader()
    }
  }
}

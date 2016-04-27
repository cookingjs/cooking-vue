var cssLoader = require('./css-loader')

module.exports = function (cooking) {
  var SOURCE_MAP = cooking.config.sourceMap

  // add loader
  cooking.add('loader.vue', {
    test: /\.vue$/,
    loaders: ['vue']
  })

  // add extension
  cooking.config.resolve.extensions.push('.vue')

  // add vue config
  if (process.env.NODE_ENV === 'PRODUCTION') {
    cooking.config.vue = {
      loaders: cssLoader({
        sourceMap: SOURCE_MAP ? '#source-map' : false,
        extract: true
      })
    }
  } else {
    cooking.config.vue = {
      loaders: cssLoader()
    }
  }
}

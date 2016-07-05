var cssLoader = require('./css-loader')

/**
 * @param  {object} cooking - provide add, remove, config, _userConfig method
 * @param  {object} [options]
 */
module.exports = function (cooking) {
  var SOURCE_MAP = cooking.config.sourceMap
  cooking.config.vue = {}

  // add loader
  cooking.add('loader.vue', {
    test: /\.vue$/,
    loaders: ['vue-loader']
  })

  // add extension
  cooking.config.resolve.extensions.push('.vue')

  var postcss = cooking.config.postcss

  if (postcss) {
    cooking.config.vue.postcss = postcss
  }

  // add vue config
  cooking.config.vue.loaders = cssLoader({
    sourceMap: SOURCE_MAP ? '#source-map' : false,
    extract: !!cooking.config.extractCSS
  })
}

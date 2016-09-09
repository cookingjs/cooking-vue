var cssLoader = require('./css-loader')
var toString = Object.prototype.toString
var isFunction = function (val) {
  return toString.call(val) === '[object Function]'
}

/**
 * @param  {object} cooking - provide add, remove, config, _userConfig method
 * @param  {object} [options]
 */
module.exports = function (cooking) {
  var SOURCE_MAP = cooking.config.devtool

  cooking.config.vue = cooking.config.vue || {}

  // clear default babel config
  cooking.config.vue.babel = cooking.config.vue.babel || 'babel-loader'

  // add loader
  cooking.add('loader.vue', {
    test: /\.vue$/,
    loaders: ['vue-loader']
  })

  // add extension
  cooking.config.resolve.extensions.push('.vue')

  var plugins = cooking.config.postcss

  if (Array.isArray(plugins)) {
    cooking.config.vue.postcss = function (webpack) {
      return plugins.map(plugin => isFunction(plugin) ? plugin(webpack) : plugin)
    }
  } else if (plugins) {
    cooking.config.vue.postcss = plugins
  }

  // add vue config
  cooking.config.vue.loaders = cssLoader({
    sourceMap: SOURCE_MAP ? '#source-map' : false,
    extract: !!cooking.config.extractCSS
  })
}

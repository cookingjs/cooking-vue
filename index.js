var cssLoader = require('./css-loader')

/**
 * @param  {object} cooking - provide add, remove, config method
 * @param  {object} [options]
 */
module.exports = function (cooking) {
  var SOURCE_MAP = cooking.config.sourceMap
  var preLoader = []

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

  // styleLint preLoader
  if (cooking.config.extends.stylelint ||
      cooking.config.extends.includeOf('stylelint') > -1) {
    preLoader.push('stylelint-loader')
  }

  // add vue config
  cooking.config.vue = {
    loaders: cssLoader({
      sourceMap: SOURCE_MAP ? '#source-map' : false,
      extract: !!cooking.config.extractCSS,
      preLoader: preLoader
    })
  }
}

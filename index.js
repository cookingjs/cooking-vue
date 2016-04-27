module.exports = function (cooking) {
  cooking.add('loader.vue', {
    test: /\.vue$/,
    loaders: ['vue']
  })

  cooking.config.resolve.extensions.push('.vue')
}

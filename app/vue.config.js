module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
  },
  css: {
    extract: true,
    loaderOptions: {
      scss: {
        additionalData: '@import "@/App.scss";'
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.extensions.store.add('.ts')
    config.module
      .rule('typescript')
      .test(/\.tsx?$/)
      .exclude
      .add(/node_modules/)
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .tap((options) =>
        ({ ...options, happyPackMode: true })
      )

    const cssMoludes = ['vue-modules', 'vue', 'normal-modules', 'normal']
    cssMoludes.forEach((rule) => {
      config.module.rule('scss')
        .oneOf(rule)
        .use('resolve-url-loader')
        .loader('resolve-url-loader')
        .before('sass-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .tap((options) =>
          ({ ...options, sourceMap: true })
        )
    })
  }
}

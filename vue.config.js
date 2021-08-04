module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // eslint-disable-next-line quotes
        prependData: `@use "@/scss/main.scss" as *;`
      }
    }
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

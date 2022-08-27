//将子应用打包成一个个的lib，给父应用去使用
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd'
    },
    devServer: {
      port: 1000
    }
  }
})
//将子应用打包成一个个的lib，给父应用去使用
//umd的作用是会把打包后的singleVue都挂载在window上，window.singleVue.bootstrap/mount/unmount
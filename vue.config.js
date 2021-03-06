const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')

module.exports = {
  // 配置pxtorem插件对代码中的px进行转换，以37.5为1rem的值
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  // 插件配置
  pluginOptions: {
    // style-resources-loader配置
    'style-resources-loader': {
      // 预处理程序选择 less
      preProcessor: 'less',
      // 参数
      patterns: [
        // 项目根路径下 /src/styles/ 的所有less文件
        // 指定某一个的话可以具体设置为某一个less文件
        path.resolve(__dirname, './src/style/*.less')
      ]
    }
  }
}

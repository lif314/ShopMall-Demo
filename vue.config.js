const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 配置代理服务器：解决跨域问题
  devServer:{
    proxy:{
      '/api':{
        target: 'http://gmall-h5-api.atguigu.cn',  // 后端服务器
        // pathRewrite: {'^/api': ''}  // 路径重写
      }
    }
  }
})

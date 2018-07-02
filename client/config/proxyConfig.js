module.exports = {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080', // 接口域名
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true, //是否跨域
    }
  }
}
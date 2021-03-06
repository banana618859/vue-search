/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-08-16 18:56:11
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-25 23:37:32
 */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  devServer: {
    open: true,
    host: 'localhost',
    port: 8000,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
        '/api': {
            target: 'http://localhost:9000/',//这里后台的地址模拟的;应该填写你们真实的后台接口
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/api': ''//请求的时候使用这个api就可以
            }
        }
        
    }
  }
})

//app.js
// 引入封装好的request文件
import request from './utils/request.js'
App({
  onLaunch: function () {
    // 设置基准路径
    request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  }
})
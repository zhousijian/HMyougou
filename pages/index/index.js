//index.js
// 引入request文件
import request from '../../utils/request.js'
Page({
  data : {
    // 轮播图的数据
    message : []
  },
  onLoad(){
    // 轮播图的请求
    request({
      url: '/home/swiperdata'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        message: message
      })
    })
  }
})

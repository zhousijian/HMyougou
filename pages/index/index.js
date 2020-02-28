//index.js
// 引入request文件
import request from '../../utils/request.js'
Page({
  data : {
    // 轮播图的数据
    carousel : [],
    // 导航栏的数据
    nav : [],
    // 楼层得数据
    floor : []
  },
  onLoad(){
    // 轮播图的请求
    request({
      url: '/home/swiperdata'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        carousel: message
      })
    })

    // 导航栏的请求
    request({
      url: '/home/catitems'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      let arr = message.map(v=>{
        if(v.name == '分类'){
          v.url = "/pages/category/index"
        }
        return v
      })
      this.setData({
        nav : arr
      })
    })

    // 首页内容的请求
    request({
      url: '/home/floordata'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        floor : message
      })
    })

  }
})

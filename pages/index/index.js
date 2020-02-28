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
    floor : [],
    // 返回顶部按钮的状态
    isShow : false
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
  },
  // 点击按钮页面滚动回顶部
  handleClick(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // 页面滚动时触发的函数
  onPageScroll(e){
    // console.log(e)
    let current = this.data.isShow
    if(e.scrollTop > 100){
      current = true
    }else {
      current = false
    }
    if (current == this.data.isShow) return;
    this.setData({
      isShow : current
    })
  }
})

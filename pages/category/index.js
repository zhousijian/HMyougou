// pages/category/index.js
// 引入request文件
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面全部的数据
    allData : [],
    // 点击菜单获取的对应的索引
    current : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    request({
      url: '/categories'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        allData : message
      })
    })
  },
  handleClick(e){
    // console.log(e)
    this.setData({
      current : e.currentTarget.dataset.index
    })
  }

})
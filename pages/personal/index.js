// pages/personal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 点击收货地址管理
  handleAddress() {
    wx.chooseAddress()
  },
  // 点击联系客服
  handleTel() {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  }
})
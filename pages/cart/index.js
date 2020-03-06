// pages/cart/index.js
Page({

  data: {
    // 收货信息
    gainInfo: {}
  },

  onLoad: function (options) {
    // 从本地查看有没有收货地址
    this.setData({
      gainInfo: wx.getStorageSync('address')
    })
  },
  // 点击获取收货地址
  handleGainAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          gainInfo: {
            userName: res.userName,
            telNumber: res.telNumber,
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        // console.log(this.data.gainInfo)
        // 把收货地址保存到本地
        wx.setStorageSync('address', this.data.gainInfo)
      }
    })
  }
})
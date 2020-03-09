// pages/cart/index.js
Page({

  data: {
    // 收货信息
    gainInfo: {},
    // 本地加入购物车的商品
    storageGoods: [],
    // 总价格
    allPrice: 0
  },
  // 页面一开始加载时候触发，只触发一次
  onLoad: function(options) {
    // 从本地查看有没有收货地址
    this.setData({
      gainInfo: wx.getStorageSync('address')
    })
  },
  // 页面每次刷新和切换都会触发
  onShow() {
    // 从本地获取加入购物车的商品
    this.setData({
      storageGoods: wx.getStorageSync('goodsInfoArr')
    })
    // 计算总价格
    let price = 0
    if (!this.data.storageGoods) return;
    this.data.storageGoods.forEach(v => {
      if (v.goods_status) {
        price += v.goods_price * v.goods_number
      }
    })
    this.setData({
      allPrice: price
    })
  },
  handlePay(){
    const token = wx.getStorageSync('token')
    if(token){

    }else {
      wx.navigateTo({
        url : '/pages/authoriza/index'
      })
    }
  }
})
// pages/cart/index.js
import request from '../../utils/request.js'
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
      // 有token值，收集需要的参数，便发起创建订单请求
      // console.log(this.data.gainInfo)
      // console.log(this.data.storageGoods)
      let goods = this.data.storageGoods.map(v=>{
        if(v.goods_status){
          return {
            goods_id : v.goods_id,
            goods_number : v.goods_number,
            goods_price : v.goods_price
          }
        }
      })
      goods = goods.filter(Boolean)
      // console.log(goods)
      let { address, telNumber, userName } = this.data.gainInfo
      let data = {
        order_price: this.data.allPrice,
        consignee_addr : userName + telNumber + address,
        goods
      }
      // 创建订单的请求
      request({
        url: '/my/orders/create',
        method : 'post',
        data,
        header : {
          Authorization : token
        }
      }).then(res => {
        // console.log(res)
        const { order_number } = res.data.message
        // 获取支付参数的请求
        request({
          url: '/my/orders/req_unifiedorder',
          method : 'post',
          data: { order_number },
          header: {
            Authorization: token
          }
        }).then(res=>{
          // console.log(res)
          const { pay } = res.data.message
          // 发起微信支付
          wx.requestPayment(pay)
          let arr = this.data.storageGoods.filter(v=>{
            return !v.goods_status
          })
          // console.log(arr)
          wx.setStorageSync('goodsInfoArr', arr)
        })
      })
    }else {
      // 如果没有token值，需要跳转到授权页进行授权
      wx.navigateTo({
        url : '/pages/authoriza/index'
      })
    }
  }
})
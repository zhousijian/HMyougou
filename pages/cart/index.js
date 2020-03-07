// pages/cart/index.js
Page({

  data: {
    // 收货信息
    gainInfo: {},
    // 本地加入购物车的商品
    storageGoods: [],
    // 总价格
    allPrice: 0,
    // 全选勾勾的状态
    allStatus : true
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
    // console.log(wx.getStorageSync('goodsInfoArr'))
    this.setData({
      storageGoods: wx.getStorageSync('goodsInfoArr')
    })
    // 判断是否全选了
    this.allStatusFn()
    // 计算总价格
    this.computedAllPrice()
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
  },
  // 添加或删减购物车商品的数量
  handleAlterAmount(e){
    const { index,amount } = e.currentTarget.dataset
    // console.log(index)
    let arr = wx.getStorageSync('goodsInfoArr')
    arr[index].goods_number += amount
    arr.forEach((v,i)=>{
      if (v.goods_number == 0) {
        wx.showModal({
          title: '提示',
          content: '您确定需要删除该商品吗？',
          success :(res)=> {
            if (res.confirm) {
              arr.splice(i, 1)
            } else if (res.cancel) {
              v.goods_number = 1
            }
            this.setData({
              storageGoods: arr
            })
            wx.setStorageSync('goodsInfoArr', arr)
            this.computedAllPrice()
          }
        })
      }else {
        this.setData({
          storageGoods: arr
        })
        wx.setStorageSync('goodsInfoArr', arr)
        this.computedAllPrice()
      }
    })
  },
  // 输入框失去焦点
  handleBlur(e){
    // console.log(e)
    const { index } = e.currentTarget.dataset
    let { value } = e.detail
    value = Math.floor(Number(value))
    if (typeof value == "number" && value > 1){
      this.data.storageGoods[index].goods_number = value
    }else {
      this.data.storageGoods[index].goods_number = 1
    }
    this.setData({
      storageGoods: this.data.storageGoods
    })
    wx.setStorageSync('goodsInfoArr', this.data.storageGoods)
    this.computedAllPrice()

  },
  // 点击单选的按钮
  handleStatus(e){
    // console.log(e)
    const { index } = e.currentTarget.dataset
    console.log(index)
    this.data.storageGoods[index].goods_status = !this.data.storageGoods[index].goods_status
    this.setData({
      storageGoods: this.data.storageGoods
    })
    wx.setStorageSync('goodsInfoArr', this.data.storageGoods)
    // 判断是否全选了
    this.allStatusFn()
    this.computedAllPrice()
  },
  // 点击全选的按钮
  handleAllSelect(){
    let allStatus = !this.data.allStatus
    this.setData({
      allStatus
    })
    this.data.storageGoods.forEach(v=>{
      v.goods_status = allStatus
    })
    this.setData({
      storageGoods: this.data.storageGoods
    })
    wx.setStorageSync('goodsInfoArr', this.data.storageGoods)
    this.computedAllPrice()
  },
  // 计算总价格封装函数
  computedAllPrice() {
    let price = 0
    if (!this.data.storageGoods) return;
    this.data.storageGoods.forEach(v => {
      if(v.goods_status){
        price += v.goods_price * v.goods_number
      }
    })
    this.setData({
      allPrice : price
    })
  },
  // 判断全选的状态
  allStatusFn(){
    let allStatus = this.data.storageGoods.some(v=>{
      return !v.goods_status
    })
    this.setData({
      allStatus : !allStatus
    })
  }
})
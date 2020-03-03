// pages/search/index.js
import request from '../../utils/request.js'
Page({

  data: {
    // 输入框的值
    value: '',
    // 输入框最后输入的值
    finallyValue: '',
    // 搜索请求返回的数据
    searchData: [],
    // 是否正在请求
    load: false,
    // 搜索历史的本地数据
    historys: []
  },
  onLoad: function(options) {
    this.setData({
      historys: wx.getStorageSync('history')
    })
  },
  // input事件
  handleInput(e) {
    // console.log(e)
    // 获取输入框的值
    let {
      value
    } = e.detail
    this.setData({
      value
    })
    if (!this.data.value) {
      this.setData({
        searchData: []
      })
      return
    };
    // 搜索请求
    this.getData()
  },
  // 点击取消触发的事件
  handleCancel() {
    this.setData({
      value: '',
      searchData: []
    })
  },
  // 点击回车键事件
  handleEnter() {
    // console.log(111)
    // console.log(this.data.value)
    // 先从本地查看数据情况
    let arr = wx.getStorageSync('history')
    if (!Array.isArray(arr)) {
      arr = []
    }
    arr.unshift(this.data.value)
    // 数组去重
    arr = [...new Set(arr)]
    // 跳转前把搜索框的值保存本地
    wx.setStorageSync('history', arr)
    wx.redirectTo({
      url: '/pages/goods_list/index?keyword=' + this.data.value
    })
  },
  // 搜索请求的封装
  getData() {
    // 判断是否正在请求
    if (this.data.load) return;
    this.setData({
      // 如果可以进来，说明不是请求中，把状态改为true
      load: true,
      // 保存当前搜索的值
      finallyValue: this.data.value
    })
    request({
      url: '/goods/qsearch',
      data: {
        query: this.data.value
      }
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      this.setData({
        searchData: message,
        // 请求完毕把状态改为false
        load: false
      })
      // console.log(this.data.value)
      // console.log(this.data.finallyValue)
      if (this.data.value != this.data.finallyValue && this.data.value) {
        this.getData()
      }
    })
  }
})
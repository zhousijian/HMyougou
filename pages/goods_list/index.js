// pages/goods_list/index.js
import request from '../../utils/request.js'
Page({

  data: {
    // 搜索返回的数据
    allData: {},
    // 关键字
    keyword : '',
    // 页码
    pagenum: 1
  },
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      keyword: options.keyword
    })
    request({
      url: '/goods/search',
      data: {
        query: this.data.keyword,
        pagesize : 10,
        pagenum: this.data.pagenum
      }
    }).then(res => {
      // console.log(res)
      const { message } = res.data
      this.setData({
        allData: message
      })
    })
  }
})
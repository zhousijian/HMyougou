// pages/goods_list/index.js
import request from '../../utils/request.js'
Page({

  data: {
    // 搜索返回数据里的goods的数组
    allGoods: [],
    // 关键字
    keyword: '',
    // 页码
    pagenum: 1,
    // 是否还有分页数据
    isShow: true,
    // 是否加载中
    load: true
  },
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      keyword: options.keyword
    })
    // 商品搜索的请求
    this.getData()
  },
  // 监听用户上拉触底事件
  onReachBottom() {
    // console.log(111)
    // 是否加载状态
    if (this.data.load) return

      ++this.data.pagenum
      this.setData({
        load: true
      })
      this.getData()
  },
  // 封装商品关键字搜索的请求
  getData() {
    // 是否还有分页数据
    if (!this.data.isShow) return
  // setTimeout(() => {
    request({
      url: '/goods/search',
      data: {
        query: this.data.keyword,
        pagesize: 10,
        pagenum: this.data.pagenum
      }
    }).then(res => {
      // console.log(res)
      const {
        goods
      } = res.data.message
      const {
        total
      } = res.data.message
      this.setData({
        allGoods: [...this.data.allGoods, ...goods],
        load: false
      })
      if (this.data.allGoods.length >= total) {
        this.setData({
          isShow: false
        })
      }
    })
    // }, 5000)

  }
})
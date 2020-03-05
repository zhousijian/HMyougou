// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({

  data: {
    // 商品详情信息
    goodsDetailInfo: {},
    // 轮播图的图片地址数组
    images: [],
    // tab栏的索引
    current : 0
  },
  onLoad: function (options) {
    request({
      url: '/goods/detail',
      data: { goods_id: options.id }
    }).then(res => {
      // console.log(res)
      let { message } = res.data
      let images = message.pics.map(v => {
        return v.pics_big
      })
      this.setData({
        goodsDetailInfo: message,
        images
      })
    })
  },
  // 点击图片预览
  handleClickImage(e) {
    const { index } = e.currentTarget.dataset
    // console.log(index)
    wx.previewImage({
      current: this.data.images[index], // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  // 点击切换tab栏对应信息
  handleTab(e) {
    // console.log(e)
    const { index } = e.currentTarget.dataset
    this.setData({
      current : index
    })
  }
})
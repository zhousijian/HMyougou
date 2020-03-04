// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({

  data: {
    // 商品详情信息
    goodsDetailInfo : {}
  },
  onLoad: function (options) {
    request({
      url: '/goods/detail',
      data: { goods_id : options.id}
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        goodsDetailInfo : message
      })
    })
  }
})
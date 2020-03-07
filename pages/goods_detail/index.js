// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({

  data: {
    // 商品详情信息
    goodsDetailInfo: {},
    // 轮播图的图片地址数组
    images: [],
    // tab栏的索引
    current: 0
  },
  onLoad: function(options) {
    request({
      url: '/goods/detail',
      data: {
        goods_id: options.id
      }
    }).then(res => {
      // console.log(res)
      let {
        message
      } = res.data
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
    const {
      index
    } = e.currentTarget.dataset
    // console.log(index)
    wx.previewImage({
      current: this.data.images[index], // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  // 点击切换tab栏对应信息
  handleTab(e) {
    // console.log(e)
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      current: index
    })
  },
  // 点击加入购物车把商品信息保存到本地
  handleAddCart() {
    // console.log(this.data.goodsDetailInfo)
    // 定义保存商品信息
    let goodsInfo = {};
    goodsInfo.goods_id = this.data.goodsDetailInfo.goods_id;
    goodsInfo.goods_name = this.data.goodsDetailInfo.goods_name;
    goodsInfo.goods_price = this.data.goodsDetailInfo.goods_price;
    goodsInfo.goods_big_logo = this.data.goodsDetailInfo.goods_big_logo;
    goodsInfo.goods_number = 1;
    goodsInfo.goods_status = true;
    // console.log(goodsInfo);
    // 查询本地是否有加入过该商品
    let arr = wx.getStorageSync('goodsInfoArr')
    if (!Array.isArray(arr)) {
      arr = []
    }
    let result = arr.some(v => {
      return v.goods_id == goodsInfo.goods_id
    })
    if(result){
      arr.forEach(v=>{
        if (v.goods_id == goodsInfo.goods_id){
          ++v.goods_number
          wx.showToast({
            title: '该商品数量+1',
            icon: 'success'
          })
        }
      })
    }else {
      wx.showToast({
        title: '已添加购物车',
        icon: 'success'
      })
      arr.unshift(goodsInfo)
    }
    wx.setStorageSync('goodsInfoArr', arr)
    // console.log(result)
  }
})
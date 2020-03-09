// pages/authoriza/index.js
import request from '../../utils/request.js'
Page({
  data: {

  },
  onLoad: function (options) {

  },
  handleGetUserInfo(e){
    // console.log(e)
    const { encryptedData, rawData, iv, signature } = e.detail
    wx.login({
      success(res) {
        // console.log(res)
        const { code } = res
        const obj = {
          encryptedData,
          rawData,
          iv,
          signature,
          code
        }
        request({
          url: '/users/wxlogin',
          method : 'post',
          data : obj
        }).then(res=>{
          // console.log(res)
          const { token } = res.data.message
          wx.setStorageSync('token',token)
          wx.navigateBack()
        })
      }
    })
  }
})
var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
  },
  //获取手机号码
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'https://www.tul.cn:8443/WxOpen/WxOpen/GetTel',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          openid: app.globalData.openid
        },
        method: "post",
        success: function (res) {
          app.globalData.tel = res.data.Tel
          console.log(res)
          //跳转到注册页面
          wx.reLaunch({
            url: '../emp/emp',
          })
        }
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请再次授权!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      })
    }
  }
})
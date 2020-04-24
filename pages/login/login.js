var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
  },
  onLoad: function () {
    // wx.reLaunch({
    //   url: '../tabbar/tabbar',
    // })
  },
  //获取手机号码
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'http://www.tul.cn/WxOpen/WxOpen/GetTel',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          openid: app.globalData.openid
        },
        method: "post",
        success: function (res) {
          console.log(res.data.Tel)
          app.globalData.tel = res.data.Tel
          //跳转到注册页面
          wx.navigateTo({
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
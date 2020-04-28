var app = getApp();
Page({
  data: {
    PageCur: 'index',
    mainShow: false
  },
  onLoad: function (options) {
    var that = this
    app.userLogin().then((res) => {
      console.log(res)
      if (!app.globalData.userInfo) {
        wx.reLaunch({
          url: '../login/login'
        })
      } else {
        that.setData({
          mainShow: true
        })
      }
    }, (error) => {
      console.log(error)
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }

})
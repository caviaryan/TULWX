const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: 1,
    picker: ['糖尿01', '糖尿02', '糖尿03'],
    region: ['广东省', '广州市', '海珠区'],
    tel: ""
  },
  onLoad: function (options) {
    var that=this
    that.setData({
      tel: app.globalData.tel
    })
  },
  RegionChange: function (e) {
    console.log(e);
    this.setData({
      region: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  submitUser: function (e) {
    console.log(e)
    wx.reLaunch({
      url: '../tabbar/tabbar',
    })
  }
})
var util = require("../../utils/util.js");
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: 0,
    sex: ['男', '女'],
    hbType_index: 1,
    hbType: [{
      id: 1,
      name: '1型糖尿病'
    }, {
      id: 2,
      name: '2型糖尿病'
    }, {
      id: 3,
      name: '其他类型糖尿病'
    }],
    region: ['广东省', '珠海市', '香洲区'],
    sbdate: '',
    bdate: '1999-01-01',
    shbyear: '',
    hbyear: '1999',
    tel: "",
    show: true,
    titleshow: true,
    FUserName: '',
    FHight: '',
    FWeight: '',
  },
  onLoad: function (options) {
    console.log(app.globalData.tel)
    var that=this
    var pages = getCurrentPages();
    var prevpage = pages[pages.length - 2];
    if (prevpage) {
      if (prevpage.route == "pages/emp/empshow") {
        that.setData({
          show: false,
          titleshow: false
        })
      }
      if (app.globalData.userInfo) {
        console.log(app.globalData)
        var str = app.globalData.userInfo.FAddress.split(",")
        var date = app.globalData.userInfo.FBDate
        that.setData({
          FUserName: app.globalData.userInfo.FUserName,
          index: app.globalData.userInfo.FSex,
          sbdate: date ? util.date_time(date) : '',
          bdate: date ? util.date_time(date) : '',
          tel: app.globalData.userInfo.FTel,
          region: [str[0], str[1], str[2]],
          FHight: app.globalData.userInfo.FHight,
          FWeight: app.globalData.userInfo.FWeight,
          hbType_index: app.globalData.userInfo.FHBType - 1,
          shbyear: app.globalData.userInfo.FHBYear,
          hbyear: app.globalData.userInfo.FHBYear
        })
      }
    }
    var that = this
    that.setData({
      tel: app.globalData.tel
    })
  },
  onShow: function (options) {
    let vm = this;
    vm.getUserLocation();
  },
  bindAdressChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  bindSexChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindHBTypeChange(e) {
    console.log(e)
    this.setData({
      hbType_index: e.detail.value
    })
  },
  bindBDateChange(e) {
    this.setData({
      sbdate: e.detail.value,
      bdate: e.detail.value
    })
  },
  bindYearChange: function (e) {
    this.setData({
      shbyear: e.detail.value,
      hbyear: e.detail.value

    })
  },
  //获取手机号
  getTel: function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    var tmpTel = ''
    if (app.globalData.userInfo) {
      that.setData({
        tel: app.globalData.userInfo.FTel
      })
    } else {
      that.setData({
        tel: app.globalData.tel
      })
    }


  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))

        wx.request({
          url: 'https://www.tul.cn:8443/WxOpen/WxOpen/GetLocation',
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          data: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(res)
            var _province = res.data.result.address_component.province
            var _city = res.data.result.address_component.city
            var _area = res.data.result.address_component.district
            vm.setData({
              region: [_province, _city, _area],
            })
          }
        })
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.FUserName.length == 0) {
      wx.showToast({
        title: '姓名不能为空!',
        icon: 'none',
        duration: 1500
      })
      return
    }

    let regNum = new RegExp('[0-9]', 'g')
    let rsNum = regNum.exec(e.detail.value.FTel)
    if (!rsNum || e.detail.value.FTel.length != 11) {
      wx.showToast({
        title: '手机号码无效!',
        icon: 'loading',
        duration: 1500
      })
      return
    }

    if (e.detail.value.FHBYear.length == 0) {
      wx.showToast({
        title: '确诊年份不能为空!',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.request({
      url: 'https://www.tul.cn:8443/WxOpen/WxOpen/EmpAdd',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        FUserName: e.detail.value.FUserName,
        FSex: e.detail.value.FSex,
        FTel: e.detail.value.FTel,
        FBDate: e.detail.value.FBDate,
        FAddress: e.detail.value.FAddress,
        FHight: e.detail.value.FHight,
        FWeight: e.detail.value.FWeight,
        FHBType: e.detail.value.FHBType,
        FHBYear: e.detail.value.FHBYear,
        FOpenId: app.globalData.openid
      },
      success: function (res) {
        if (res.data.msg == "ok") {
          wx.reLaunch({
            url: '../tabbar/tabbar'
          })
        } else {
          console.log(res)
        }
      }
    })
  }
})
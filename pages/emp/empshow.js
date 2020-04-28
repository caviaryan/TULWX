var app=getApp()
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FUserName: '',
    FSex: '',
    FBDate: '',
    FTel: '',
    FAddress: '',
    FHight: '',
    FWeight: '',
    FHBType: '',
    FHBYear: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(app.globalData.userInfo)
    if(app.globalData.userInfo)
    {
      let HBType=''
      if(app.globalData.userInfo.FHBType==1)
      {
        HBType='1型糖尿病'
      }
      else if(app.globalData.userInfo.FHBType==2)
      {
        HBType='2型糖尿病'
      }
      else
      {
        HBType='其他类型糖尿病'
      }
      
      that.setData({
        FUserName: app.globalData.userInfo.FUserName,
        FSex: app.globalData.userInfo.FSex==0?'男':'女',
        FBDate: app.globalData.userInfo.FBDate?util.date_time(app.globalData.userInfo.FBDate):'',
        FTel: app.globalData.userInfo.FTel,
        FAddress: app.globalData.userInfo.FAddress,
        FHight: app.globalData.userInfo.FHight,
        FWeight: app.globalData.userInfo.FWeight,
        FHBType: HBType,
        FHBYear: app.globalData.userInfo.FHBYear
      })
    }

  },

  toEdit:function(res)
  {
    wx.navigateTo({
      url: '../emp/emp',
    })
  }
})
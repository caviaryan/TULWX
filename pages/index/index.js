var app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,  

    PageCur: 'index',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    swiperList: [{
      id: 0,
      type: 'image',
      url: '/image/swiper/Fir_Banner.jpg',
    }, {
      id: 1,
      type: 'image',
      url: '/image/swiper/Sec_Banner.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '/image/swiper/Trd_Banner.jpg',
    }],
    DotStyle: true,

    iconList: [{
      icon: 'friendfamous',
      color: 'red',
      badge: 0,
      name: '贴身专家'
    }, {
      icon: 'friendfavor',
      color: 'orange',
      badge: 0,
      name: '贴身专员'
    }, {
      icon: 'location',
      color: 'yellow',
      badge: 0,
      name: '药店地图'
    }],
    gridCol: 3,
    gridBorder: true,
    Tabs: [{
        name: '血糖'
      }, {
        name: '血压'
      },
      {
        name: '尿酸'
      }
    ],
    Tabs_Menu: [{
        icon: 'tag',
        value: '7.8 mmol/l',
        date: '2020-04-24 18:00',
        time: '晚餐前'
      }, {
        icon: 'tag',
        value: '9.2 mmol/l',
        date: '2020-04-24 12:00',
        time: '中餐前'
      },
      {
        icon: 'tag',
        value: '3.0 mmol/l',
        date: '2020-04-24 07:00',
        time: '早餐前'
      }],
    TabCur: 0,
    scrollLeft: 0,
    userInfo: {},
  },
  tabSelect(e) {
    console.log(e)

    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    if (e.currentTarget.dataset.id == 1) {
      this.setData({

        Tabs_Menu: [{
          icon: 'tag',
          value: '7.8 mmol/l',
          date: '2020-04-24 18:00',
          time: '晚餐前'
        }]

      })
    } else if (e.currentTarget.dataset.id == 2) {
      this.setData({

        Tabs_Menu: [{
          icon: 'tag',
          value: '7.8 mmol/l',
          date: '2020-04-24 18:00',
          time: '晚餐前'
        }, {
          icon: 'tag',
          value: '9.2 mmol/l',
          date: '2020-04-24 12:00',
          time: '中餐前'
        }]
      })

    } else {
      this.setData({
        Tabs_Menu: [{
            icon: 'tag',
            value: '7.8 mmol/l',
            date: '2020-04-24 18:00',
            time: '晚餐前'
          },
          {
            icon: 'tag',
            value: '9.2 mmol/l',
            date: '2020-04-24 12:00',
            time: '中餐前'
          },
          {
            icon: 'tag',
            value: '3.0 mmol/l',
            date: '2020-04-24 07:00',
            time: '早餐前'
          }]
      })
    }
  }
})

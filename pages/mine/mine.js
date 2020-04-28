Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    Count1: 0,
    Count2: 0,
    Count3: 0,
    avatar: "/image/avatar.jpg",
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  attached() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })

    that.setData({
      Count1: 200,
      Count2: 20,
      Count3: 10
    })

    /* let i = 0;
     numDH();
     function numDH() {
       if (i < 10) {
         setTimeout(function () {
           that.setData({
             Count1: i,
             Count2: i,
             Count3: i
           })
           i++
           numDH();
         }, 1)
       } else {
         that.setData({
           Count1: 200,
           Count2: 20,
           Count3: 10
         })
       }
     }*/
    wx.hideLoading()
  }
})
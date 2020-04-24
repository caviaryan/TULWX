Page({
  data: {
    PageCur: 'index'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }

})
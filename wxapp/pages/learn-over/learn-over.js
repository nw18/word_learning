//index.js
//获取应用实例

Page({
  data: {
    ListID:0,
  },
  //事件处理函数
  listenAgain: function () {
    var that = this;
    wx.navigateTo({
      url: '../listen-read-mode/listen-read-mode?ListID=' + that.data.ListID,
    })
  },
  testAgain: function () {
    var that = this;
    wx.redirectTo({
      url: '../self-evaluation/self-evaluation?ListID=' + that.data.ListID,
    })
  },
  practise: function () {
    var that = this;
    wx.redirectTo({
      url: '../questions-practice/questions-practice?ListID=' + that.data.ListID,
    })
  },
  onLoad: function (e) {
    console.log(e.ListID);
    this.setData({
      ListID: e.ListID,
    })
  }
})

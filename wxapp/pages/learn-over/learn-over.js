//index.js
//获取应用实例

Page({
  data: {
    lid: 12345,//外部传入的
    mode: 0,//外部传入的
    query: "",//外部传入的
    index: 0,//外部传入的
  },
  //事件处理函数
  listenAgain: function () {
    var that = this;
    wx.navigateTo({
      url: '../listen-read-mode/listen-read-mode?lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query + '&index=' + that.data.index,
    })
  },
  testAgain: function () {
    var that = this;
    wx.redirectTo({
      url: '../self-evaluation/self-evaluation?lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query + '&index=' + that.data.index,
    })
  },
  practise: function () {
    var that = this;
    wx.redirectTo({
      url: '../questions-practice/questions-practice?lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query + '&index=' + that.data.index,
    })
  },
  onLoad: function (e) {
    console.log(e.lid);
    this.setData({
      lid: e.lid,
      // mode: e.mode,
      mode: 2,
      query: e.query,
      index: e.index,
    })
  }
})

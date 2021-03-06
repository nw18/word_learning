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
    wx.redirectTo({
      url: '../listen-read-mode/listen-read-mode?lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query + '&index=0'// + that.data.index,
    })
  },
  testAgain: function () {
    var that = this;
    wx.redirectTo({
      url: '../self-evaluation/self-evaluation?lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query + '&index=0'// + that.data.index,
    })
  },
  practise: function () {
    var that = this;
    wx.redirectTo({
      url: '../questions-practice/questions-practice?lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query + '&index=0'// + that.data.index,
    })
  },
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("__list_name__") + ' 学习完成',
    });
    console.log(e.lid);
    this.setData({
      lid: e.lid,
      mode: e.mode,
      query: e.query,
      index: e.index,
    })
  }
})

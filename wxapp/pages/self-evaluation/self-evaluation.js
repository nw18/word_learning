//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    progressNum:0,
    progressAll:20,
    progressPercent:0,
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击了会
  bindTrueBtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    that.setData({
      progressNum: that.data.progressNum+1,
      progressPercent: (that.data.progressNum+1) / that.data.progressAll *100,
    })

  },
  //点击了不会
  bindFalseBtnTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})


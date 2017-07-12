//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '<p style="font-size:40px;color:red">测试HTML</p>',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../learn_over/learn_over'
    })
  },
  bindJumpTap: function(e) {
    wx.navigateTo({
      url: '../' + e.target.id + "/" + e.target.id,
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

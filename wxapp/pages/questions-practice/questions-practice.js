//questions-praction.js
//获取应用实例
var app = getApp()
Page({
  data: {
    progressNum:0,
    progressAll:20,
    progressPercent:0,
    answer:"0",
    answerArray:["A","B","C","D"],
    index:0,
    // trueColor:blur,
    // flaseColor:red,

    content:"could you go shopping wigo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrth me tomorrow？\n______ my father and i will go wuhan tomorrow",
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击了A
  bindABtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    that.setData({
      progressNum: that.data.progressNum+1,
      progressPercent: (that.data.progressNum+1) / that.data.progressAll *100,
    })

  },
  //点击了B
  bindBBtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    that.setData({
      progressNum: that.data.progressNum + 1,
      progressPercent: (that.data.progressNum + 1) / that.data.progressAll * 100,
    })

  },
  //点击了C
  bindCBtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    that.setData({
      progressNum: that.data.progressNum + 1,
      progressPercent: (that.data.progressNum + 1) / that.data.progressAll * 100,
    })

  },
  //点击了D
  bindDBtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    that.setData({
      progressNum: that.data.progressNum + 1,
      progressPercent: (that.data.progressNum + 1) / that.data.progressAll * 100,
    })

  },

  //点击了下一题
  bindNextBtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    // that.setData({
    //   progressNum: that.data.progressNum + 1,
    //   progressPercent: (that.data.progressNum + 1) / that.data.progressAll * 100,
    // })

    that.setData({
      answer: that.data.answerArray[that.data.index],
      // index: (that.data.index + 1) % 4,
      index: formatNumber(that.data.index),
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

function formatNumber(n) {
  n++;
  if(n==4){
    n=0;
  }
  return n;
}
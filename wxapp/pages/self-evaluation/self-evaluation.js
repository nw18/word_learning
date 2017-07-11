//self-evaluation.js
//获取应用实例
//http://openapi.yqj.cn/MockAPI/WordLearning/GetWordList
var app = getApp()
Page({
  data: {
    wordInfoList:[],
    index: 0,
    wordInfo:{},

    progressItem: {
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },


    motto: 'Hello World',
    picture: 'http://img.zcool.cn/job/groups/b445558d077800000141f02f67a5.jpg',
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

    var that = this
    var perNum = that.data.progressItem.progressNum;
    perNum++
    if (perNum > that.data.progressItem.progressAll) {

      wx.navigateTo({
        url: '../learn-over/learn-over'
      })
      return;
    }

    that.data.index++;
    that.setData({
      wordInfo: that.data.wordInfoList[that.data.index],
    })

    console.log(perNum);
    that.data.progressItem.progressNum = perNum;
    that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 100;
    that.setData({
      progressItem: that.data.progressItem,
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
    this.loadWordInfoList();
  },

  loadWordInfoList:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetWordList',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading({});
        var list = res.data.Data;
        that.setData({
          wordInfoList: list,
          wordInfo: list[that.data.index],
        })
        var perNum = that.data.index + 1;
        that.data.progressItem.progressNum = perNum;
        that.data.progressItem.progressAll = list.length;
        that.data.progressItem.progressPercent = perNum / list.length * 100;
        that.setData({
          progressItem: that.data.progressItem,
        })
      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })

  }
  
})


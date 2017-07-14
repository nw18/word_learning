//self-evaluation.js
//获取应用实例
//http://openapi.yqj.cn/MockAPI/WordLearning/GetWordList

var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");

var app = getApp()
Page({
  data: {
    ListID:12345,//外部传入的
    wordInfoList:[],
    index: 0,
    wordInfo:{},

    progressItem: {
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },

    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

    picture: '../../img/laba.gif',
    userInfo: {}
  },

  //事件处理函数
  bindImageViewTap: function () {

  },
  //点击了会
  bindTrueBtnTap: function () {
    // console.log("点击了会");
    var that = this
    knowBtnTap(this);
  },
  //点击了不会
  bindFalseBtnTap: function () {

    wx.navigateTo({
      // url: '../listen-read-mode/listen-read-mode'
      url: '../self-evaluation-test/self-evaluation-test'
      
    })
  },
  
  funended: function () {
    that.setData({
      picture: '../../img/laba.png',
    })
    console.log("audio end");
  },
  testNotificationFn:function (e){

    console.log("接受通知");
    console.log(e);
  },
  ////////////////////////////////////////////////
  onLoad: function (e) {
    console.log('onLoad')
    this.loadWordInfoList();

    //注册通知
    // var that = this
    // WxNotificationCenter.addNotification("testNotificationName", that.testNotificationFn, that)

    this.setData({
      ListID: e.ListID,
    })

    wx.onBackgroundAudioStop(function () {
      that.setData({
        picture: '../../img/laba.png',
      });
      console.log('onBackgroundAudioStop')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var that = this
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: that.data.src,

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var rightInterval = setInterval(function () {

      console.log("这是一个三秒的定时器");
    }, 3000);
    that.rightInterval = rightInterval;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    console.log("1111在此停止页面");
    clearInterval(this.rightInterval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("2222在此停止定时器页面");
    clearInterval(this.rightInterval);

    // 移除通知在本也完成
    // WxNotificationCenter.removeNotification("testTabNotificationName", this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadWordInfoList:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask:true,
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetWordList',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading({});
        var list = res.data.Data;
     
        var perNum = that.data.index + 1;
        that.data.progressItem.progressNum = perNum;
        that.data.progressItem.progressAll = list.length;
        that.data.progressItem.progressPercent = perNum / list.length * 580;

        that.setData({
          wordInfoList: list,
          wordInfo: list[that.data.index],
          progressItem: that.data.progressItem,
        });

      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })

  }
})

function knowBtnTap(e){

  console.log("点击了会");
  console.log(e);
  var that = e;
  var perNum = that.data.progressItem.progressNum;
  perNum++
  if (perNum > that.data.progressItem.progressAll) {

    wx.redirectTo({
      url: '../learn-over/learn-over?ListID=' + that.data.ListID,
    })
    return;
  }

  that.data.index++;

  console.log(perNum);
  that.data.progressItem.progressNum = perNum;
  that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 580;
  that.setData({
    wordInfo: that.data.wordInfoList[that.data.index],
    progressItem: that.data.progressItem,
  })
}

//跳转到下一个单词--共外部使用
function externNextBtnTap () {
  console.log("本页要跳转下一页啦  ");
  var pages = getCurrentPages();
  var currPage = pages[pages.length - 2];   //当前页面
  knowBtnTap(currPage);
}

module.exports = {

  externNextBtnTap: externNextBtnTap,
}
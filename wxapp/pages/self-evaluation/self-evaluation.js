//self-evaluation.js
//获取应用实例
//http://openapi.yqj.cn/MockAPI/WordLearning/GetWordList

var util = require('../../utils/util.js');
var app = getApp();
Page({
  isKnow:false,
  data: {
    lid:12345,//外部传入的
    mode: 0,//外部传入的
    query: "",//外部传入的
    index: 0,//外部传入的

    wordInfoList:[],
    wordInfo:{},

    progressItem: {
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },

    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

    picture: '../../img/voice-big.gif',
    userInfo: {}
  },

  //事件处理函数
  bindImageViewTap: function () {
    var that = this
   
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: that.data.src,
    })
  },
  //点击了会
  bindTrueBtnTap: function () {
    // console.log("点击了会");
    var that = this
    knowBtnTap(this);
  },
  //点击了不会
  bindFalseBtnTap: function () {
    var that = this
    wx.navigateTo({
      url: '../listen-read-mode/listen-read-mode?mode=3&lid=' + that.data.lid + '&index=' + that.data.index
    })
  },
  ////////////////////////////////////////////////
  onLoad: function (e) {
    console.log(e)
    this.data.lid = e.lid;
    this.loadWordInfoList();
    this.setData({
      lid: e.lid,
      mode: e.mode,
      query: e.query,
      index: e.index,
    })

    wx.onBackgroundAudioStop(function () {
      that.setData({
        picture: '../../img/voice-big.png',
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
    console.log("--------onShow")
    if (this.isKnow==true){
      this.isKnow =false;

      var that = this
      setTimeout(function () {
        knowBtnTap(that);
      }, 400);
    
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    // console.log("1111在此停止页面");
    // clearInterval(this.rightInterval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("2222在此停止定时器页面");
    // clearInterval(this.rightInterval);
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
      title: '加载中...',
      mask: true,
    })
    var reqStr = "GetWordList";
    if (that.data.mode == 3){
      reqStr = "GetCollectionList";
    }

    util.myrequest(reqStr, {
      ListID: that.data.lid,
      IsLoadExtra: true,
      StartChar: that.data.query,
      UserID: app.getUserID(),
    }, function (data) {
      if (list.length < 1) {
        wx.navigateBack({})
      }

      var perNum = that.data.index;
      perNum++;
      that.data.progressItem.progressNum = perNum;
      that.data.progressItem.progressAll = list.length;
      that.data.progressItem.progressPercent = perNum / list.length * 580;

      that.setData({
        wordInfoList: list,
        wordInfo: list[that.data.index],
        progressItem: that.data.progressItem,
      });
    }, function (err) {
      wx.showToast(err);
    })
  }
})

function knowBtnTap(e){
  var that = e;
  var perNum = that.data.progressItem.progressNum;
  perNum++
  if (perNum > that.data.progressItem.progressAll) {

    wx.redirectTo({
      url: '../learn-over/learn-over?index=0&lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query,
    })
    return;
  }
  that.data.index++;
  console.log("UUUUUUUUUUU"+perNum);
  that.data.progressItem.progressNum = perNum;
  that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 580;
  that.setData({
    wordInfo: that.data.wordInfoList[that.data.index],
    progressItem: that.data.progressItem,
  })
}

//跳转到下一个单词--共外部使用
function externNextBtnTap () {
  var pages = getCurrentPages();
  for (var i in pages){
    if (pages[i].route == "pages/self-evaluation/self-evaluation"){
      pages[i].isKnow = true;
    }
  }
}

module.exports = {

  externNextBtnTap: externNextBtnTap,
}
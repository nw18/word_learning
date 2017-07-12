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

    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

    picture: 'http://img.zcool.cn/job/groups/b445558d077800000141f02f67a5.jpg',
    userInfo: {}
  },

  //事件处理函数
  bindImageViewTap: function () {
      this.audioCtx.play()
  },
  //点击了会
  bindTrueBtnTap: function () {

    var that = this
    var perNum = that.data.progressItem.progressNum;
    perNum++
    if (perNum > that.data.progressItem.progressAll) {

      wx.redirectTo({
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
      url: '../listen-read-mode/listen-read-mode'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    this.loadWordInfoList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    // 自动播放
    this.audioCtx.play()
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
        that.data.progressItem.progressPercent = perNum / list.length * 100;

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

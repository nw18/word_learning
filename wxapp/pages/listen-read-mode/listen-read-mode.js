// pages/listen_read_mode/listen_read_mode.js
var test = require('../self-evaluation/self-evaluation.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mode:0,
      ListID: 12345,//外部传入的
      wordInfoList: [],
      index: 0,
      wordInfo: {},
      time:0,
      progressItem: {
        progressNum: 0,
        progressAll: 0,
        progressPercent: 0,
      },

      ExtraList:{
        liju: "Place \nyour hands on your shoulders and move your elbows up, back, and down, in a circular motion\n手置于肩上，肘部向上、向后、向下做圆圈运动。\nBoth sides of the river can be explored on this circular walk\n沿着这条环行线路走一圈，河的两边都可以看到。",
        shipin: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

      picture: 'http://img.zcool.cn/job/groups/b445558d077800000141f02f67a5.jpg',
      userInfo: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad'),
    this.setData({
      mode: options.mode,
    })
    console.log('mode' + options.mode);
    if (options.mode==1){
      // 1背单词列表页
      this.reciteWordList(options);
    } else if (options.mode==2){
      // 2背单词首字符的方式
      this.reciteWordList(options);
    } else if (options.mode == 3) {
      // 3自考之后点击了不会查看
      this.reciteWordList(options);
    } else if (options.mode == 4) {
      // 4从收藏进入
      this.collectionWorldList(options);
    } else if (options.mode == 5) {
      // 5 从收藏的某个单词进入
      this.collectionWorldList(options);
    }
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  jumpControl : {
    preTime: 5,
    perNum : 0,
    tickHandler:-1,
    switchhandler:-1,
    setupTick: function(that) {
      this.preTime = 5;
      this.perNum = that.data.progressItem.progressNum;
      this.perNum++;
      var jumpControl = this;
      this.tickHandler = setInterval(function(){
        jumpControl.tickCount(that);
      },1000);
    },
    
    tickCount: function (that) {
      console.log("tick count:" + this.preTime);
      // 每5秒切换一次单词
      if (this.preTime <= 0) {
        //切换单词增加200ms停顿
        this.clearAllPending();
        var jumpControl = this;
        this.switchhandler = setTimeout(function () {
          jumpControl.switchQuestion(that);
        }, 200,that);
      }
      // 更新时间
      that.setData({
        time: this.preTime--
      })
    },

    switchQuestion: function (that) {
      this.perNum++;
      this.preTime = 5
      that.data.index++;
      // 换单词
      that.setData({
        wordInfo: that.data.wordInfoList[that.data.index],
      });
      console.log(this.perNum);
      that.data.progressItem.progressNum = this.perNum;
      that.data.progressItem.progressPercent = this.perNum / that.data.progressItem.progressAll * 580;
      that.setData({
        progressItem: that.data.progressItem,
      });
      if (this.perNum >= that.data.progressItem.progressAll) {
        wx.redirectTo({
          url: '../learn-over/learn-over'
        })
      } else {
        //继续开始倒计时
        var jumpControl = this;
        this.tickHandler = setInterval(function () {
          jumpControl.tickCount(that);
        }, 1000);
      }
      this.switchHandler = -1;
    },
    clearAllPending: function() {
      if(this.tickHandler != -1) {
        clearInterval(this.tickHandler);
        this.tickHandler = -1;
      }
      if(this.switchHandler != -1) {
        clearTimeout(this.switchHandler);
        this.switchHandler = -1;
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.jumpControl.setupTick(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.jumpControl.clearAllPending();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.jumpControl.clearAllPending();
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

  reciteWordList: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetWordList',

      data: {
        ListID: options.lid,
        IsLoadExtra:options.IsLoadExtra,
        StartChar: options.StartChar,
        UserID: app.getUserID(),
      },

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
          cixing: list[that.data.index].WordDetail.ExplainList,
         
        });

      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })

  },
  collectionWorldList: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetCollectionList',

      data: {
        UserID: app.getUserID(),
        BookID: app.getBookID(),
       
      },

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
          cixing: list[that.data.index].WordDetail.ExplainList,

        });

      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })

  },

  nextClick: function () {
    test.externNextBtnTap();
    wx.navigateBack();
  }
})
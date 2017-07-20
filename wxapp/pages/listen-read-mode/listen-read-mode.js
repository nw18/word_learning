// pages/listen_read_mode/listen_read_mode.js
var test = require('../self-evaluation/self-evaluation.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 0,
    lid: 12345,//外部传入的
    wordInfoList: [],
    index: 0,
    wordInfo: {},
    time: 5,
    hasTick:false,
    isCollected:false,
    progressItem: {
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },


    ExtraList: {
      liju: "Place \nyour hands on your shoulders and move your elbows up, back, and down, in a circular motion\n手置于肩上，肘部向上、向后、向下做圆圈运动。\nBoth sides of the river can be explored on this circular walk\n沿着这条环行线路走一圈，河的两边都可以看到。",
      shipin: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    },

    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

    picture: 'http://img.zcool.cn/job/groups/b445558d077800000141f02f67a5.jpg',
    collectionPic:'../../img / icon - collect - off.png',
    userInfo: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad options:' + JSON.stringify(options));
    var mode = parseInt(options.mode);
    this.setData({
      mode: mode,
      hasTick: mode != 3 && mode != 5
    })
    if (mode == 1) {
      // 1背单词列表页
      this.reciteWordList(options);
    } else if (mode == 2) {
      // 2背单词首字符的方式
      this.reciteWordList(options);
    } else if (mode == 3) {
      // 3自考之后点击了不会查看
      this.reciteWordList(options);
    } else if (mode == 4) {
      // 4从收藏进入
      this.collectionWorldList(options);
    } else if (mode == 5) {
      // 5 从收藏的某个单词进入
      this.collectionWorldList(options);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  jumpControl: {
    preTime: 5,
    perNum: 0,
    tickHandler: -1,
    switchhandler: -1,
    setupTick: function (that) {
      this.preTime = 5;
      this.perNum = that.data.progressItem.progressNum;
      this.perNum++;
      if (that.data.hasTick) {
        var jumpControl = this;
        this.tickHandler = setInterval(function () {
          jumpControl.tickCount(that);
        }, 1000);
      }
    },

    tickCount: function (that) {
      console.log("tick count:" + this.preTime);
      // 每5秒切换一次单词
      if (this.preTime <= 1) {
        //切换单词增加200ms停顿
        this.clearAllPending();
        var jumpControl = this;
        this.switchhandler = setTimeout(function () {
          jumpControl.gotoNextQues(that);
        }, 200, that);
      }
      that.setData({
        time: --this.preTime
      })
    },

    switchQuestion: function (that) {
      this.perNum++;
      this.preTime = 5
      that.data.index++;
      // 换单词
      that.setData({
        time: this.preTime,
        wordInfo: that.data.wordInfoList[that.data.index],
        isCollected: that.data.wordInfoList[that.data.index].IsCollected
      });
   
      if (that.data.wordInfoList[that.data.index].IsCollected){
        collectionPic: '../../img/icon-collect-off.png';
      }else{
        collectionPic: '../../img/icon-collect-off.png';
      }
      console.log(this.perNum);
      that.data.progressItem.progressNum = this.perNum;
      that.data.progressItem.progressPercent = this.perNum / that.data.progressItem.progressAll * 580;
      that.setData({
        progressItem: that.data.progressItem,
      });

      this.switchHandler = -1;
    },
    clearAllPending: function () {
      if (this.tickHandler != -1) {
        clearInterval(this.tickHandler);
        this.tickHandler = -1;
      }
      if (this.switchHandler != -1) {
        clearTimeout(this.switchHandler);
        this.switchHandler = -1;
      }
    },
    gotoNextQues: function (that) {
      //判断是否可以跳到下一题
      if (that.data.mode == 3
        || this.perNum >= that.data.progressItem.progressAll) {
        this.gotoNextPage(that);
      } else {
        this.switchQuestion(that);
        //判断是否需要自动跳转
        if (that.data.hasTick) {
          var jumpControl = this;
          this.tickHandler = setInterval(function () {
            jumpControl.tickCount(that);
          }, 1000);
        }
      }
    },
    gotoNextPage: function (that) {
      switch (that.data.mode) {
        case 1://背单词列表页
        case 2://背单词首字符的方式
          wx.redirectTo({
            url: '../learn-over/learn-over?mode=' + that.data.mode + '&lid=' + that.data.lid + '&query=' + that.data.query + '&index=' + that.data.index
          })
          break;
        case 3://自测不会
          test.externNextBtnTap();
          wx.navigateBack();
          break;
        case 4://点收藏的再听一遍 //还没加参数
        case 5: //点收藏的某个单词,到最后返回收藏
          // wx.navigateBack();
          wx.redirectTo({
            url: '../lists/collect'
          })
          break;
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
        lid: options.lid,
        IsLoadExtra: true,
        StartChar: options.query,
        UserID: app.getUserID(),
        mode:options.mode,
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
    this.jumpControl.clearAllPending();
    this.jumpControl.gotoNextQues(this);
  },
  collection: function () {
    if (isCollected){
      this.rmCollection();
    }else{
      this.addCollection();
    }

  },

  rmCollection:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/RmvCollection',

      data: {
        UserID:app.getUserID(),
        BookID:app.getBookId(),
      },

      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading({});
      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })
  },
  addCollection: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/AddCollection',

      data: {
        UserID: app.getUserID(),
        WordID: wordInfo.ID,
        BookID: app.getBookId(),
      },

      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading({});
      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })
  },




})
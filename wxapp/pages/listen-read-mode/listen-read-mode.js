// pages/listen_read_mode/listen_read_mode.js
var test = require('../self-evaluation/self-evaluation.js')
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 0,
    lid: -1,//外部传入的
    wordInfoList: [],
    index: 0,
    jumpIndex:0,
    wordInfo: {},
    time: 5,
    hasTick:false,
    progressItem: {
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },
    ExtraList: {
      Content: "Place \nyour hands on your shoulders and move your elbows up, back, and down, in a circular motion\n手置于肩上，肘部向上、向后、向下做圆圈运动。\nBoth sides of the river can be explored on this circular walk\n沿着这条环行线路走一圈，河的两边都可以看到。",
      shipin: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    },
    //src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    picture: 'http://img.zcool.cn/job/groups/b445558d077800000141f02f67a5.jpg',
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
      query: options.query,
      hasTick: mode != 3 && mode != 5,
      Classification: options.class,
    })
    if (this.data.mode < 3) {
      app.setCurrentList(null);
    }
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
        time: this.preTime > 0 ? --this.preTime : 0
      })
    },

    switchQuestion: function (that) {
      this.perNum++;
      this.preTime = 5
      that.data.index++;
      // 换单词
      var wordInfo = that.data.wordInfoList[that.data.index];
      that.setData({
        time: this.preTime,
        wordInfo: wordInfo,
        src: wordInfo.WordDetail.VoiceURL
      });
      wx.playBackgroundAudio({
        //播放地址
        dataUrl: wordInfo.WordDetail.VoiceURL,
      });
      console.log(this.perNum);
      that.data.progressItem.progressNum = this.perNum;
      that.data.progressItem.progressPercent = this.perNum / that.data.progressItem.progressAll * 580;
      that.setData({
        progressItem: that.data.progressItem,
      });
      util.myrequest("SetWordLearned", {
        WordID: wordInfo.ID,
        UserID: app.getUserID(),
        BookID: app.getBookID(),
        TreeID: parseInt(that.data.lid)
      }, function (res) {
        if (!wordInfo.IsLearned) {
          app.setProcessChange();
        }
      });
      this.switchHandler = -1;
    },
    continueTick: function(that) {
      if (that.data.hasTick) {
        var jumpControl = this;
        this.tickHandler = setInterval(function () {
          jumpControl.tickCount(that);
        }, 1000);
      }
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
            url: '../learn-over/learn-over?mode=' + that.data.mode + '&lid=' + that.data.lid + '&query=' + that.data.query + '&index=' + that.data.jumpIndex
          })
          break;
        case 3://自测不会
          test.externNextBtnTap();
          wx.navigateBack();
          break;
        case 4://点收藏的再听一遍 //还没加参数
        case 5: //点收藏的某个单词,到最后返回收藏
          // wx.navigateBack();
          // wx.redirectTo({
          //   url: '../lists/collect'
          // })
          wx.navigateBack();
          break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.jumpControl.clearAllPending();
    wx.stopBackgroundAudio();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.jumpControl.clearAllPending();
    wx.stopBackgroundAudio();
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

  setWordList: function (list, that,index) {
    if(index == undefined) { //不传Index默认给0
      index = 0;
    }
    if(index < 0) { //对于小于零的参数查找第一个未学习的位置.
      for(var i = 0; i < list.length; i++) {
        if (!list[i].IsLearned) {
          index = i;
          break;
        }
      }
    }
    if(index >= list.length || index < 0) {
      index = 0;
      console.error("index out of range: " + index + "/" + list.length);
    }
    that.data.index = index;
    var perNum = index + 1;
    var wordInfo = list[index];
    that.data.progressItem.progressNum = perNum;
    that.data.progressItem.progressAll = list.length;
    that.data.progressItem.progressPercent = perNum / list.length * 580;
    that.setData({
      wordInfoList: list,
      wordInfo: wordInfo,
      progressItem: that.data.progressItem,
    });
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: wordInfo.WordDetail.VoiceURL,
    });
    util.myrequest("SetWordLearned",{
      WordID: wordInfo.ID,
      UserID: app.getUserID(),
      BookID: app.getBookID(),
      TreeID: parseInt(this.data.lid)
    },function(res) {
      if (!wordInfo.IsLearned){
        app.setProcessChange();
      }
    });
    this.jumpControl.setupTick(this);
  },
  reciteWordList: function (options) {
    var that = this;
    var index = options.index == "undefined" || options.index == undefined ? 0 : parseInt(options.index);
    if(app.getCurrentList() != null) {
      that.setWordList(app.getCurrentList(), that,index);
      return;
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.data.lid = options.lid;
    var callBack = function (list) {
      console.log("list:" + list)
      if (list.length == 0) {
        wx.navigateBack();
        return
      }
      that.setWordList(list, that, index);
    };
    
    util.myrequest("GetWordList", {
      ListID: options.lid,
      IsLoadExtra: true,
      StartChar: options.query == undefined || options.query == "undefined" ? "" : options.query,
      UserID: app.getUserID()
    }, callBack);
  },
  collectionWorldList: function (options) {
    var that = this;
    var index = options.index == "undefined" || options.index == undefined ? 0 : parseInt(options.index);
    if (app.getCurrentList() != null) {
      that.setWordList(app.getCurrentList(), that,index);
      return;
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    util.myrequest("GetCollectionList", {
      UserID: app.getUserID(),
      BookID: app.getBookID(),
    }, function (list) {
      that.setWordList(list, that, index);
    });
  },

  nextClick: function () {
    this.jumpControl.clearAllPending();
    this.jumpControl.gotoNextQues(this);
  },
  collection: function () {
    if (this.data.wordInfo.IsCollected){
      console.log("try remove collect");
      this.rmCollection();
    }else{
      console.log("try add collect");
      this.addCollection();
    }

  },

  rmCollection:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.jumpControl.clearAllPending();
    util.myrequest("RmvCollection", {
      UserID: app.getUserID(),
      BookID: app.getBookID(),
      WordID: this.data.wordInfo.ID
    }, function (res) {
      that.data.wordInfo.IsCollected = false;
      that.setData({
        wordInfo: that.data.wordInfo
      });
      app.setCollectChange();
      that.jumpControl.continueTick(that);
    }
    );
  },
  addCollection: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.jumpControl.clearAllPending();
    util.myrequest("AddCollection", {
      UserID: app.getUserID(),
      BookID: app.getBookID(),
      WordID: this.data.wordInfo.ID
    }, function (res) {
      that.data.wordInfo.IsCollected = true;
      that.setData({
        wordInfo: that.data.wordInfo
      });
      that.jumpControl.continueTick(that);
    }
    );
  },
  onVoicePlay : function() {
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: this.data.wordInfo.WordDetail.VoiceURL,
    });  
  }
})
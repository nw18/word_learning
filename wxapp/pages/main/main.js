// main.js
var app = getApp();
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authInfo: app.authInfo,
    showAD: false,
    bookIndex: app.findBookIndex(),
    bookList: app.getBookList(),
    learnProcess: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (this.data.bookList.length == 0) {
      wx.showLoading("加载中...");
      util.myrequest("GetBookList", {
        AuthID: app.authInfo.id
      }, function (data) {
        that.setData({
          bookList: data
        });
        app.setBookList(data);
      }, function (err) {
        wx.showToast(err);
      });
    } else {
      wx.showLoading("加载中...");
      this.loadLearnProcess();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // setTimeout(function () {
    //   that.setData({
    //     showAD: true
    //   })
    // }, 2000)
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

  //////////自定义事件放下面/////////////////////////
  onClickWordList: function (e) {
    wx.navigateTo({
      url: '../lists/lists',
    })
  },
  loadLearnProcess: function () {
    var that = this;
    util.myrequest("GetLearningProcess", {
      BookID: app.learnInfo.bookID
    }, function (data) {
      that.traceList(data,function(node){
        node.LearnedLevel = Math.floor(node.LearnedCount * 5 / node.SumWordCount) * 2;
        return false;
      });
      that.setData({
        learnProcess: data
      });
      app.setLearnProcess(data);
    }, function (err) {
      wx.showToast(err);
    })
  }
  , onBookChange: function (e) {
    this.setData({
      //bookIndex: e.detail.value
      bookIndex: e.target.dataset.index
    });
    app.updateBookIndex(e.target.dataset.index);
    wx.showLoading("加载中...");
    this.loadLearnProcess();
  },
  onClickBookInfo: function (e) {
    this.setData({
      bookIndex: -1
    })
  },
  onNavigateTo: function(e) {
    wx.navigateTo({
      url: e.target.dataset.url,
    })
  },
  traceList: function (learnProcess,callback) {
    var node_list = new Array();
    for (var i in learnProcess.WordListTree) {
      node_list.push(learnProcess.WordListTree[i]);
    }
    while (node_list.length > 0) {
      var node = node_list.shift();
      if (node.IsList) {
        if(callback(node)){
          return true;
        }
      } else {
        for (var i in node.Children) {
          node_list.push(node.Children[i]);
        }
      }
    }
    return false;
  },
  //查找下一个要学的单词,返回{lession_id,learn_index}
  onClickBegin: function () {
    var learnProcess = this.data.learnProcess;
    if (learnProcess.LearnedCount < learnProcess.SumWordCount) {
      this.traceList(learnProcess,function(node) {
        if (node.LearnedCount < node.SumWordCount) {
          wx.navigateTo({
            url: '../listen-read-mode/listen-read-mode?lid=' + node.ID + "&index=" + node.FirstUnlearnIndex,
          })
          return true;
        }
        return false;
      })
      wx.showToast({
        title: '哇哦,咋也没找到列表!',
      })
    } else {
      //学完了跳列表
      wx.navigateTo({
        url: '../lists/lists',
      });
    }
  }
})
// lists.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alpha_table: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(""),
    select_index: [0,0,0],
    currIndex: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var learnProcess = app.getLearnProcess();
    if(typeof(learnProcess)==undefined || !learnProcess) {
      this.loadData();
    }else {
      app.traceList(learnProcess, function (node) {
        node.LearnedLevel = Math.floor(node.LearnedCount * 5 / node.SumWordCount) * 2;
        return false;
      });
      this.setData({
        demo_data: learnProcess.WordListTree
      });
    }
    wx.setNavigationBarTitle({
      title: '别告诉我你懂单词-' + app.getBookName(),
    })
  },

  loadData: function () {
    var that = this;
    wx.showLoading("加载中...");
    util.myrequest("GetLearningProcess", {
      BookID: app.getBookID(),
      UserID: app.getUserID()
    }, function (data) {
      app.traceList(data, function (node) {
        node.LearnedLevel = Math.floor(node.LearnedCount * 5 / node.SumWordCount) * 2;
        return false;
      });
      that.setData({
        demo_data: data.WordListTree
      });
      app.setLearnProcess(data);
      app.setProcessLoad();
    }, function (err) {
      wx.showToast(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.isProcessOverdue()){
      this.loadData();
    }
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
  ////////////////////////////////////////
  onTabChange: function(e) {
    this.setData({
      currIndex: e.target.dataset.index
    });
  },
  onClickList: function(e) {
    this.data.select_index[this.data.currIndex] = e.target.dataset.index;
    this.setData({
      select_index: this.data.select_index
    });
  },
  onClickBottomButton: function (e) {
    //手动透传Class分类
    var tabItem = this.data.demo_data[this.data.currIndex];
    var index = this.data.select_index[this.data.currIndex];
    var className = tabItem.Name;
    var btn_index = e.target.dataset.index;
    var listItem = this.data.currIndex == 0 ? tabItem.Children[index] : null;
    var id = this.data.currIndex == 0 ? listItem.ID : tabItem.ID;
    var query = this.data.currIndex == 0 ? '' : this.data.alpha_table[index];
    if(query != '') {
      query = '&query=' + query;
    }
    var finished = this.data.currIndex == 0 ? listItem.LearnedCount >= listItem.SumWordCount : true;
    var hasPractice = this.data.currIndex == 0 ? listItem.HasPractice : false;
    wx.setStorageSync("__list_name__", listItem == null ? this.data.alpha_table[index] : listItem.Name);
    switch (btn_index) {
      case "0":
        wx.navigateTo({
          url: '../listen-read-mode/listen-read-mode?mode=' + (hasPractice ? 1 : 2) + '&lid=' + id + (finished ?'&index=0':'&index=-1') + "&class=" + className + query 
        })
        break;
      case "1":
        wx.navigateTo({
          url: '../self-evaluation/self-evaluation?mode=' + (hasPractice ? 1 : 2) + '&lid=' + id + '&index=0' + "&class=" + className + query
        })
        break;
      case "2":
        wx.navigateTo({
          url: '../questions-practice/questions-practice?mode=' + (hasPractice ? 1 : 2) + '&lid=' + id + '&index=0' + "&class=" + className + query
        })
        break;

    }
  },
})
// lists.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alpha_table: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(""),
    select_index: [0,1,2],
    currIndex: 0,
    tran2int:function(i) {
      return Math.floor(i);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var learnProcess = app.getLearnProcess();
    if(typeof(learnProcess)==undefined || !learnProcess) {
      wx.showLoading({
        title:"正在加载...",
        mask:true
      });
      util.myrequest("GetWordTreeList",{
        BookID: app.getBookID
      },function(obj){
        that.setData({
          demo_data:obj
        });
      },null)
    }else {
      that.setData({
        demo_data: learnProcess.WordListTree
      });
    }
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
  onClickStartLearn:function(e) {
    
    wx.navigateTo({
      url: '../listen-read-mode/listen-read-mode?lid=' + e.target.dataset.id + '&index=' + e.target.dataset.index
    })
  }
})
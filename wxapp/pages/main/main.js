// main.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authInfo:app.authInfo,
    showAD:false,
    bookIndex:-1,
    bookList: [
      {name:'初中500词',id:1},
      {name:'高中1000词',id:2}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.myrequest("BCASJDANKAJ",{
      //未填参数。
    },function(data){

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        showAD: true
      })
    }, 2000)
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
  onClickWordList : function (e) {
    wx.navigateTo({
      url: '../lists/lists',
    })
  },

  onClickBegin : function (e) {
    wx.navigateTo({
      url: '../lists/lists',
    })
  },
  onBookChange: function (e) {
    this.setData({
      //bookIndex: e.detail.value
      bookIndex: e.target.dataset.index
    })
  },
  onClickBookInfo: function(e) {
    this.setData({
      bookIndex: -1
    })
  }
})
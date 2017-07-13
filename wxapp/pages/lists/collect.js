// collect.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo_data : [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.myrequest("GetCollectionList",{},function(data){
      that.setData({
        demo_data:data
      });
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
  ////////////////////////////////////////////////
  onClickDelete : function(e) {
    wx.showLoading({
      title: '删除中...',
    });
    var that = this;
    util.myrequest("RmvCollection",{
      UserID: app.getUserID(),
      BookID: app.getBookID(),
      WordID: e.target.dataset.id
    },function(data){
      wx.showToast({
        title: '成功移除',
      });
      var demo_data = that.data.demo_data;
      for(var i = e.target.dataset.index; i < demo_data.length-1;i++) {
        demo_data[i] = demo_data[i+1];
      }
      that.data.demo_data.pop();
      that.setData({
        demo_data: demo_data
      });
    },function(err){

    })
  }
})
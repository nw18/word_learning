// mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  mineOrderClick: function () {
    console.log("mineOrderClick");
    wx.navigateTo({
      url: './mine-order/mine-order',
    })
  },
  mineCoureClick: function () {
    console.log("mineCoureClick");
    wx.navigateTo({
      url: './mine-coure/mine-coure',
    })
  },
  mineCollClick: function () {
    console.log("mineCollClick");
    wx.navigateTo({
      url: './mine-coll/mine-coll',
    })
  },
  mineSetClick: function () {
    console.log("mineSetClick");
    wx.navigateTo({
      url: './mine-set/mine-set',
    })
  },

  mineYibiClick: function () {
    console.log("mineYibiClick");
    wx.navigateTo({
      url: './mine-yibi/mine-yibi',
    })
  },
  
  mineCardClick: function () {
    wx.navigateTo({
      url: './mine-card/mine-card',
    })
  },
  mineUserClick: function () {
    wx.navigateTo({
      url: './mine-user/mine-user',
    })
  },
  mineScoreClick: function () {

  },

  mineMessClick: function () {
    wx.navigateTo({
      url: './mine-message/mine-message',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})
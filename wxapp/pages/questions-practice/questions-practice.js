//questions-praction.js
//获取应用实例
//https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html
var app = getApp()
Page({
  data: {
    progressItem:{
      progressNum: 0,
      progressAll: 20,
      progressPercent: 0,
    },
    answer:"B",
    answerArray:["A","B","C","D"],
    index:0,
    // trueColor:blur,
    // flaseColor:red,

    content:"could you go shopping wigo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrgo shopping with me tomorrth me tomorrow？\n______ my father and i will go wuhan tomorrow",
    motto: 'Hello World',

    movies: [],
    resqMD: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadMovie();
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

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击了A  B  C  D
  bindABtnTap: function (e) {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    console.log(e);

    if (e.target.id == this.data.answer){
      var that = this
      var perNum = that.data.progressItem.progressNum;
      perNum++
      if (perNum > that.data.progressItem.progressAll){
        perNum = 0;
      }
      console.log(perNum);
      that.data.progressItem.progressNum = perNum;
      that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 100;
      that.setData({
        progressItem: that.data.progressItem,
      })
    }

  },

  //点击了下一题
  bindNextBtnTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this
    // that.setData({
    //   progressNum: that.data.progressNum + 1,
    //   progressPercent: (that.data.progressNum + 1) / that.data.progressAll * 100,
    // })

    that.setData({
      answer: that.data.answerArray[that.data.index],
      // index: (that.data.index + 1) % 4,
      index: formatNumber(that.data.index),
    })
  },
  
  loadMovie: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log("qqqqqqqqqq"),
      wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetQuesList',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("11111111111111 {{res}}");
           wx.hideLoading({});
           that.setData({resqMD:res.data})
        },
        fail: function (res) {
           console.log("2222222222222"),
            wx.hideLoading({})
        },

      })
  }
  
})

function formatNumber(n) {
  n++;
  if(n==4){
    n=0;
  }
  return n;
}
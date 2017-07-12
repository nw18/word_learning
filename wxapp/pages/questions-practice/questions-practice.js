//questions-praction.js
//获取应用实例
//https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html
var app = getApp()
Page({
  data: {


    quesInfoList:[],
    index: 0,
    quesInfo:{},

    progressItem:{
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },

    btnClass: "sel-btn-true",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.loadQuesInfoList();
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
    var that = this
    if (e.target.id == this.data.quesInfo.AnswerList[0]){
      console.log("正确");
      for (var i in this.data.quesInfo.OptionList) {
        var opt = this.data.quesInfo.OptionList[i];
        if (e.target.id == opt.KeyName){

          this.data.quesInfo.OptionList[i].state = 1;
          that.setData({
            quesInfo: this.data.quesInfo,
          })
        }
      }
      
    }else{
      console.log("错误");
      for (var i in this.data.quesInfo.OptionList) {
        var opt = this.data.quesInfo.OptionList[i];
        if (e.target.id == opt.KeyName) {

          this.data.quesInfo.OptionList[i].state = 2;
          that.setData({
            quesInfo: this.data.quesInfo,
          })
        }
      }
    }

  },
  //填空题点击了查看答案
  bindTianBtnTap:function(){

    console.log(this.data.quesInfo.AnswerContent);
  },

  //点击了下一题
  bindNextBtnTap: function () {

    var that = this

    if (that.data.index+1 == that.data.quesInfoList.length){
      wx.navigateTo({
        url: '../learn-over/learn-over'
      })
      return;
    }
    that.data.index++;
    that.setData({
      quesInfo: that.data.quesInfoList[that.data.index],
    })

    var perNum = that.data.progressItem.progressNum;
    perNum++
    if (perNum > that.data.progressItem.progressAll) {
      perNum = 0;
    }
    that.data.progressItem.progressNum = perNum;
    that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 100;
    that.setData({
      progressItem: that.data.progressItem,
    })
  },
  
  loadQuesInfoList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
      wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetQuesList',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
           wx.hideLoading({});
           var list = res.data.Data;
    
           var perNum = that.data.index+1;
           that.data.progressItem.progressNum = perNum;
           that.data.progressItem.progressAll = list.length;
           that.data.progressItem.progressPercent = perNum / list.length * 100;

           that.setData({
             quesInfoList: list,
             quesInfo: list[that.data.index],
             progressItem: that.data.progressItem,
           })
        },
        fail: function (res) {
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
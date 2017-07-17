// pages/listen_read_mode/listen_read_mode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ListID: 12345,//外部传入的
      wordInfoList: [],
      index: 0,
      wordInfo: {},
      time:0,
      progressItem: {
        progressNum: 0,
        progressAll: 0,
        progressPercent: 0,
      },
      cixing: ["adj.圆形的", "n.通知","vt.触摸"],
      ExtraList:{
        liju: "Place \nyour hands on your shoulders and move your elbows up, back, and down, in a circular motion\n手置于肩上，肘部向上、向后、向下做圆圈运动。\nBoth sides of the river can be explored on this circular walk\n沿着这条环行线路走一圈，河的两边都可以看到。",
        shipin: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

      picture: 'http://img.zcool.cn/job/groups/b445558d077800000141f02f67a5.jpg',
      userInfo: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    this.loadWordInfoList();
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
//     var that = this;
//     var preTmie = 5;
//     var perNum = that.data.progressItem.progressNum;
//     var rightInterval = setInterval(function () {
    
//       console.log("这是一个五秒的定时器");
// // 每5秒切换一次单词
//       preTmie--;
//       if(preTmie==-1){
//         perNum++;
//         preTmie=5
//         that.data.index++;
//         // 换单词
//         that.setData({
//           wordInfo: that.data.wordInfoList[that.data.index],
//         });
//         console.log(perNum);
//         that.data.progressItem.progressNum = perNum;
//         that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 100;
//         that.setData({
//           progressItem: that.data.progressItem,
         
//         })
//       }
     
//       if (perNum >= that.data.progressItem.progressAll) {
//         clearInterval(rightInterval)
//         wx.redirectTo({
//           url: '../learn-over/learn-over'     
//         })
//         return;
//       }
//       // 更新时间
//     that.setData({
//       time:preTmie
//     })
//     }, 1000);
//     that.rightInterval = rightInterval;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.rightInterval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.rightInterval);
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

    loadWordInfoList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: 'https://openapi.yqj.cn/MockAPI/WordLearning/GetWordList',
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
        });

      },
      fail: function (res) {
        wx.hideLoading({})
      },
    })

  }
})
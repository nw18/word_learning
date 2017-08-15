// mine-coure.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CourseList:[],
    CourseBeginTime:"",
    CourseEndTime:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://userapi.yqj.cn/MockAPI/Account/Course/CourseList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)

        if (typeof String.prototype.endsWith != 'function') {
          String.prototype.endsWith = function (str) {
            return this.slice(-str.length) == str;
          };
        }
        
        if (typeof Number.prototype.asDate != 'function') {
          Number.prototype.asDate = function (str) {
            var date = new Date();
            date.setTime(this * 1000);
            return date;
          };
        }

        for (var i = 0; i < res.data.Data.CourseList.length; i++) {
          var man = res.data.Data.CourseList[i];
          //为所有的对象添加clone方法，即给内置原型(object,Array,function)增加原型属性,该方法很强大，也很危险
          // if (typeof Object.prototype.clone === "undefined") {
          //   Object.prototype.clone = function () { };
          // }
          for (var i in man) {
            if (man.hasOwnProperty(i)) { //filter,只输出man的私有属性
        
              if (i.endsWith("Time") ){

              
                var timeLong = man[i];
                // var date = new Date();
                // date.setTime(timeLong*1000);
                var timeStr = util.formatTime(timeLong.asDate())
                man[i] = timeStr;
                console.log(i, ":", man[i]);
                // console.log(timeStr);

              }
            };
          }


        };

        that.setData({
          CourseList: res.data.Data.CourseList
        });
      }
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
  
  }
})
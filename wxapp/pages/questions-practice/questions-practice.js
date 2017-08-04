//questions-praction.js
//获取应用实例
//https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html

var util = require('../../utils/util.js');
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  isShowAnswer:false,
  data: {
    lid: 12345,//外部传入的
    mode: 0,//外部传入的
    query: "",//外部传入的
    index: 0,//外部传入的

    quesInfoList:[],
    quesInfo:{},
    answerHidden:true,
    sureResultStr:"答对了",
    progressItem:{
      progressNum: 0,
      progressAll: 0,
      progressPercent: 0,
    },
    // article_content: "",
    btnClass: "sel-btn-true",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.data.lid = e.lid;
    this.setData({
      lid: e.lid,
      mode: e.mode,
      query: e.query,
      index: e.index,
    })
     this.loadQuesInfoList();
     /** 
     * WxParse.wxParse(bindName , type, data, target,imagePadding) 
     * 1.bindName绑定的数据名(必填) 
     * 2.type可以为html或者md(必填) 
     * 3.data为传入的具体数据(必填) 
     * 4.target为Page对象,一般为this(必填) 
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选) 
     */
    //  var that = this;
    //  var article = '<p>阿福妈妈啊忙什么打城市的刷卡</p><p>啊打卡都没卡死</p><p>的撒毛孔打开</p><p><br /></p><p>阿卡大声可ad</p><p>啊都卡</p>';
    //  WxParse.wxParse('article', 'html', article, that, 5);  
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
    wx.stopBackgroundAudio();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopBackgroundAudio();
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
  //记录进度
  setStudentPress: function () {
    var that = this
    util.myrequest("SetQuesLearned", {
      BookID: app.getBookID(),
      QuesID: that.data.quesInfo.ID,
      UserID: app.getUserID(),
    }, function (data) {

    }, function (err) {
      wx.showToast(err);
    })
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击了A  B  C  D
  bindABtnTap: function (e) {

    console.log(e);
    var that = this
    if (that.isShowAnswer){
      console.log("retu---");
      return;
    }
    that.isShowAnswer = true;

    for (var i in this.data.quesInfo.OptionList) {

      var opt = this.data.quesInfo.OptionList[i];
      if (e.target.id == opt.KeyName || e.currentTarget.id == opt.KeyName){//找到了点击

        if (opt.IsAnswer==1){//答对了
          this.data.quesInfo.OptionList[i].state = 1;
          that.setData({
            quesInfo: this.data.quesInfo,
            sureResultStr: "答对了"
          })
        }else{//答错了
          //找出正确答案      
          for (var j in this.data.quesInfo.OptionList) {
            var option = this.data.quesInfo.OptionList[j];
            if (option.IsAnswer==1){
              this.data.quesInfo.OptionList[j].state = 1;
            }
          }

           this.data.quesInfo.OptionList[i].state = 2;
           that.setData({
             quesInfo: this.data.quesInfo,
             sureResultStr: "正确答案"
           })
        }
      }
    }

  },
  //填空题点击了查看答案
  bindTianBtnTap:function(){
    var that = this
    that.setData({
      answerHidden: false,
    })
    console.log(this.data.quesInfo.AnswerContent);
  },

  //点击了下一题
  bindNextBtnTap: function () {
    
    this.setStudentPress();

    var that = this
    var list = that.data.quesInfoList;
    that.isShowAnswer = false;
    if (that.data.index+1 == that.data.quesInfoList.length){
      wx.redirectTo({
        url: '../learn-over/learn-over?index=0&lid=' + that.data.lid + '&mode=' + that.data.mode + '&query=' + that.data.query,
      })
      return;
    }
    that.data.index++;
    WxParse.wxParse('article', 'html', that.data.quesInfoList[that.data.index].Content, that, 5);
    var temp = [];
    for (var i in that.data.quesInfoList[that.data.index].OptionList) {
      var optionStr = that.data.quesInfoList[that.data.index].OptionList[i].Content;
      var optionHtml = "optionHtml" + i;
      temp.push(WxParse.wxParse(optionHtml, 'html', optionStr, that, 5));
    }

    if (list[that.data.index].AnswerContent != undefined) {
      WxParse.wxParse('answer_content', 'html', list[that.data.index].AnswerContent, that, 5)
    }
    that.setData({
      quesInfo: that.data.quesInfoList[that.data.index],
      option_list: temp,
    })

    var perNum = that.data.progressItem.progressNum;
    perNum++
    if (perNum > that.data.progressItem.progressAll) {
      perNum = 0;
    }
    that.data.progressItem.progressNum = perNum;
    that.data.progressItem.progressPercent = perNum / that.data.progressItem.progressAll * 580;
    that.setData({
      progressItem: that.data.progressItem,
      answerHidden: true,
    })
  },
  
  loadQuesInfoList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    util.myrequest("GetQuesList", {
      ListID: that.data.lid,
      // UserID: app.getUserID(),
    }, function (data) {
      var list = data;
      if (list.length<1){
        wx.navigateBack({})
      }

      var perNum = that.data.index;
      perNum++;
      that.data.progressItem.progressNum = perNum;
      that.data.progressItem.progressAll = list.length;
      that.data.progressItem.progressPercent = perNum / list.length * 580;

      WxParse.wxParse('article', 'html', list[that.data.index].Content, that, 5);
      
      var temp = [];
      for (var i in list[that.data.index].OptionList){
        var optionStr = list[that.data.index].OptionList[i].Content;
        var optionHtml = "optionHtml"+i;
        temp.push(WxParse.wxParse(optionHtml, 'html', optionStr, that, 5)); 
      }
      if (list[that.data.index].AnswerContent != undefined) {
        WxParse.wxParse('answer_content', 'html', list[that.data.index].AnswerContent, that, 5)
      }
      that.setData({
        quesInfoList: list,
        quesInfo: list[that.data.index],
        progressItem: that.data.progressItem,
        option_list:temp,
        // _data_:that.data
      })
    }, function (err) {
      wx.showToast(err);
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
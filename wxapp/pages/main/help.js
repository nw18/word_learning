// help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad_content : [
      {
        _type_: 1,
        title:"讲师介绍",
        content:"赵丽，美通教育美研负责人，20年英语教龄，GRE、GMAT一姐， ETS 全球研究院访问学者，全国十大魅力教师。曾任新东方集团高级培训师、演讲师，共计出版图书49本，正式出版网络产品37种，曾在美国哈佛大学、沃顿商学院、华盛顿大学等19等所大学巡讲。"
      },
      {
        _type_: 2,
        content:"疑问解答"
      },
      {
        _type_: 3,
        que: "Q:课程有多少节？每节多少时间？一节讲多少个词汇？",
        ans: "A:你好同学，初中词汇课一共有20节，高中词汇课有25节，每节时间约为25-30分钟，每节课老师会重点讲将近20个重点词汇以及其用法，所以只要认真学习，复习巩固，就能掌握初高中必背的单词，欢迎报名学习。"
      },
      {
        _type_: 3,
        que: "Q:课程适合什么版本的学生学习？",
        ans: "A:你好同学，本课程没有教材版本限制，全国学生都可以报名学习！"
      },
      {
        _type_: 3,
        que: "Q:课程都适合哪个年级的学生学习？",
        ans: "A:你好同学，初中词汇课适合初一至初三的学生，高中词汇课适合高一至高三的学生，课程能帮助巩固复习单词，指导快速记忆重难点单词，让你掌握核心单词用法，更能突破阅读理解、写作表达中遇到的生词障碍，提分更快。"
      },
      {
        _type_: 3,
        que: "Q:这个课程是有教材的么？没有的话要在哪预习？",
        ans: "A:你好同学，本课程配套教材《别告诉我你懂单词（赵丽编著）》，购买课程时可配套购买教材。设计课程时，我们考虑到没有教材的同学，所以课程不完全依赖于教材，收听课程时，没有教材也可以完整学习，欢迎报名！"
      },
      {
        _type_: 3,
        que: "Q:课程中包含的直播课，多久开一节？",
        ans: "A:你好同学，为提高学生学习效率，赵丽老师会定期进行线上答疑指导，与同学们面对面交流。购买课程后，即可观看全部视频课，每次直播互动前我们会即时发送短信通知到学员。"
      }
    ]
  },
  btnleftClick: function (options) {
    console.log("btnleftClick");
    wx.navigateTo({
      url: '../commod-detail/commod-detail'
    })
  },
  btnrightClick: function (options) {
    console.log("btnrightClick");
    wx.navigateTo({
      url: '../commod-detail/commod-detail'
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
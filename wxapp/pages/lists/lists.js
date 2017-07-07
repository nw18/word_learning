// lists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo_data: [
      {
        ID: 1001, //列表或节点的ID值
        Name: "核心词汇", //名称
        IsList: false, //是否为词汇列表
        HasPractice: false, //是否包含真题练习
        SunWordCount: 40, //列表词汇量
        Children:[

          {
            ID: 1011, //列表或节点的ID值
            Name: "list1", //名称
            IsList: true, //是否为词汇列表
            HasPractice: true, //是否包含真题练习
            SunWordCount: 40, //列表词汇量
          },
          {
            ID: 1012, //列表或节点的ID值
            Name: "list2", //名称
            IsList: true, //是否为词汇列表
            HasPractice: false, //是否包含真题练习
            SunWordCount: 40, //列表词汇量
          },
          {
            ID: 1013, //列表或节点的ID值
            Name: "list3", //名称
            IsList: true, //是否为词汇列表
            HasPractice: true, //是否包含真题练习
            SunWordCount: 40, //列表词汇量
          },
          {
            ID: 1014, //列表或节点的ID值
            Name: "list4", //名称
            IsList: true, //是否为词汇列表
            HasPractice: false, //是否包含真题练习
            SunWordCount: 40, //列表词汇量
          },
          {
            ID: 1015, //列表或节点的ID值
            Name: "list5", //名称
            IsList: true, //是否为词汇列表
            HasPractice: true, //是否包含真题练习
            SunWordCount: 40, //列表词汇量
          }
        ]
      },
      {
        ID: 1002, //列表或节点的ID值
        Name: "基础词汇", //名称
        IsList: true, //是否为词汇列表
        HasPractice: true, //是否包含真题练习
        SunWordCount: 40, //列表词汇量
      },
      {
        ID: 1003, //列表或节点的ID值
        Name: "补充词汇", //名称
        IsList: true, //是否为词汇列表
        HasPractice: true, //是否包含真题练习
        SunWordCount: 40, //列表词汇量
      }
    ]
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
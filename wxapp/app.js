//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  },
  // 单词作者的基本信息
  authInfo: {
    id: 100,
    description: "从今天起\n跟赵老师一起背单词",
    head_image : "/img/auth-head.png"
  },
  //存储缓存当前的学习信息
  learnInfo: {
    book_id: '', //当前学习的BookID
    learn_process: { //按BookID存储的学习进度表

    },
    book_list: [ // 当前老师的著作列表

    ],
    learn_schedule: { //按BookID存储的课程列表

    }
  },
  //启动后加载学习信息
  initLearnInfo: function(){

  },
  //设定单词学习进度，需要给出总个数。
  setLearnPosition: function(lesson_id,learn_index,sum_count) {

  },
  //返回已经学了多少个单词,即下一个要学的单词索引.
  getLearnPosition: function(lesson_id) {

  },
  //查找下一个要学的单词,返回{lession_id,learn_index}
  findNexLession: function() {
    
  }
})

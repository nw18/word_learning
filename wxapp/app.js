//app.js
var util = require('utils/util.js')
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    //创建用户UUID
    var userID = wx.getStorageSync("userID");
    if (typeof(userID)==undefined || !userID){
      userID = util.uuid();
      wx.setStorageSync("userID",userID);
    }
    console.info("user id:" + userID);
    this.authInfo.uuid = userID;
    //读取学习进度缓存
    var learnInfo = wx.getStorageSync(userID);
    console.debug(JSON.stringify(learnInfo));
    if (typeof (learnInfo) != undefined && learnInfo) {
      this.learnInfo = learnInfo;
    }
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
    id: util.get_auth_id(), 
    description: "从今天起\n跟赵老师一起背单词",
    head_image : "/img/auth-head.png",
    uuid: ''
  },
  //存储缓存当前的学习信息
  learnInfo: {
    bookID: -1, //当前学习的BookID
    bookList: [ // 当前老师的著作列表

    ]
  },
  changeMark: [
    [new Date(), new Date()],
    [new Date(), new Date()]
  ],
  //
  findBookIndex: function() {
    for(var i = 0; i < this.learnInfo.bookList.length; i++) {
      if(this.learnInfo.bookID == this.learnInfo.bookList[i].ID) {
        return i;
      }
    }
    return -1;
  },
  //
  updateBookIndex: function(bookIndex) {
    this.learnInfo.bookID = this.learnInfo.bookList[bookIndex].ID;
    wx.setStorageSync(this.authInfo.uuid,this.learnInfo);
    console.debug(JSON.stringify(this.learnInfo));
  },
  getBookList: function() {
    return this.learnInfo.bookList;
  },
  setBookList: function(bookList) {
    this.learnInfo.bookList = bookList;
    wx.setStorageSync(this.authInfo.uuid, this.learnInfo);
    console.debug(JSON.stringify(this.learnInfo));
  },
  getUserID: function() {
    return this.authInfo.uuid;
  },
  getBookID: function() {
    return this.learnInfo.bookID;
  },
  setLearnProcess: function(learnProcess) {
    this.learnProcess = learnProcess;
  },
  getLearnProcess: function() {
    return this.learnProcess;
  },
  getBookName: function() {
    for (var i = 0; i < this.learnInfo.bookList.length; i++) {
      if (this.learnInfo.bookID == this.learnInfo.bookList[i].ID) {
        return this.learnInfo.bookList[i].Name;
      }
    }
    return "";
  },
  //
  setStatus: function(index1,index2) {
    this.changeMark[index1][index2] = new Date();
  },
  setProcessChange:function() {
    this.setStatus(0,0);
  },
  setProcessLoad: function () {
    this.setStatus(0, 1);
  },
  isProcessOverdue: function() {
    return this.changeMark[0][0] > this.changeMark[0][1];
  },
  setCollectChange: function () {
    this.setStatus(1, 0);
  },
  setCollectLoad: function () {
    this.setStatus(1, 1);
  },
  isCollectOverdue: function () {
    return this.changeMark[1][0] > this.changeMark[1][1];
  },

  currentList : null,
  getCurrentList: function() {
    return this.currentList;
  },
  setCurrentList: function(list) {
    if(list && list.length > 0){
      this.currentList = list;
    }else {
      this.currentList = null;
    }
  },
  traceList: function (learnProcess, callback) {
    var node_list = new Array();
    for (var i in learnProcess.WordListTree) {
      learnProcess.WordListTree[i].Class = learnProcess.WordListTree[i].Name
      node_list.push(learnProcess.WordListTree[i]);
    }
    while (node_list.length > 0) {
      var node = node_list.shift();
      if (node.IsWordList) {
        if (callback(node)) {
          return true;
        }
      } else {
        for (var i in node.Children) {
          node.Children[i].Class = node.Class;
          node_list.push(node.Children[i]);
        }
      }
    }
    return false;
  }
})

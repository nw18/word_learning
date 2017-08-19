// shop-car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      carState:"",
      carBtnState:"",
      carList:[],
      isSelectAll:false,
      carListSY:[
      {
          state:1,
          picture: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3166042930,4286326923&fm=173&s=492423D042730F9C680965D10300F090&w=418&h=527&img.JPEG",
          pruduceName:"是ffffff间谍就叠加",
          price:12345,
          num: 123,
          pruduceId:1234 
      },
      {
        state: 1,
        picture: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3166042930,4286326923&fm=173&s=492423D042730F9C680965D10300F090&w=418&h=527&img.JPEG",
        pruduceName: "是间烦人烦人烦人叠加",
        price: 3466,
        num: 13,
        pruduceId: 2345 
      },
      {
        state: 0,
        picture: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3166042930,4286326923&fm=173&s=492423D042730F9C680965D10300F090&w=418&h=527&img.JPEG",
        pruduceName: "是间谍就叠加",
        price: 345465,
        num: 3,
        pruduceId: 3456 
      },
      {
        state: 0,
        picture: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3166042930,4286326923&fm=173&s=492423D042730F9C680965D10300F090&w=418&h=527&img.JPEG",
        pruduceName: "实际嘟嘟额度",
        price: 12345,
        num: 23,
        pruduceId: 4567 
      },
      ]
  },

  numAddClick: function (event) {
    console.log(event);
    console.log(event.target.id);
    for (var i in this.data.carList) {
      var mode = this.data.carList[i];
      if (mode.pruduceId == event.target.id){
        mode.num++;
        this.saveCarList();
      }
    }
  },
  numJianClick: function (event) {
    console.log(event);
    console.log(event.target.id);
    for (var i in this.data.carList) {
      var mode = this.data.carList[i];
      if (mode.pruduceId == event.target.id) {
        if (mode.num>0){
          mode.num--;
        }
        this.saveCarList();
      }
    }
  },

  checkboxClick: function (event) {
    console.log(event);
    console.log(event.target.id);

    for (var i in this.data.carList) {
      var mode = this.data.carList[i];
      if (mode.pruduceId == event.target.id) {
        if (mode.state == 0) {
          mode.state =1;
        }else{
          mode.state=0;
        }
        this.saveCarList();
      }
    }

  },
  allCheckboxChange: function (event) {
    console.log(event);

      for (var i in this.data.carList) {
        var mode = this.data.carList[i];
        if (this.data.isSelectAll) {
          mode.state = 0
        } else {
          mode.state = 1 
        }
      }
      this.saveCarList();
      this.data.isSelectAll = !this.data.isSelectAll;
    // console.log(event.detail.value);
    
  },
  finishBtnClick: function(options) {
    if (this.data.carState == "编辑") {//点击了去结算
    
    }else{//点击了删除
      console.log()
      var tampList=[];
      for (var i in this.data.carList) {
        var mode = this.data.carList[i];

        if (mode.state == 0) {
          tampList.push(mode);
        }
      }
      console.log(tampList)
      this.data.carList = tampList;
      this.saveCarList();
    }

  },
  editBtnClick: function (options) {
    if (this.data.carState=="编辑") {
      this.setData({
        carState: "完成",
        carBtnState: "删除"
      })
    }else{

      this.setData({
        carState: "编辑",
        carBtnState: "去结算"
      }) 
    }

  },
  saveCarList: function () {
    var that = this;
    wx.setStorageSync('carList', this.data.carList)
    this.setData({
      carList: that.data.carList,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var value = wx.getStorageSync('carList')
    if (value) {
      this.setData({
        carList:value,
      })

    }else{
      wx.setStorageSync('carList', this.data.carListSY)
      this.setData({
        carList: that.data.carListSY,
      })
    }


    this.setData({
      carState:"编辑",
      carBtnState:"去结算"
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
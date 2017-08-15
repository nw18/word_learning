var mode = 1;
var token_key = "__token__";
var token_value = undefined;
var api_roots = [
  'https://openapi.yqj.cn/MockAPI/WordLearning/', //模拟数据地址
  'https://dopen.yqj.cn/api/WordLearning/', //开发服务器地址
  'https://openapi.yqj.cn/api/WordLearning/', //正式地址
];

var user_roots = [
  '',
  'https://duser.yqj.cn/Token',
  'https://userapi.yqj.cn/Token',
];
//开发服务器(郑郑=30)
var auth_id = [
  100,30,0
]

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function myrequest(name,data={},sucess=null,fail=null,complete=null) {
  if(token_value == undefined 
      && ((token_value = wx.getStorageSync(token_key)) == undefined
          || token_value == "")) {
    //重新获取Token
    get_token({
      name: name,
      data: data,
      sucess: sucess,
      fail: fail,
      complete: complete
    })
  }else {
    wx.request({
      url: api_roots[mode] + name,
      data: data,
      header: {
        'Content-type': 'application/json',
        'Authorization' : 'Bearer ' + token_value
      },
      method:"POST",
      success: function(obj) {
        console.debug(obj.statusCode + ":" + JSON.stringify(obj.data));
          if(obj.statusCode == 200) {
            if(obj.data.Code == 0) {
              if(sucess != null) {
                sucess(obj.data.Data);
              }
            } else if (obj.data.Code == 1000) {
              //重新获取Token
              get_token({
                name:name,
                data:data,
                sucess:sucess,
                fail:fail,
                complete:complete
              })
            }else {
              if(fail != null){
                fail(obj.data.Msg);
              }
            }
          } else if (obj.statusCode == 401) {
            //重新获取Token
            get_token({
              name: name,
              data: data,
              sucess: sucess,
              fail: fail,
              complete: complete
            })
        } else {
          if (fail != null) {
            fail(obj.data);
          }
        }
      },
      fail: function(err) {
        console.error(err);
        if(fail != null) {
          fail(err);
        }
      },
      complete: function() {
        wx.hideLoading();
        if(complete!=null){
          complete();
        }
      }
    })
  }
}

function get_token(preq) {
  if(user_roots[mode] == '') {
    wx.setStorage({
      key: token_key,
      data: uuid(),
    })
  }else {
    wx.request({
      url: user_roots[mode],
      header: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },data : {
        'client_id': 'yqj201707261616526939', //开发服务器
        'client_secret': "21e14de99bce493c88dfe04fe6a15af6",
        // 'client_id': 'yqj201707261712349267', //测试服务器
        // 'client_secret': "76265031958d4572b76acfd743d69cda",
        'grant_type': 'client_credentials'
      },
      method:"POST",
      success: function (obj) {
        if (obj.statusCode == 200) {
          //写入Token的值.
          token_value = obj.data.access_token;
          wx.setStorageSync(token_key, obj.data.access_token);
          //重新调用网络请求
          if (preq != undefined) {
            myrequest(preq.name,preq.data,preq.sucess,preq.fail,preq.complete);
          }
        }else {
          console.error(obj);
          if (preq != undefined && preq.fail != null) {
            preq.fail("获取Token失败!");
          }
        }
      },
      fail: function (err) {
        console.error(err);
        if(preq != undefined && preq.fail != null) {
          preq.fail(err);
        }
      }
    })
  }
}

function uuid() {
  var s = [];
  var hexDigits = "0123456789ABCDEF";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function range(start,end,setp=1) {
  var array = new Array((end-start) / setp);
  for(var i = start; i < end; i+=setp){
    array.push(i);
  }
  return array;
}

function get_auth_id() {
  return auth_id[mode];
}

function fuck_token() {
  token_value = "123456";
}

module.exports = {
  formatTime: formatTime,
  myrequest: myrequest,
  uuid: uuid,
  range: range,
  get_auth_id: get_auth_id,
  get_token: get_token,
  fuck_token: fuck_token
}
var mode = 1;
var api_roots = [
  '',
  'https://openapi.yqj.cn/MockAPI/Operative/' //模块未建立,正式地址未建立
];

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function _empty_(e) {} 

function myrequest(name,data={},sucess=null,fail=null,complete=null) {
  if(mode == 0) {
    sucess(require("./demo-data/" + name + ".js"))
  }else {
    wx.request({
      url: api_roots[mode] + name,
      data: data,
      success: function(obj) {
        if(obj.data.Code == 0) {
          if(sucess != null) {
            sucess(obj.data.Data);
          }
        }else {
          if(fail != null){
            fail(obj.data);
          }
        }
      },
      fail: fail == null ? _empty_ : sucess,
      complete: function() {
        wx.hideLoading();
        if(complete!=null){
          complete();
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

module.exports = {
  formatTime: formatTime,
  myrequest: myrequest,
  uuid: uuid
}
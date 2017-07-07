var mode = 1;
var api_roots = [
  '',
  'https://openapi.yqj.cn/'
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

function myrequest(name,data={},sucess=null,fail=null) {
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
      fail: fail == null ? _empty_ : sucess
    })
  }
}

module.exports = {
  formatTime: formatTime,
  myrequest: myrequest
}
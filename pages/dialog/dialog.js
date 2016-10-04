var inputValue='';
var chatfunction = require('function.js')
Page({
  data: {
    focus: false,
    inputValue: ''
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
        url: 'https://owlwang.com/wechat/test.php',
        method: 'POST',
        data: {
          name: 'haha' ,
          input: e.detail.value,
        },
        success: function(res) {
          console.log(res.data)
        },
        fail: function(res) {
          console.log("request fail")
        }
    })
  },
  onLoad: function () {
    chatfunction.loginDialog()
  }
})

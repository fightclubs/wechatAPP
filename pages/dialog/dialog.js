var chatfunction = require('function.js')



Page({
   data:{
    inputText: '',
  },

  /**
   * 监听手机号输入
   */
  listenerPhoneInput: function(e) {
      this.data.inputText = e.detail.value;
     // return 'sb'
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', this.data.inputText)
    wx.request({
        url: 'https://owlwang.com/wechat/test.php',
        method: 'POST',
        data: {
          neme: 'haha' ,
          input: this.data.inputText,
        },
        success: function(res) {
          console.log(res.data)
        },
        fail: function(res) {
          console.log("request fail")
        }
    })
    return 'asdsa'
  },
  onLoad: function () {
    chatfunction.loginDialog()
  }
})

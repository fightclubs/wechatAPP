var chatfunction = require('function.js')


Page({
   data:{
    inputText: '',
  },
  listenerPhoneInput: function(e) {
      this.data.inputText = e.detail.value;
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
  },
  onLoad: function () {
    //建立会话
    chatfunction.loginChat()
    //如果成功建立
    chatfunction.startPolling()
  },
  onUnload:function () {
    //关闭会话
    //关闭轮询
    chatfunction.stopPolling()
  },
})

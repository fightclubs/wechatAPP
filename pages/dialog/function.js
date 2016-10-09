/*
* 功能：开始一个聊天会话
* 实现：发送本机用户数据并向服务器请求匹配一个用户数据返回
*/
var socketOpen = false;
function connectServer()
{
    //发起websocket连接
    wx.connectSocket({
      url: 'ws://45.32.32.225:7272',
    })
    //响应连接成功事件，发送用户数据
    onConnectServer()

    //注册服务器消息回调函数
    recvMessage()

    //连接失败
    wx.onSocketError(function(res){
    console.log('WebSocket连接打开失败，请检查！')
    })
}
function onConnectServer()
{
    wx.onSocketOpen(function(res) {
    socketOpen = true
  
    wx.getUserInfo({//通过wechat api获得本机用户数据
            success: function(res) {
                userInfo = res.userInfo
                //更新requsetMatch里的userInfo
                var requestMatch=matchUsers()
                requestMatch(userInfo,null,null)

                //通过api获取位置数据
                wx.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        //更新requsetMatch里的经纬度
                        requestMatch(null,res.latitude,res.longitude)
                    }
                })
                
            },
            fail: function(res) {
                userInfo = null
            }
        })
    })
}
function disconnectServer()
{
    wx.closeSocket()
    wx.onSocketClose(function(res) {
        console.log('WebSocket 已关闭！')
    })   
}
function sendMessage(msg)
{
     socketOpen = true
    if (socketOpen) {
        wx.sendSocketMessage({
          data:msg
        })
    }
}
function recvMessage()
{   
    wx.onSocketMessage(function(res) {
    //log返回数据
    console.log('收到服务器内容：' + res.data)
    //解析数据
    parseMessage(res.data)
    })
}
function parseMessage(msg)
{
    //switch

}


/*
* 功能：向服务器请求一个用户配对
* 实现：利用wechat api的wx.request提交一个json并获得一个返回json
*      利用闭包的特性 函数内局部变量值不被销毁，两次调用matchUsers分别填充userInfo和经纬度
*/
var matchUsers=function() 
{
  var userInfo,latitude,longitude
  return function(userInf,latitude,longitude){
      if(userInf!=null)
          userInfo=userInf
      if(latitude!=null&&longitude!=null)
      {
          userInfo.latitude=latitude;
          userInfo.longitude=longitude;
          //向服务器发送用户数据
          sendMessage(JSON.stringify(userInfo));
      }
  }
}


/*
* 向框架注册要外部调用的函数
*/
module.exports = {
    connectServer:connectServer,
    disconnectServer:disconnectServer,
}


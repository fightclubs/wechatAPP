/*
* 功能：开始一个聊天会话
* 实现：发送本机用户数据并向服务器请求匹配一个用户数据返回
*/

function loginChat()
 {
     
    wx.getUserInfo({//通过wechat api获得本机用户数据
            success: function(res) {
                userInfo = res.userInfo

                //更新requsetMatch里的userInfo
                var requestMatch=matchUsers()
                requestMatch(userInfo,null,null)
                wx.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        ////更新requsetMatch里的经纬度
                        requestMatch(null,res.latitude,res.longitude)
                    }
                })
                
            },
            fail: function(res) {
                userInfo = null
            }
        })
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
          wx.request({
                    url: 'https://owlwang.com/wechat/chat.php',
                    method: 'POST',
                    data:{
                        nickName:userInfo.nickName,
                        avatarUrl:userInfo.avatarUrl,
                        gender:userInfo.gender, //性别 0：未知、1：男、2：女 
                        province:userInfo.province,
                        city:userInfo.city,
                        country:userInfo.country,
                        latitude:latitude,
                        longitude:longitude,
                    },
                    //服务器有响应
                    success: function(res) {
                    console.log("已经配对!")
                    console.log(res.data)
                    },
                    //服务器无响应
                    fail: function(res) {
                    console.log("服务器无响应!")
                    }
            })
      }
}
}

/*
* 功能：设置定时轮询
* 实现：定时去请求最新的聊天数据
*/
var interval;
function startPolling(){
    interval = setInterval(function(){
        wx.request({
                url: 'https://owlwang.com/wechat/login.php',
                method: 'POST',
                data: {
                    user1:{
                        nickName:userInfo.nickName,
                        avatarUrl:userInfo.avatarUrl,
                        gender:userInfo.gender, //性别 0：未知、1：男、2：女 
                        province:userInfo.province,
                        city:userInfo.city,
                        country:userInfo.country,
                        },
                    user2:{
                        nickName:userInfo.nickName,
                        avatarUrl:userInfo.avatarUrl,
                        gender:userInfo.gender, //性别 0：未知、1：男、2：女 
                        province:userInfo.province,
                        city:userInfo.city,
                        country:userInfo.country,
                        },
                    time:new Date(),
                },
                //服务器有响应
                success: function(res) {
                console.log(res.data)
                },
                //服务器无响应
                fail: function(res) {
                console.log("服务器无响应!")
                }
        })
    },500)
}
/*
* 功能：关闭定时轮询
* 实现：断开连接时关闭轮询
*/
function stopPolling(){
    clearInterval(interval)
}
/*
* 向框架注册要外部调用的函数
*/
module.exports = {
    loginChat: loginChat,
    startPolling: startPolling,
    stopPolling:stopPolling,
}
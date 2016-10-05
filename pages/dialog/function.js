/*
* 功能：开始一个聊天会话
* 实现：发送本机用户数据并向服务器请求匹配一个用户数据返回
*/

function loginChat()
 {
     
    wx.getUserInfo({//通过wechat api获得本机用户数据
            success: function(res) {
                userInfo = res.userInfo
                //userInfo.latitude,userInfo.longitude=
                
                getLocation();
                console.log('牛逼',userLocationX,userLocationY)
                requestMatch(userInfo)//向服务器要求匹配一个用户
            },
            fail: function(res) {
                userInfo = null
            }
        })
 }
 /*
* 功能：获取用户当前地理位置GPS数据
* 实现：微信API
*/

function getLocation()
{  
    wx.getLocation({
        type: 'wgs84',
        success: function(res) {
            userLocationX=res.latitude,
            userLocationY=res.longitude
        }
    })
}
/*
* 功能：向服务器请求一个用户配对
* 实现：利用wechat api的wx.request提交一个json并获得一个返回json
*/
function requestMatch(userInfo)
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
                latitude:userInfo.latitude,
                longitude:userInfo.longitude,
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
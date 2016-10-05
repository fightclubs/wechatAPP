/*
* 功能：开始一个聊天会话
* 实现：发送本机用户数据并向服务器请求匹配一个用户数据返回
*/
function loginChat()
 {
    wx.getUserInfo({//通过wechat api获得本机用户数据
            success: function(res) {
                userInfo = res.userInfo
                requestMatch(userInfo)//向服务器要求匹配一个用户
            },
            fail: function(res) {
                userInfo = null
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
            url: 'https://owlwang.com/wechat/login.php',
            method: 'POST',
            data: {
            nickName:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl,
            gender:userInfo.gender, //性别 0：未知、1：男、2：女 
            province:userInfo.province,
            city:userInfo.city,
            country:userInfo.country,
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
* 向框架注册要外部调用的函数
*/
module.exports = {
    loginChat: loginChat
}
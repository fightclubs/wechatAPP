function loginDialog()
 {
    wx.getUserInfo({
            success: function(res) {
                userInfo = res.userInfo
                matchUsers(userInfo)
            },
            fail: function(res) {
                userInfo = null
            }
        })
 }

function send_request(userInfo)
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
 function matchUsers(userInfo) {
    //发送到服务器并请求配对信息
    send_request(userInfo)
    
}

module.exports = {
    loginDialog: loginDialog
}
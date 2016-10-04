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
function sleep(numberMillis) { 
  var now = new Date(); 
  var exitTime = now.getTime() + numberMillis; 
  while (true) { 
  now = new Date(); 
  if (now.getTime() > exitTime) 
  return; 
  } 
}
function send_request(userInfo,isMatchUser)
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
              isMatchUser=1;
            }
     })
     return isMatchUser
}
 function matchUsers(userInfo) {
    //发送到服务器并请求配对信息
    var isMatchUser=1;
    send_request(userInfo,isMatchUser)
    
}

module.exports = {
    loginDialog: loginDialog
}
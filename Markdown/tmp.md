二维码扫码登录是一种方便、快捷的登录方式，它通过将用户的登录信息编码为二维码，实现了用户在移动设备上的快速登录。本文将详细解析二维码扫码登录的技术实现与流程，并通过实例帮助读者更好地理解。

首先，用户需要在Web端打开网页并进入扫码登录的界面。此时，Web端服务器会生成一个唯一的二维码，并返回给用户。用户使用移动设备扫描此二维码，即可进行登录操作。

在二维码生成的过程中，Web端服务器会为生成的二维码生成一个唯一的标识符（UUID），并将该标识符与二维码进行关联，同时将标识符存储在数据库中。这个标识符用于在后续的登录过程中进行身份验证。

用户在移动设备上扫描二维码后，APP客户端会从二维码中读取到UUID，并携带APP内的身份信息访问APP端服务器。APP端服务器获取到用户的身份信息后，会与数据库中存储的UUID进行比对，以验证用户的身份。

一旦验证通过，APP端服务器会将用户的ID更新到数据库中对应UUID的记录中。此时，Web服务器就能获取到对应的用户ID，然后生成登录身份信息返回给浏览器，完成用户的登录操作。

整个过程的关键在于二维码的生成和验证。为了确保二维码的安全性，需要使用加密算法对用户的登录信息进行加密，并使用安全的方式生成和存储二维码。同时，为了防止重复使用或恶意扫描，二维码的有效期应该设置得较短，且在一定时间内只能被扫描一次。

此外，为了提高登录的效率和安全性，可以在APP端实现自动登录功能。当用户第一次扫描二维码并登录成功后，可以将该二维码保存下来，以便下次使用时可以直接扫描快速登录，而无需再次输入用户名和密码。

在实际应用中，还可以结合其他的安全措施来提高二维码扫码登录的安全性。例如，可以在用户登录时要求输入手机验证码，以防止被他人恶意扫描；或者在用户登录成功后，对登录设备进行安全检测，以确保设备的安全性。

总之，二维码扫码登录是一种方便、快捷、安全的登录方式。通过解析其技术实现与流程，我们可以更好地理解其工作原理和应用场景。在实际应用中，我们可以结合其他的安全措施来提高二维码扫码登录的安全性，为用户提供更好的服务体验。

---------------------------

一、准备工作
本人申明：本案例使用到的appid和AppSecret都是无效的

测试号信息
appID
wx616f8e948185aa03
appsecret
c87987a8f7d7f8eb3122241ebe35100e

appid：应用唯一标识，在微信开放平台提交应用审核通过后获得
AppSecret：在微信开放平台提交应用审核通过后获得
二、引入地址(有两种引入方式)
1.在根目录html文件引入，既index.html

<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
2.通过js添加节点

const script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
document.body.appendChild(script)

三、在需要使用微信登录的地方实例以下 JS 对象
var obj = new WxLogin({
    self_redirect: false,    //默认为false(保留当前二维码)  true(当前二维码所在的地方通过iframe 内跳转到 redirect_uri)
    id: "login_container",  //容器的id
    appid: "wxa3fdea5a3090f",  //应用唯一标识，在微信开放平台提交应用审核通过后获得
    scope: "snsapi_login",   //应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
    redirect_uri: "https://www.xiang.com/client/index.html",    //扫完码授权成功跳转到的路径
    // state: "",    //用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验
    style: "white",   //提供"black"、"white"可选，默认为黑色文字描述
    href: "data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg=="  //自定义样式链接，第三方可根据实际需求覆盖默认样式
  });
注意事项：

如果二维码出来，但是跳转失败，一定要看看浏览器是否开启了拦截。

href 必须是样式链接/base64格式，转码地址(css文件转码)：https://www.lddgo.net/convert/filebasesix

redirect_uri 重定向的地址必须是白名单地址

这里附上我自己的css文件地址(效果参考页尾)：

data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg==

.loginPanel.normalPanel .title {
  display: none;
}
.qrcode.lightBorder {
  width: 174px;
  height: 174px;
  margin-top: 0;
  box-sizing: border-box;
}
.impowerBox .info {
  display: none;
}
.web_qrcode_type_iframe {
  width: 174px;
}

四、获取 code

授权成功以后当前code会拼接在重定向地址后面列：

https://www.xiang.com//client/index.html?code=021NoBFa1u5ORE0600Ja1dDubb2NoBFT&state=undefined

通过两种方法获取：

window获取
  
window.location.search.substring(6).split('&')[0]

路由监听获取

watch: {
    $route(){
        if(this.$route.query.code!=undefined){
            console.log(this.$route.query.code,this.$route.query.state);
        }
    }
},
五、通过 code 获取access_token
注：这一步可以给后端操作，把获取到的code通过调用接口给予后端，后端拿到数据以后，返回登录状态跟字段，前端也可以获取到所有的状态以后再返回给后端(但是这样没有必要，因为还是要给后端，后端需要筛选字段返回给我们)

https://api.weixin.qq.com/sns/oauth2/access_token?
appid=APPID    应用唯一标识，在微信开放平台提交应用审核通过后获得
&secret=SECRET    应用密钥AppSecret，在微信开放平台提交应用审核通过后获得
&code=CODE    填写第四步获取的 code 参数
&grant_type=authorization_code    填authorization_code
 axios({  
    'url': `https://api.xaing.qq.com/sns/oauth2/access_token?appid=wxa3fdea55b5a3090f&secret=089ba1c53233913f94c0381aa53c1d8e&code=CODE&grant_type=authorization_code`,
    'method': 'get'
  })
正确返回：

{ 
    "access_token":"ACCESS_TOKEN",     //接口调用凭证
    "expires_in":7200,     //access_token接口调用凭证超时时间，单位（秒）
    "refresh_token":"REFRESH_TOKEN",    //用户刷新access_token
    "openid":"OPENID",     //授权用户唯一标识
    "scope":"SCOPE",    //用户授权的作用域，使用逗号（,）分隔
    "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"   //当且仅当该网站应用已获得该用户的 userinfo 授权时，才会出现该字段。
}
最后附上案例：

<!DOCTYPE html>
<html lang="en">
 
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
 
<body>
  <div id="login_container"></div>
</body>
 
<script src="https://downs.yaoulive.com/liveJs/axios.min.js"></script>
<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
  var obj = new WxLogin({
    self_redirect: false,
    id: "login_container",
    appid: "wxa3fdea5a3090f",
    scope: "snsapi_login",
    redirect_uri: "https://www.xiang.com//client/index.html",
    // state: "",
    style: "white",
    href: "data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg=="
  });
 
  // 这一步可以直接调用接口返回给后端code，由后端来进行这一步
  if (window.location.search.substring(6).split('&')[0]) {
    axios({
      'url': `https://mp.weixin.qq.com/debug/?appid=wxa3fdea5a3090f&secret=53233913f94c0381aa53c1d8e&code=${window.location.search.substring(6).split('&')[0]}&grant_type=authorization_code`,
      'method': 'get'
    })
  }
 
 
</script>
 
</html>


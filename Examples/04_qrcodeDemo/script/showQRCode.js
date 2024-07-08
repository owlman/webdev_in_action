import "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"

async function getQRCode() { 
    // 创建一个用于安全认证的二维码
    const cssbase64 = "data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg=="
    const obj = new WxLogin({
        id: "qrcodeContainer" ,  // 设置要加载二维码的容器
                                              // 这里指定的是id为qcodeContainer的div元素
        appid: "wx616f8e948185aa03",  // 设置微信小程序的AppID
                                                           // 这里使用的是微信公众平台的测试号
        scope: "snsapi_base,snsapi_userinfo",  // 设置授权范围
                    // 微信公众平台的测试号，设置为 snsapi_base 或者 snsapi_userinfo即可
                    // 如果是正式申请的小程序，需要设置为 snsapi_login
        state: "1203",  // 设置一个随机数，用于验证登录状态 
        redirect_uri: "https://example.com/wxMessage/index.htm", 
            // 设置扫码认证成功之后，跳转的地址
            // 这里使用的是一个示例地址，实际应用中需要替换为你的服务器地址
        href: cssbase64
    });
}

window.addEventListener('load', async function () {
    const btn = document.querySelector('#showQRCode');
    btn.addEventListener('click', getQRCode);

    // 当扫码认证成功之后，可向后端服务发送数据请求
    if(window.location.search.substring(6).split('&')[0]) {
        const url = 'http://example.com/data?code=' 
                        + window.location.search.substring(6).split('&')[0];
        try {
            const res = await fetch(url, { method: 'GET' });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }    
});

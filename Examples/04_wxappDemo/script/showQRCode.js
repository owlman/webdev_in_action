import "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"

window.addEventListener('load', function () {
    const btn = document.querySelector('#showQRCode');
    btn.addEventListener('click', getQRCode);
});

async function getQRCode() { 
    // 创建一个用于安全认证的二维码
    const obj = new WxLogin({
        id: "qrcodeContainer" ,  // 设置要加载二维码的容器
                                            // 这里指定的是id为qcodeContainer的div元素
        appid: "wx616f8e948185aa03",  // 设置微信小程序的AppID
                                                           // 这里使用的是微信公众平台的测试号
        scope: "snsapi_base,snsapi_userinfo",  // 设置授权范围
                    // 微信公众平台的测试号，设置为 snsapi_base 或者 snsapi_userinfo即可
                    // 如果是正式申请的小程序，需要设置为 snsapi_login
        state: "1203",  // 设置一个随机数，用于验证登录状态 
        redirect_uri: "https://example.com/wxMessage", 
            // 设置扫码认证成功之后，跳转的地址
            // 这里使用的是一个示例地址，实际应用中需要替换为你的服务器地址
    });
    
    // 当扫码认证成功之后，向后端服务发送数据请求
    if(window.location.pathname == '/wxMessage') {
        const url = 'http://127.0.0.1:5500/2%EF%BC%9A%E3%80%8AWeb%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE%E6%95%99%E6%9D%90%E3%80%8B/%E4%B9%A6%E7%A8%BF/Examples/04_wxappDemo/data/data.json';
        try {
            const res = await fetch(url, { method: 'GET' });
            const data = await res.json();
            console.log(data);
       } catch (error) {
            console.error(error);
        }
    }
}
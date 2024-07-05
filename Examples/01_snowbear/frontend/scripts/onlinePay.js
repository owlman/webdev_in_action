import "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
import "../node_modules/art-template/lib/template-web.js"

window.addEventListener('load', async function () {

    // 获取新订单的数据
    const newOrder = JSON.parse(sessionStorage.getItem('newOrder'))

    // 如果已经支付成功，将订单提交给后端并跳转至用户信息页
    if(window.location.search.substring(6).split('&')[0]) {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        // const actionAPI = 'http://snowbear.com/orders/' + userData["uid"];
        // const actionAPI = 'http://localhost//orders/' + userData["uid"];
        try {
            const res = await fetch(actionAPI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            });
           if(res.status === 200) {
                window.alert('下单成功！请点击确定返回用户信息页')
                window.location.href = './userInfo.htm';
            } else if(res.status == 403) {
                window.alert('下单失败，请重新支付！')
                window.location.href = './onlinePay.htm';
            } else {
                window.alert('下单失败，请检查网络是否畅通！')
                window.location.href = './onlinePay.htm';
            }
        } catch (error) {
            this.window.alert(`程序出错！错误信息：${error}`)
            window.location.href = './onlinePay.htm';
        }
    }

    // 如果尚未完成支付，即渲染页面模板
    const tpl = template('orderTemplate', newOrder)
    document.querySelector('#orderMessage').innerHTML = tpl

    // 病创建一个用于模拟支付的二维码
    const cssbase64 = "data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg=="
    const obj = new WxLogin({
        id: "qrcodeContainer" , 
        appid: "wx616f8e948185aa03",  // 这里使用的是微信公众平台的测试号
        scope: "snsapi_base,snsapi_userinfo",  
                // 微信测试号设置为 snsapi_base 或者 snsapi_userinfo即可
        state: "1203",  // 设置一个随机数，用于验证登录状态 
        redirect_uri: "http://snowbear.com/onlinePay.htm", 
        href: cssbase64  // 设置自定义的样式表
    });

});
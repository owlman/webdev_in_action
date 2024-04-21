// 引入用于操作文件路径的Node.js模块
const path = require('path'); 
// 引入 Express.js 框架文件
const express = require('express');
// 创建一个 Express 应用实例
const app = express();
// 设置当前 Web 服务的访问端口 
const port = 3000;

// 创建自定义的路由对象
const router = require('./router');

app.use(express.static(
    // 将 static 目录设置为静态资源目录
    // 该目录可以被前端直接访问，因此用于部署静态网站
    path.join(__dirname, 'static'),
    // 设置静态网站的默认首页
    {index: 'index.htm'}
));

// 在此处新增一行代码，
// 将针对 http://localhost:3000/api/* 这组 URL 的请求交给router处理，
// 请注意：这里的“*”是一个通配符，可用于匹配任意字符串
app.use('/api', router);

// 设置当前服务启动时要监听的端口以及要执行的动作
app.listen(port, () => {
    console.log(`请访问http://localhost:${port}/，按Ctrl+C终止服务！`);
})

module.exports = app;
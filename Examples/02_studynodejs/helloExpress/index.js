// 引入 Express.js 框架文件
const express = require('express');
// 创建一个 Express 应用实例
const app = express();
// 设置当前 Web 服务的访问端口 
const port = 3000;

// 响应客户端对于“/”目录的HTTP GET请求
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

// 设置当前服务启动时要监听的端口以及要执行的动作
app.listen(port, () => {
    console.log(`请访问http://localhost:${port}/，按Ctrl+C终止服务！`);
})

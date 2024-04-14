const http = require('http');
const path = require('path');
const fs = require('fs');

// 引入HTTP API模块
const http_api = require('./httpApi');

// 设置服务器的端口号
const port = 80;
// 设置主机名
const host = `http://localhost:${port}/`;

// 定义静态的资源服务
function staticServer(req, res) {
    const webroot = '/frontend/static';
    fs.readFile(`.${webroot + req.url}`, function (err, data) {
        if (err !== null) {
            res.writeHead(404, {
                'Content-Type': 'text/html, charset=utf-8'
            });
            return res.end('相关页面不存在！');
        }
        res.writeHead(200);
        res.end(data);
    });
}

// 定义 HTTP 请求的路由表
function apiServer(req, res) {
    switch (req.method) {
        case 'GET':
            http_api.getRequest(req, res);
            break;
        case 'POST':
            http_api.postRequest(req, res);
            break;
        case 'PUT':
            http_api.putRequest(req, res);
            break;
        case 'DELETE':
            http_api.deleteRequest(req, res);
            break;
    }
}

// 构建 HTTP 服务
http.createServer(function (req, res) {
    req.url = (req.url == '/' ? '/index.htm' : req.url);
    // 设置服务允许访问的静态资源
    const extNames = [
        '.htm', '.js',
        '.css', '.jpg',
        '.png', '.ico'
    ];
    // 判断前端请求的服务类型
    if (extNames.includes(path.extname(req.url))) {
        staticServer(req, res);
    } else {
        apiServer(req, res);
    }
}).listen(port, function () {
    console.log(`请访问${host}，按Ctrl+C终止服务！`);
});

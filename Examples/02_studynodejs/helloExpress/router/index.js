// 定义用于处理 HTTP 请求的模块
const express = require('express');
// 基于 Express框架的路由模块创建路由器对象
const router = express.Router();

// 定义用于处理 GET 请求的 API
router.get('/', function(req, res) {
    res.send('你发送的是一个 GET 请求');
});

// 定义用于处理 POST 请求的 API
router.post('/', function(req, res) {
    res.send('你发送的是一个 POST 请求');
});

// 定义用于处理 PUT 请求的 API
router.put('/', function(req, res) {
    res.send('你发送的是一个 PUT 请求');
});

// 定义用于处理 DELETE 请求的 API
router.delete('/', function(req, res) {
    res.send('你发送的是一个 DELETE 请求');
});

// 导出路由器模块
module.exports = router;

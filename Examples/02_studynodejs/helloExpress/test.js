// 引入supertest库，并创建一个测试用例
const httpRequest = require('supertest');
// 以模块的方式加载被测试的应用
const app = require('../helloExpress');

// 模拟发送 HTTP GET 请求
httpRequest(app).get(/api/)
.expect(200) // 期望返回的状态码是200
.end(function(err, res){
    if (err) throw err;   // 后端响应·不符合期待时报错
    console.log("你成功发送了一个HTTP GET请求！");
});

// 模拟发送 HTTP POST 请求
httpRequest(app).post(/api/)
.send({ name: '张三', age: 20}) // 发送 JSON 格式的请求数据
.expect(200) // 期望返回的状态码是200
.expect('Content-Type', /json/) // 期望返回的 Content-Type 头是 application/json
.expect({message: '你发送的是一个 POST 请求'}) // 期望返回的数据
.end(function(err, res){
    if (err) throw err; // 后端响应不符合期待时报错
    console.log("你成功发送了一个HTTP POST请求！");    
});

// 模拟发送 HTTP PUT 请求
httpRequest(app).put(/api/)
.send({ name: '张三', age: 24}) // 发送 JSON 格式的请求数据
.expect(200) // 期望返回的状态码是200
.end(function(err, res){
    if (err) throw err; // 后端响应不符合期待时报错
    console.log("你成功发送了一个HTTP PUT请求！");    
});

// 模拟发送 HTTP DELETE 请求
httpRequest(app).delete(/api/)
.expect(200) // 期望返回的状态码是200
.end(function(err, res){
    if (err) throw err; // 后端响应不符合期待时报错
    console.log("你成功发送了一个HTTP DELETE请求！");    
});

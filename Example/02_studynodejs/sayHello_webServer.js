// 用Node.js脚本构建Web服务器

const http = require('http');
const server = http.createServer();

server.on('request', function(req, res){
    res.end('<h1>Hello World!</h1>');
});

server.listen(8080, function(){
    console.log('请访问http://localhost:8080/，按Ctrl+C终止服务！');
});
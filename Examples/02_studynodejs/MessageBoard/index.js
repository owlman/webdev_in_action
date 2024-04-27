const http = require('http');
const response = require('./modules/response');
const port = 8080;

http.createServer(function(req, res) {
  switch(req.method) {
    case 'GET':
      response.getRequest(req, res);
      break;
    case 'POST':
      response.postRequest(req, res);
      break;
  }
})
.listen(port, function(){
  console.log(`请访问http://localhost:${port}/，按Ctrl+C终止服务！`);
});

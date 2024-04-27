const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const serverName = 'mongodb://localhost:27017';
const databaseName = 'MessageBoard';
const databasePath = serverName + '/' + databaseName;
const queryString = require('querystring');
const template = require('art-template');
const cookie = require('./cookie');

// 读取留言板的历史留言：
async function readMessage() {
  try {
    const database = await MongoClient.connect(databasePath);
    const message = await database.collection('message');
    return message.find().toArray();
  } catch(error) {
    return [];
  }
}

// 更新留言板的历史留言
async function writeMessage(data) {
  try {
    const database = await MongoClient.connect(databasePath);
    const message = await database.collection('message');
    await message.insertOne(data);
    return null;
  } catch(err) {
    return err;
  }
}

// 注册留言板的新用户
async function addUser(user) {
  try {
    const database = await MongoClient.connect(databasePath);
    const users = await database.collection('users');
    await users.insertOne(user);
    return null;
  } catch(err) {
    return err;
  }
}

// 判断用户是否有权登录：
async function isLogin(user) {
  try { 
    const database = await MongoClient.connect(databasePath);
    const users = await database.collection('users');
    if(users.count(user) > 0) {
      return true;
    } else {
      return false;
    }
  } catch(error) {
    return false;
  }
}
  
// 处理 GET 请求：
module.exports.getRequest = function(req, res) {
  if(req.url === '/') {
    req.cookies = cookie.parse(req.headers.cookie);
    if(req.cookies.islogin) {
      fs.readFile('./template/message.art', async function(err, data) {
        if(err !== null) {
          res.writeHead(404, {
            'Content-Type': 'text/html, charset=utf-8'
          });
          return res.end('找不到相关页面！');
        }
        const message = await readMessage();
        const strHtml = template.render(data.toString(), {
          'data': message
        });
        res.end(strHtml);
      });
    } else {
      fs.readFile('./template/login.art', function(err, data) {
        if(err !== null) {
          res.writeHead(404, {
            'Content-Type': 'text/html, charset=utf-8'
          });
          return res.end('找不到相关页面！');
        }
        res.end(data.toString());
      });
    }
  } else if(req.url === '/signup') {
    req.cookies = cookie.parse(req.headers.cookie);
    if(req.cookies.islogin) {
      res.writeHead(302, {
       'Location' : '/'
      });
      res.end();
    } else {
        fs.readFile('./template/signup.art', function(err, data) {
          if(err !== null) {
            res.writeHead(404, {
              'Content-Type': 'text/html, charset=utf-8'
            });
            return res.end('找不到相关页面！');
          }
          res.end(data.toString());
        });
    }
  } else if(req.url.indexOf('/public/') === 0) {
    fs.readFile(`.${req.url}`, function(err, data) {
      if ( err !== null ) {
        return res.writeHead(404);
      }
      res.writeHead(200);
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html, charset=utf8'
    });
    res.end('你访问的资源不存在！');
  }
};

// 处理 POST 请求：
module.exports.postRequest = function(req, res) {
  if(req.url === '/login'){
    let formData = "";
    req.on('data', function(chunk) {
      formData += chunk;
    });
    req.on('end', function() {
      const user = queryString.parse(formData.toString());
      if(isLogin(user)) {  // 现在执行用户登录操作不用读取所有用户信息了！
        res.writeHead(302, {
          'Set-Cookie': cookie.serialize({'islogin': 1}),
          'Location': '/'
        });
        res.end();
      } else {
        res.writeHead(302, {
          'Set-Cookie': cookie.serialize({'islogin': 0}),
          'Locaton' : '/'
        });
        res.end();
      }
    });
  } else if(req.url === '/sendMessage') {
    let formData = "";
    req.on('data', function(chunk) {
      formData += chunk;
    });
    req.on('end', async function() {
      const tmp = queryString.parse(formData.toString());
      const message = {
        user : tmp.name,
        message : tmp.message
      };      
      // 现在添加留言也不必先读取之前所有的留言记录了！
      const err = await writeMessage(message);
      if ( err !== null ) {
        res.writeHead(404, {
          'Content-Type': 'text/html, charset=utf-8'
        });
        return res.end('数据没能存储到服务器上！');
      }
      res.writeHead(302, {
        'Location' : '/'
      });
      res.end();
    });
  } else if(req.url === '/adduser') {
    let formData = "";
    req.on('data', function(chunk) {
      formData += chunk;
    });
    req.on('end', async function() {
      const user = queryString.parse(formData.toString());
      const err = await addUser(user);
      if ( err !== null ) {
        res.writeHead(404, {
          'Content-Type': 'text/html, charset=utf-8'
        });
        return res.end('新用户的数据没能存储到服务器上！');
      }
      res.writeHead(302, {
        'Location' : '/'
      });
      res.end();
    });
  }
};

// 引入用户功能模块
const users = require('./users');

// | POST          | `/users/newuser`             | 用于实现新用户注册功能。         |
// | POST          | `/users/session`             | 用于实现用户登录功能。           |
// | GET           | `/users/<用户的ID>`          | 用于实现用户信息查看功能。       |
// | PUT          | `/users/<用户的ID>`          | 用于实现用户信息修改功能。       |
// | DELETE        | `/users/<用户的ID>`          | 用于实现用户信息删除功能。       |

// 发送响应信息
function responseMsg(res, err) {
    res.writeHead(err.status, {
        "Content-Type": "application/json"
    });
    return res.end(err.message);
}

// 判断是否为数字
function isNumeric(n) {  
    return !isNaN(parseFloat(n)) && isFinite(n);  
} 

// 定义 HTTP API 服务
const http_api = {
    // 处理  GET 请求
    getRequest:  async function(req, res) {
        const reqParam = req.url.split('/');
        if(reqParam.length < 1 || reqParam.length > 4) {
            return responseMsg(res, {
                status: 400,
                message: 'request_url_err'
            });
        }        
        if (reqParam[1] === 'users') {
            const userId = reqParam[2];
            if(isNumeric(userId) {
                return await users.getUser(req, res, responseMsg);
            }
        } else {
            responseMsg(res, {
                status: 400,
                message: 'request_url_err'
            });
        }
    },

    // 处理  PUT 请求
    putRequest: async function (req, res) {
        
    },
    
    // 处理  POST 请求
    postRequest: async function (req, res) {
        const reqParam = req.url.split('/');
        if(reqParam.length < 1 || reqParam.length > 4) {
            return responseMsg(res, {
                status: 400,
                message: 'request_url_err'
            });
        }
        
        if (reqParam[1] === 'users') {
            const operator = reqParam[2];
            if(operator === 'newuser') {
                users.userSignUp(req, res, responseMsg);
            } else if(operator === 'session') {
                users.userLogin(req, res, responseMsg);
            }
        } else {
            responseMsg(res, {
                status: 400,
                message: 'request_url_err'
            });
        }
    },

    // 处理  DELETE 请求
    deleteRequest: function (req, res) {
        const reqParam = req.url.split('/');
        if(reqParam.length < 1 || reqParam.length > 4) {
            return responseMsg(res, {
                status: 400,
                message: 'request_url_err'
            });
        }
        
        if (reqParam[1] === 'users') {
            
        } else {
            responseMsg(res, {
                status: 400,
                message: 'request_url_err'
            });
        }
    }
}

module.exports = http_api;

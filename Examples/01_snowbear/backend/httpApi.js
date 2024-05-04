// 要实现的 HTTP API 列表：
// | GET           | `/users/<用户的ID>`          | 用于实现用户信息查看功能。       |
// | POST          | `/users/newuser`             | 用于实现新用户注册功能。         |
// | POST          | `/users/session`             | 用于实现用户登录功能。           |
// | PUT          | `/users/<用户的ID>`          | 用于实现用户信息修改功能。       |
// | DELETE        | `/users/<用户的ID>`          | 用于实现用户信息删除功能。       |

// 引入用户功能模块
const users = require('./users');
// 引入 cookie 模块
const cookie = require('./cookie');

// 发送特定响应状态和消息的函数
function responseMsg(res, msg) {
    res.writeHead(msg.status, {
        "Content-Type": "application/json"
    });
    return res.end(msg.message);
}

// 用于判断字符串内容是否为数字的函数
function isNumeric(str) {  
    return !isNaN(parseFloat(str)) && isFinite(str);  
} 

// 定义 HTTP API 服务
const http_api = {
    // 解析请求 URL
    parseUrl: function(req, res, callback) {
        const reqParam = req.url.split('/');
        if(reqParam.length < 1 || reqParam.length > 4) {
            return responseMsg(res, {
                status: 400,
                message: 'request_url_error'
            });
        }        
        if (reqParam[1] === 'users') {
            if(reqParam[2].length == 0) {
                return responseMsg(res, {
                     status: 400,
                     message: 'request_url_error'
                });
             }
            callback(reqParam[2]);
        } else {
            responseMsg(res, {
                status: 400,
                message: 'request_url_error'
            });
        }
    }, 

    // 处理  GET 请求
    getRequest:  async function(req, res) {
        this.parseUrl(req, res, async function(reqParam) {
            if (isNumeric(reqParam)) {
                // 调用按 ID 查询用户的 API
                const userMsg = await users.getUserById(reqParam);
                // 判断查询结果
                if (userMsg) {
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                    })
                    return res.end(JSON.stringify(userMsg));
                } else {
                    return responseMsg(res, {
                        status: 404,
                        message: 'user_not_found'
                    });
                }
            } else {
                responseMsg(res, {
                    status: 400,
                    message: 'request_url_error'
                })
            }
        });
    },

    // 处理  POST 请求
    postRequest: async function (req, res) {
        this.parseUrl(req, res, async function(reqParam) {
            if (reqParam === 'newuser') {
                // 调用用于实现用户注册的 API
                const result = await users.userSignUp(req);
                console.log(result);
                // 判断注册结果
                if (result) {
                    return responseMsg(res, {
                        status: 200,
                        message: 'user_sign_up_success'
                    });
                } else {
                    return responseMsg(res, {
                        status: 403,
                        message: 'user_sign_up_failed'
                    })
                }
            } else if (reqParam === 'session') {
                // 调用用于实现用户登录的 API
                const result = await users.userLogin(req);
                // 判断登录结果
                if (result) {
                        // 此处以头信息的形式向前端发送 Cookie 数据
                        res.writeHead(200, {
                        'Set-Cookie': cookie.serialize({
                            'userid': result.uid,
                            'islogin': true
                        }),
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify(result));
                } else {
                    return responseMsg(res, {
                        status: 403,
                        message: 'user_login_failed'
                    })
                }
            } else {
                return responseMsg(res, {
                    status: 400,
                    message: 'request_url_error'
                });
            }
        })
    },
    
    // 处理  PUT 请求
    putRequest: async function (req, res) {
        this.parseUrl(req, res, async function(reqParam) {
            if (isNumeric(reqParam)) {
                // 调用用于实现按 ID 修改用户信息的 API
                const result = await users.updateUser(req, reqParam);
                // 判断修改结果
                if (result) {
                    return responseMsg(res, {
                        status: 200,
                        message: 'user_update_success'
                    });
                } else {
                    return responseMsg(res, {
                        status: 403,
                        message: 'user_update_failed'
                    });
                }
            } else {
                responseMsg(res, {
                    status: 400,
                    message: 'request_url_error'
                })
            }
        });    
    },

    // 处理  DELETE 请求
    deleteRequest: function (req, res) {
        this.parseUrl(req, res, async function(reqParam) {
            if (isNumeric(reqParam)) {
                // 调用用于实现按 ID 删除用户的 API
                const result = await users.deleteUser(reqParam);
                // 判断删除结果
                if (result) {
                    return responseMsg(res, {
                        status: 200,
                        message: 'user_delete_success'
                    });
                } else {
                    return responseMsg(res, {
                        status: 403,
                        message: 'user_delete_failed'
                    });
                }
            } else {
                responseMsg(res, {
                    status: 400,
                    message: 'request_url_error'
                })
            }
        });    
    }        
}

module.exports = http_api;

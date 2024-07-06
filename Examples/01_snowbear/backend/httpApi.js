// 要实现的 HTTP API 列表：
// 用户模块部分：
// | 方法 | URL | 功能描述 |
// | GET           | `/users/<用户的ID>`          | 用于实现用户信息查看功能。       |
// | POST          | `/users/newuser`             | 用于实现新用户注册功能。         |
// | POST          | `/users/session`             | 用于实现用户登录功能。           |
// | PUT          | `/users/<用户的ID>`          | 用于实现用户信息修改功能。       |
// | DELETE        | `/users/<用户的ID>`          | 用于实现用户信息删除功能。       |
// 订单模块部分
// | 方法 | URL | 功能描述 |
// | GET           | `/orders/<用户的ID>`          | 用于实现查看指定用户所有订单的功能。|
// | GET          | `/orders/<用户的ID>&<订单号>`    | 用于实现查看指定订单的功能。   |
// | POST          | `/orders/<用户的ID>`          | 用于实现创建新订单的功能。       |
// | DELETE        | `/orders/<用户的ID>&<订单号>`    | 用于实现删除指定订单的功能。   |

// 引入 cookie 模块
const cookie = require('./cookie');
// 引入自定义的 API 模块
const myModule = ["users", "orders"];
const APIs = {};
for( let name of myModule) {
    APIs[name] = require(`./${name}`);
}

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
        if (myModule.includes(reqParam[1])) {
            if(reqParam[2].length == 0) {
                return responseMsg(res, {
                     status: 400,
                     message: 'request_api_error'
                });
             }
            callback(reqParam);
        } else {
            responseMsg(res, {
                status: 404,
                message: 'request_api_not_found'
            });
        }
    }, 

    // 处理  GET 请求
    getRequest:  async function(req, res) {
        this.parseUrl(req, res, async function(reqParam) {
            if (reqParam[1] === 'users' && isNumeric(reqParam[2])) {
                // 调用按 ID 查询用户的 API
                const userMsg = await APIs["users"].getUserById(reqParam[2]);
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
            } else if (reqParam[1] === "orders") {
                if(reqParam[2] === "menu") {
                    // 调用获取菜单的 API
                    const menu = await APIs["orders"].getMenu();
                    // 判断查询结果
                    if (menu) {
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                        })
                        return res.end(JSON.stringify(menu));
                    } else {
                        return responseMsg(res, {
                            status: 404,
                            message: 'menu_not_found'
                        });
                    }
                } else  if (isNumeric(reqParam[2])) {
                    // 调用按 UserID 查询订单的 API
                    const allOrder = await APIs["orders"].getAllByUser(reqParam[2]);
                    // 判断查询结果
                    if (allOrder) {
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                        })
                        return res.end(JSON.stringify(allOrder));
                    } else {
                        return responseMsg(res, {
                            status: 404,
                            message: 'user_order_not_found'
                        });
                    }
                } else {
                    const param = reqParam[2].split('&');
                    if (param.length == 2 && isNumeric(param[0]) && isNumeric(param[1])) {
                        // 调用按 UserID 和订单号查询订单的 API
                        const orderMsg = await APIs["orders"].getOrder(param[0], param[1]);
                        // 判断查询结果
                        if (orderMsg) {
                            res.writeHead(200, {
                                "Content-Type": "application/json",
                            })
                            return res.end(JSON.stringify(orderMsg));
                        } else {
                            return responseMsg(res, {
                                status: 404,
                                message: 'order_not_found'
                            });
                        }
                    }
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
            if (reqParam[1] === 'users' && reqParam[2] === 'newuser') {
                // 调用用于实现用户注册的 API
                const result = await APIs["users"].userSignUp(req);
                /// console.log(result);
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
            } else if (reqParam[1] === 'users' && reqParam[2] === 'session') {
                // 调用用于实现用户登录的 API
                const result = await APIs["users"].userLogin(req);
                // console.log(result);
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
            } else if(reqParam[1] ==="orders" && isNumeric(reqParam[2])) {
                // 调用用于添加新订单的 API
                const result = await APIs["orders"].addOrder(req, reqParam[2]);
                // 判断订单添加结果
                if (result) {
                    return responseMsg(res, {
                        status: 200,
                        message: 'order_add_success'
                    });
                } else {
                    return responseMsg(res, {
                        status: 403,
                        message: 'order_add_failed'
                    });
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
            if (reqParam[1] === 'users' && isNumeric(reqParam[2])) {
                // 调用用于实现按 ID 修改用户信息的 API
                const result = await APIs["users"].updateUser(req, reqParam[2]);
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
            if (reqParam[1] === 'users' && isNumeric(reqParam[2])) {
                // 调用用于实现按 ID 删除用户的 API
                const result = await APIs["users"].deleteUser(reqParam[2]);
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
            } else if (reqParam[1] === "orders") {
                const param = reqParam[2].split('&');
                if (param.length == 2 && isNumeric(param[0]) && isNumeric(param[1])) {
                    // 调用用于实现按 ID 和订单号删除订单的 API
                    const result = await APIs["orders"].deleteOrder(param[0], param[1]);
                    // 判断删除结果
                    if (result) {
                        return responseMsg(res, {
                            status: 200,
                            message: 'order_delete_success'
                        });
                    } else {
                        return responseMsg(res, {
                            status: 403,
                            message: 'order_delete_failed'
                        });
                    }
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

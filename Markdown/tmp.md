    <!-- 待整理资料-第一部分 -->

构建HTTP服务器

首先，我们需要从零开始构建一个提供HTTP服务的Node.js项目，其具体步骤如下：
- 在code目录下创建一个名为05_bookComment的项目目录，并在其中执行npm init -y命令将其初始化为一个Node.js项目。然后在该项目的根目录下创建以下三个子目录：
-	restfulAPI目录：用于存放接下来要实现的RESTful API。
	database目录：本项目选择使用SQLite3数据库，届时数据库文件将存放在该目录下。
	在以上配置工作完成之后，我们就可以在code/05_bookComment目录下创建一个名为index.js的文件，并在其中输入如下代码：
const http = require('http');
const path = require('path');
const fs = require('fs');
const restful_api = require('./restfulAPI');

// 设置服务器的端口号
const port = 3000;
// 设置主机名
const host = `http://localhost:${port}/`;

// 定义 Web 服务
function webServer(req, res) {
    // 留待下一章中来实现
}

// 定义 RESTful 服务
function restfulServer(req, res) {
    switch (req.method) {
        case 'GET':
            restful_api.getRequest(req, res);
            break;
        case 'POST':
            restful_api.postRequest(req, res);
            break;
        case 'DELETE':
            restful_api.deleteRequest(req, res);
            break;
  }
}

// 构建 HTTP 服务
http.createServer(function (req, res) {
    req.url = (req.url == '/' ? '/index.html' : req.url);
    // 设置允许服务的静态资源类型
    const extNames = [
        '.html', '.js',
        '.css', '.jpg',
        '.png', '.ico'
    ];
    // 判断前端请求的服务类型
    if (extNames.includes(path.extname(req.url))) {
        webServer(req, res);
    } else {
        restfulServer(req, res);
    }
}).listen(port, function () {
    console.log(`请访问${host}，按Ctrl+C终止服务！`);
});
在上述服务器的实现代码中，我们将HTTP服务分成了两个部分：第一部分是主要用于响应Web浏览器对HTML页面、CSS样式文件、JavaScript脚本文件以及图片文件等静态资源请求的普通Web服务。这部分服务的具体实现将会留待下一章中来讨论，目前只需要暂时预留个位置即可。第二部分就是我们现在要实现的RESTful服务。正如读者所见，我们在这里先导入了实现了RESTful API的自定义模块，然后根据前端使用的HTTP请求方法调用了该模块中不同的API。接下来，我们的任务就是实现这个名为restfulAPI的自定义模块了。
7.2.2 实现RESTful API
由于本项目选择使用Knex这个库来操作Sqlite3数据库 ，所以在正式开始构建restfulAPI模块之前，我们需要先在项目根目录下执行npm install knex --save命令将Knex库安装到当前项目中。在安装过程中，NPM命令会告诉我们当前安装的Knex库的版本号，以及所对应的sqlite3库的版本号。因为Knex是基于sqlite3这个库来实现的，所以我们还必须为该项目安装相应版本的sqlite3库。例如在笔者这里，当前安装的是0.95.4版本的Knex库，其对应的是5.0.0以上版本的sqlite3库，所以我们要执行npm install sqlite3@^5.0.0 --save命令来安装它。
待一切安装过程顺利完成之后，我们就可以开始构建restfulAPI模块的步骤了。首先在code/05_bookComment/restfulAPI目录下创建一个名为index.js的文件，并在其中输入如下代码：
const path = require('path');
const knex = require('knex');

// 响应错误信息
function responseError(res, err) {
    res.writeHead(err.status, {
        "Content-Type": "application/json"
    });
    return res.end(err.message);
}

// 设置数据库文件路径：
const DBPath = path.join(__dirname, '../database/sqlite3db.sqlite');

// 创建数据库连接对象：
global.DBConnect = knex({
    client: 'sqlite3',
    connection: {
        filename: DBPath
    },
    debug: true, // 在生产环境下可设置为 false
    pool: {
        min: 2,
        max: 7
    },
    useNullAsDefault: true
});

// 处理 GET 请求：
module.exports.getRequest = function (req, res) {
    const reqParam = req.url.split('/');
    if(reqParam.length < 1 || reqParam.length > 4) {
        return responseError(res, {
            status: 400,
            message: 'request_url_err'
        });
    }
    
    if (reqParam[1] === 'users') {
        const users = require('./users');
        users.then(function(api) {
            api.getData(req, res, responseError);
        });
    } else if (reqParam[1] === 'books') {
        const books = require('./books');
        books.then(function(api) {
            if (reqParam[2] === 'list') {
                api.getList(res, responseError);
            } else {
                api.getData(req, res, responseError);
            }
        });
    } else if (reqParam[1] === 'posts') {
        const posts = require('./posts');
        posts.then(function(api) {
            if (reqParam[2] === 'userlist') {
                api.getUserList(req, res, responseError);
            } else if(reqParam[2] === 'booklist') {
                api.getBookList(req, res, responseError);
            } else {
                api.getData(req, res, responseError);
            }
        });
    } else {
        responseError(res, {
            status: 400,
            message: 'request_url_err'
        });
    }
}

// 处理 POST 请求：
module.exports.postRequest = function (req, res) {
    const reqParam = req.url.split('/');
    console.log(reqParam)
    if(reqParam.length < 1 || reqParam.length > 4) {
        return responseError(res, {
            status: 400,
            message: 'request_url_err'
        });
    }

    if (reqParam[1] === 'users') {
        const users = require('./users');
        users.then(function(api) {
            if (reqParam[2] === 'newuser') {
                api.addUser(req, res, responseError);
            } else if (reqParam[2] === 'session') {
                api.login(req, res, responseError);
            } else {
                api.updateData(req, res, responseError);
            }
        });
    } else if (reqParam[1] === 'books') {
        const books = require('./books');
        books.then(function(api) {
            if (reqParam[2] === 'newbook') {
                api.addData(req, res, responseError);
            } else {
                api.updateData(req, res, responseError);
            }
        });
    } else if (reqParam[1] === 'posts') {
        const posts = require('./posts');
        posts.then(function(api) {
            if (reqParam[2] === 'newpost') {
                api.addData(req, res, responseError);
            } else {
                api.updateData(req, res, responseError);
            }
        });
    } else {
        responseError(res, {
            status: 400,
            message: 'request_url_err'
        });
    }
};

// 处理 DELETE 请求：
module.exports.deleteRequest = function (req, res) {
    const reqParam = req.url.split('/');
    if(reqParam.length < 1 || reqParam.length > 3) {
        return responseError(res, {
            status: 400,
            message: 'request_url_err'
        });
    }

    if (reqParam[1] === 'users') {
        const users = require('./users');
        users.then(function(api) {
            api.deleteData(req, res, responseError);
        });
    } else if (reqParam[1] === 'books') {
        const books = require('./books');
        books.then(function(api) {
            api.deleteData(req, res, responseError);
        });
    } else if (reqParam[1] === 'posts') {
        const posts = require('./posts');
        posts.then(function(api) {
            api.deleteData(req, res, responseError);
        });
    } else {
        responseError(res, {
            status: 400,
            message: 'request_url_err'
        });
    }
};
在restfulAPI模块的入口模块中，我们根据本项目要处理的数据将要实现的RESTful API划分成了users、books和posts三个子模块。然后，在根据前端所请求的URI来加载相应的子模块，并调用该子模块提供的API来响应这些请求。接下来的任务就是具体实现用于响应请求的API了。在这里，我们选择从users子模块开始。
为此，我们需要继续在code/05_bookComment/restfulAPI目录下创建一个名为users.js文件，并在其中编写如下代码：
const queryString = require('querystring');
const cookie = require('./cookie');

// 引入数据库连接对象
const sqliteDB = global.DBConnect;

module.exports = new Promise(function (resolve, reject) {
    // 查看数据库中是否已经存在 users 表，如果不存在就创建它
    sqliteDB.schema.hasTable('users')
    .then(function (exists) {
        if (exists == false) {
            // 创建 users 表的字段
            return sqliteDB.schema.createTable('users', function (table) {
                // 将 uid 字段设置为自动增长的字段，并将其设为主键
                table.increments('uid').primary();
                // 将用户名字段设置为字符串类型的字段
                table.string('userName'); 
                // 将密码字段设置为字符串类型的字段
                table.string('password'); 
            })
            .catch(message => responseError(res, {
                status: 500,
                message: message
            }));
        }
    })
    .then(function() {
        // 定义 users 模块的 API
        const users_api = {}

        // 处理用户登录请求
        users_api.login = function (req, res, responseError) {
            let formData = '';
            req.on('data', function (chunk) {
                formData += chunk;
            });
            req.on('end', function () {
                const tmp = queryString.parse(formData.toString());
                if (tmp.user || tmp.passwd) {
                    sqliteDB('users').select('uid')
                    .where('userName', tmp.user)
                    .andWhere('password', tmp.passwd)
                    .then(function (data) {
                        if (data.length == 0) {
                            return responseError(res, {
                                status: 401,
                                message: 'uname_passwd_err'
                            });
                        }
                        res.writeHead(200, {
                            'Set-Cookie': cookie.serialize({
                                'uid': data[0].uid
                            }),
                            "Content-Type": "application/json"
                        });
                        res.end(JSON.stringify(data));
                    })
                    .catch(message => responseError(res, {
                        status: 500,
                        message: message
                    }));
                } else {
                    responseError(res, {
                        status: 400,
                        message: 'login_parameter_err'
                    });
                }
            });
        };

        // 处理用户信息查看请求
        users_api.getData = function (req, res, responseError) {
            const query = req.url.split('/').pop();
            if (isNaN(Number(query)) === false) {
                if (cookie.checkPermission(req, query) == false) {
                    return responseError(res, {
                        status: 401,
                        message: 'premission_err'
                    });
                }
                sqliteDB('users').select('*')
                .where('uid', query)
                .then(function (data) {
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify(data));
                })
                .catch(message => responseError(res, {
                    status: 500,
                    message: message
                }));    
            } else {
                responseError(res, {
                    status: 404,
                    message: 'query_err'
                });
            }
        };

        // 用于处理用户注册请求：
        users_api.addUser = function (req, res, responseError) {
            let formData = '';
            req.on('data', function (chunk) {
                formData += chunk;
            });
            req.on('end', async function () {
                const tmp = queryString.parse(formData.toString());
                const newUser = {
                    userName: tmp.user,
                    password: tmp.passwd
                };
                if (newUser.userName || newUser.password) {
                    const data = await sqliteDB('users')
                        .select('uid').where('userName', newUser.userName);
                    if(data.length > 0) {
                        responseError(res, {
                            status: 403,
                            message: 'uname_exist_err'
                        });
                    } else {
                        sqliteDB('users').insert(newUser)
                        .then(function () {
                            res.writeHead(200, {
                                "Content-Type": "application/json"
                            });
                            res.end('user_added');
                        })
                        .catch(message => responseError(res, {
                            status: 500,
                            message: message
                        }));                
                    }        
                } else {
                    responseError(res, {
                        status: 400,
                        message: 'users_signup_err'
                    });
                }
            });
        };

        // 用于处理用户信息修改请求：
        users_api.updateData = function (req, res, responseError) {
            const query = req.url.split('/').pop();
            if (isNaN(Number(query)) === false) {
                if (cookie.checkPermission(req, query) == false) {
                    return responseError(res, {
                        status: 401,
                        message: 'premission_err'
                    });
                }
                let formData = '';
                req.on('data', function (chunk) {
                    formData += chunk;
                });
                req.on('end', async function () {
                    const tmp = queryString.parse(formData.toString());
                    const newUser = {
                        userName: tmp.user,
                        password: tmp.passwd
                    };
                    if (newUser.userName || newUser.password) {
                        const data = await sqliteDB('users')
                            .select('uid').where('userName',
                                                 newUser.userName);
                        if(data.length > 0 && data[0].uid != query) {
                            responseError(res, {
                                status: 403,
                                message: 'uname_exist_err'
                            });
                        } else {
                            sqliteDB('users').update(newUser)
                            .where('uid', query)
                            .then(function () {
                                res.writeHead(200, {
                                    "Content-Type": "application/json"
                                });
                                res.end('user_updated');
                            })
                            .catch(message => responseError(res, {
                                status: 500,
                                message: message
                            }));
                        }
                    } else {
                        responseError(res, {
                            status: 400,
                            message: 'updata_pram_err'
                       });
                }
                });
            } else {
                responseError(res, {
                    status: 404,
                    message: 'query_err'
                });
            }
        };

        // 用于处理删除用户请求：
        users_api.deleteData = function (req, res, responseError) {
            const query = req.url.split('/').pop();
            if (isNaN(Number(query)) === false) {
                if (cookie.isAdmin(req) === false
                    && cookie.checkPermission(req, query) == false) {
                    return responseError(res, {
                        status: 401,
                        message: 'premission_err'
                    });
                }
                sqliteDB('users').delete()
                .where('uid', query)
                .then(function () {
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.end('user_deleted');
                })
                .catch(message => responseError(res, {
                    status: 500,
                    message: message
                }));    
            } else {
                responseError(res, {
                    status: 404,
                    message: 'query_err'
                });
            }
        };
        resolve(users_api);
    });
});
在上述users子模块中，我们实现了一系列处理用户个人信息的API，它们的具体功能如下：
	login接口：用于响应URI为/users/session的POST请求，实现的是用户登录的功能。
	addUser接口：用于响应URI为/users/newuser的POST请求，实现的是用户注册的功能。
	getData接口：用于响应URI为/users/<用户的ID>的GET请求，实现的是获取用户信息的功能。
	updateData接口：用于响应URI为/users/<用户的ID>的POST请求，实现的是修改用户信息的功能。
	deleteData接口：用于响应URI为/users/<用户的ID>的DELETE请求，实现的是删除用户的功能。
如果想验证上述实现的正确性，我们可以使用curl命令行工具来模拟一下前端对这部分RESTful API的调用，具体过程如下：
# 在以下演示代码中，$ 字符代表命令提示符
# 模拟用户注册
$ curl -d "user=owlman&passwd=12345" http://localhost:3000/users/newuser
user_added

# 模拟用户登录
$ curl -d "user=owlman&passwd=12345" http://localhost:3000/users/session -v
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> POST /users/session HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.55.1
> Accept: */*
> Content-Length: 24 
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 24 out of 24 bytes
< HTTP/1.1 200 OK
< Set-Cookie: uid=1        # 获取到 cookie 信息 
< Content-Type: application/json
< Date: Thu, 29 Apr 2021 04:35:35 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
<
[{"uid":1}] * Connection #0 to host localhost left intact

# 模拟获取用户信息
$ curl --cookie "uid=1" http://localhost:3000/users/1
[{"uid":1,"userName":"owlman","password":"12345"}]

# 模拟修改用户信息
$ curl --cookie "uid=1" -d "user=owlman&passwd=123456789" http://localhost:3000/users/1
user_updated

# 再次模拟用户登录
$ curl -d "user=owlman&passwd=123456789" http://localhost:3000/users/session
[{"uid":1}]

# 模拟删除用户
$ curl --cookie "uid=1" -X DELETE http://localhost:3000/users/1
user_deleted

# 再次模拟用户登录
$ curl -d "user=owlman&passwd=123456789" http://localhost:3000/users/session
uname_passwd_err
需要说明的是，我们在这里选择了使用cookie这种古老的机制来实现用户登录及其身份验证相关的功能，但上述模拟调用也侧面显示了这种解决方案的不安全性 。当前更为流行的解决方案是使用token鉴权机制或第三方提供的OAuth服务。由于后端服务的实现并不是本书的重点，所以我们在这里使用了更便于演示的cookie机制，这部分功能的具体实现如下：
// 将 cookie 解析成 JavaScript 对象：
module.exports.parse = function (cookiesString) {
    let cookies = {};
    if (!cookiesString) {
        return cookies;
    }
    const tmpList = cookiesString.split(';');
    for (let i = 0; i < tmpList.length; ++i) {
        const pair = tmpList[i].split('=');
        cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
};

// 将 JavaScript 对象序列化成 cookie：
module.exports.serialize = function (cookies) {
    const pair = new Array();
    for (const name in cookies) {
        pair.push(`${name}=${cookies[name]}`);
    }
    return pair.join(';');
};

// 用于验证用户是否已经登录：
module.exports.isLogin = function(req) {
    const cookies = this.parse(req.headers.cookie);
    return cookies.isLogin === 'true';
}

// 用于验证用户权限：
module.exports.checkPermission = function (req, query) {
    req.cookies = this.parse(req.headers.cookie);
    return req.cookies.uid === query;
};

// 用于验证管理员权限：
module.exports.isAdmin = function(req) {
    const cookies = this.parse(req.headers.cookie);
    return cookies.uid === '1';
}

接下来。我们只需要继续实现books、posts这两个子模块要提供的API即可。由于这两个子模块的实现方式与users子模块基本相同，主要任务在于使用Knex库来操作数据库并解决Node.js运行环境特有的异步调用问题，我们在这里就不予以重复演示了，读者可以在本书附送代码包中的05_bookComment/restfulAPI目录下找到books.js和posts.js这两个子模块实现文件。在后续章节中，当我们需要演示相关API的具体调用时，还会对它们的部分实现细节进行单独说明。另外需要注意的是，Node.js并不是构建RESTful服务唯一可用的工具。甚至对于有高性能需求的后端服务来说，它恐怕还未必是值得推荐的工具。Python、Go等语言都可以用来实现更高性能的RESTful服务，哪怕是PHP、JSP这样传统的服务器技术，其实也可以用来实现这一服务，只要程序员们在使用这些技术时遵守RESTful架构定义的设计规范即可。


1.	首先在code/otherTest目录中再创建一个名为component_users的目录，并在该目录下创建public和src这两个子目录。
2.	由于component_users实验所需要的依赖项以及目录结构都与component_wp实验相同，为了免除不必要的工作量，节省花费在该实验项目配置工作上的时间，我们可以直接将component_wp目录下的package.json和webpack.config.js这两个分别与依赖项与项目打包相关的配置文件复制到component_users目录下（并根据需要稍作修改），然后在component_users目录下执行npm install命令来安装已经配置在package.json文件中的项目依赖项。
3.	在src目录下创建一个名为userLogin.vue文件，并在其中创建用于定义用户登录界面的组件。具体代码如下：
<template>
    <div id="tab-login">
        <table>
            <tr>
                <td>用户名：</td>
                <td><input type="text" v-model="userName"></td>
            </tr>
            <tr>
                <td>密  码：</td>
                <td><input type="password" v-model="password"></td>
            </tr>
            <tr>
                <td><input type="button"
                           value="登录"
                           @click="login">
                </td>
                <td><input type="button"
                           value="重置"
                           @click="reset">
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        name: "tab-login",
        props : ['value'],
        data: function() {
            return {
                userName: '',
                password: ''
            };
        },
        methods: {
            login: function() {
                if(this.userName !== '' && this.password !== '') {
                    if(this.userName === 'owlman'
                       && this.password === '0000') {
                       this.$emit('input', true);
                    } else {
                        window.alert('用户名或密码错误！');
                        
                    }
                } else {
                    window.alert('用户名与密码都不能为空！');

                }
            },
            reset: function() {
                this.userName = '';
                this.password = '';
            }
        }
};
</script>
4.	在src目录下创建一个名为userSignUp.vue文件，并在其中创建用于定义用户注册界面的组件。具体代码如下：
<template>
    <div id="tab-sign">
        <table>
            <tr>
                <td>请输入用户名：</td>
                <td><input type="text" v-model="userName"></td>
            </tr>
            <tr>
                <td>请设置密码：</td>
                <td><input type="password" v-model="password"></td>
            </tr>
            <tr>
                <td>请重复密码：</td>
                <td><input type="password" v-model="rePassword"></td>
            </tr>
            <tr>
                <td><input type="button"
                           value="注册"
                           @click="signUp">
                </td>
                <td><input type="button"
                           value="重置"
                           @click="reset">
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        name: "tab-sign",
        data() {
            return {
                userName: '',
                password: '',
                rePassword: ''
            };
        },
        methods: {
            signUp: function() {
                if(this.userName !== ''
                   && this.password !== ''
                    && this.rePassword !== '') {
                       if(this.password === this.rePassword) {
                          window.alert('用户注册');
                       } else {
                          window.alert('你两次输入的密码不一致！');
                      }
                } else {
                    window.alert('请正确填写注册信息！');
                }

            },
            reset: function() {
                this.userName = '';
                this.password = '';
                this.rePassword = '';
            }
        }
    };
</script>
5.	在src目录下创建main.js文件，并在实现Vue对象时将上面两个新建的组件注册成局部组件，具体代码如下：
import Vue from 'vue';
import userLogin from './userLogin.vue';
import userSignUp from './userSignUp.vue';

new Vue({
    el: '#app',
    data: {
        componentId: 'login',
        isLogin: false
    },
    components: {
        login: userLogin,
        signup : userSignUp
    }
})
6.	在src目录下创建index.htm文件，并在设计应用程序的用户界面时使用<component>标签指定首先要载入的组件，并用<input>标签在该界面中设置两个用于切换组件的按钮元素，具体代码如下：
<!DOCTYPE html>
<html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                background: black;
                color: floralwhite;
            }
            .box {
                width: 400px;
                height: 300px;
                border-radius: 14px;
                padding: 14px;
                color: black;
                background: floralwhite;
            }
        </style>
        <title>Vue 组件实验（6）：使用动态组件</title>
    </head>
    <body>
       <div id="app" class="box">
            <h1>用户登录</h1>
            <div v-show="!isLogin">
                <input type="button" value="注册新用户"
                    @click="componentId='signup'">
                <input type="button" value="用户登录" 
                    @click="componentId='login'">
                <component :is="componentId"
                    v-model="isLogin"></component>
            </div>
            <div v-show="isLogin">登录成功</div>
        </div>
    </body>
</html>

7.	用浏览器访问public目录下的index.html文件，就可以看到最后的结果了，如图5-3所示：

眼下要做的就是将它们复制过来，并根据需要做一些相应的修改即可。具体来说就是，我们需要先将原本位于code/otherTest/component_users/src目录下的userLogin.vue和userSignUp.vue这两个组件文件复制到code/05_bookComment/webclient/src/components目录下。然后，在code/05_bookComment/webclient/src/views目录下打开Home.vue页面的定义文件，并将其中的代码修改如下：
<template>
    <div class="home">
        <div class="users">
            <input type="button" value="用户登录" 
                :class="['tab-button', { active: componentId === 'login' }]"
                @click="componentId='login'">
            
            <input type="button" value="注册新用户" 
                :class="['tab-button',
                         { active: componentId === 'signup' }]"
                @click="componentId='signup'">
            <keep-alive>
                <component 
                    class="tab" 
                    :is="componentId" 
                    @login="login"
                    @goLogin="goLogin">
                </component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import userLogin from '../components/userLogin.vue';
import userSignUp from '../components/userSignUp.vue';

export default {
    name: 'Home',
    data: function() {
        return {
            componentId: 'login',
        };
    },
    methods: {
        goLogin: function() {
            this.componentId = 'login';
        },
        login: function(userData) {
            // 稍后实现
        },
        logout: function() {
            // 稍后实现
       }
    },
    components: {
        login: userLogin,
        signup : userSignUp
    }
}
</script>
<style scoped>
    @import '../assets/styles/Home.css';
</style>
在上述代码中，我们使用了component动态组件来加载自定义组件。如果读者此时再用浏览器打开应用程序的前端界面，就会看到如图8-3所示的用户界面：
 
图8-3：用户注册与登录界面

正如上一章中所说，RESTful API是需要前端应用通过POST、GET、PUT或DELETE等HTTP请求方法向后端服务发送请求来完成调用的。在当前项目中，我们选择使用axios这个专用的HTTP请求库来完成这方面的任务。axios是一个基于Promise对象来实现的、专用于处理HTTP请求的第三方库 ，该库可以帮助我们轻松实现以下功能：
	在前端应用发送请求时自动将JSON格式的数据自动转换成HTTP请求数据。
	在前端应用接收到响应数据时将HTTP响应数据自动转换成JSON格式数据。
	使用Promise API的链式调用风格来完成HTTP请求及其响应过程中的数据处理。
和其他第三方库一样，在正式开始使用axios库之前，我们需要先在code/05_bookComment/webclient/目录下执行npm install axios --save命令将该库安装到当前项目中，待一切安装完成之后，就可以在相关代码中使用它了。通常情况下，我们只需要使用axios库提供的四个常用方法就足以完成大部针对RESTful API的调用需求了，它们分别是：
	axios.get(url[, config])方法：用于发送GET方法的HTTP请求。
	axios.post(url[, data[, config]])方法：用于发送POST方法的HTTP请求。
	axios.delete(url[, config])方法：用于发送DELETE方法的HTTP请求。
	axios.put(url[, data[, config]])方法：用于发送PUT方法的HTTP请求。
在调用上述方法时，除了url这个用于指定URI的必选实参之外，我们还需要根据发送请求时所要处理的具体情况，通过可选实参提供要发送给后端服务器的数据以及其他相关的配置。例如在当前项目中，我们需要在code/05_bookComment/webclient/src/components目录下打开userLogin.vue组件的定义文件，并将其中的<script>部分修改如下：
import md5 from 'blueimp-md5';
import axios from 'axios';
import Qs from 'qs' ;

// 允许axios发送请求时携带cookie信息
axios.defaults.withCredentials = true;

export default {
    name: "tabLogin",
    data: function() {
        return {
            userName: '',
            password: ''
        };
    },
    methods: {
        login: function() {
            if(this.userName !== '' && this.password !== '') {
                const userData =  {
                    user: this.userName,
                    passwd: md5(this.password)
                }
                const that = this;
                axios.post(`/users/session`, Qs.stringify(userData))
                .then(function(res) {
                    if(res.statusText === 'OK' && 
                        res.data.length == 1) {
                        const user = {
                            isLogin: true,
                            uid: res.data[0].uid
                        }; 
                        that.$emit('login', user);
                    } 
                })
                .catch(function(error) {
                    if(error.message.indexOf('401') !== -1) {
                        window.alert('用户名或密码错误！');
                    }
                })
            } else {
                window.alert('用户名与密码都不能为空！');

            }
        },
        reset: function() {
            this.userName = '';
            this.password = '';
        }
    }
};
同样地，我们也需要在code/05_bookComment/webclient/src/components目录下打开userSignUp.vue组件的定义文件，并其中的<script>部分其修改如下：
import md5 from 'blueimp-md5';
import axios from 'axios';
import Qs from 'qs' ;

export default {
    name: "tab-sign",
    data() {
        return {
            userName: '',
            password: '',
            rePassword: ''
        };
    },
    methods: {
        signUp: function() {
            if(this.userName !== '' &&
                this.password !== '' &&
                this.rePassword !== '') {
                if(this.password === this.rePassword) {
                    const newUser = {
                        user: this.userName,
                        passwd: md5(this.password)
                    }
                    const that = this;
                    axios.post('/users/newuser', Qs.stringify(newUser))
                    .then(function(res) {
                        console.log(res.statusText)
                        if(res.statusText === 'OK') {
                            window.alert('用户注册成功！');
                            that.$emit('goLogin');
                        }
                    })
                    .catch(function(error) {
                        if(error.message.indexOf('403') !== -1) {
                            window.alert('用户名已被占用！');
                        } else if(error.message.indexOf('500') !== -1) {
                            window.alert('服务器故障，请稍后再试！');
                        }
                    });
                } else {
                    window.alert('你两次输入的密码不一致！');
                }
            } else {
                window.alert('请正确填写注册信息！');
            }

        },
        reset: function() {
            this.userName = '';
            this.password = '';
            this.rePassword = '';
        }
    }
};
正如读者所见，我们在上述代码中实现登录与注册功能时使用的是axios.post()方法，除了url实参之外，还提供了一个JSON格式的数据对象实参，用于指定向后端服务器发送POST请求时需要提交的数据。需要注意的是，由于axios库在发送POST请求时是以application/json格式发送数据，这时候后端很可能不会将其识别为表单数据，所以我们需要先使用qs库将JSON数据对象序列化为application/x-www-form-urlencoded表单格式的数据，然后再将其发送给后端。 
另外，出于安全方面的考虑，用户在前端输入的密码数据通常是需要经过加密之后才能发送给后端的。在当前项目中，我们选择使用JavaScript-MD5这个第三方加密库 来完成这方面的任务。所以在执行上述代码之前，我们还需要在code/05_bookComment/webclient/目录下执行npm install blueimp-md5 --save命令将该组件安装到当前项目中。
8.3.3 第三步：前端状态管理
由于HTTP长期以来被认为是一种无状态连接协议，应用程序的后端在默认情况下通常是无法记住前端的用户登录状态的，这意味着一旦页面被浏览器重新请求，用户的登录状态就会被丢失，所以如何维持用户在使用应用程序时的登录状态是我们接下来必须要解决的问题。在基于Vue.js框架的项目中，我们可以利用Vue.js官方团队提供的Vuex组件，并搭配浏览器原本就支持的前端存储机制来实现前端应用的状态管理。同样地，在正式编写相关代码之前，我们需要在code/05_bookComment/webclient/目录下安装以下组件：
	vue-cookies组件：一个用于操作cookies的Vue.js框架插件，可以通过执行npm install vue-cookies --save命令来将该组件安装到当前项目中。
	Vuex组件：Vue.js官方团队提供的、跨组件的状态管理组件，可以通过执行npm install vuex --save命令来将该组件安装到当前项目中。
待一切安装过程顺利完成之后，我们接下来就需要将上述组件注册到Vue应用实例中了。首先是相对简单的vue-cookies组件，具体做法就是在code/05_bookComment/webclient/src目录下打开main.js文件，并将其内容修改如下：
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// 引入 vue-cookies 组件
import vueCookies from 'vue-cookies';
// 将 vue-cookies组件注册到应用程序
Vue.use(vueCookies);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
如果上述代码一切正常，我们就可以在前端应用的其他地方通过调用以下方法来操作cookie了：
	全局配置cookie，设置过期时间和URL：
this.$cookies.config(expireTimes[,path]);
// expireTimes：必选实参，用于指定数据项的过期时间
// path：可选实参，用于指定数据项所在的 URL
// 在默认情况下，expireTimes = 1d , path=/
	添加一个cookie数据项：
this.$cookies.set(keyName, value[, expireTimes[, path[, domain[, secure]]]]);
// keyName：必选实参，用于指定数据项的键名
// value：必选实参，用于指定数据项的键值
// expireTimes：可选实参，用于指定数据项的过期时间
// path：可选实参，用于指定数据项所在的 URL
// domain：可选实参，用于指定数据项所在的 URL
// secure：可选实参，用于指定数据项是否只能以 https 的形式发送。
	获取指定键名的cookie数据项：
this.$cookies.get(keyName);
// keyName：必选实参，用于指定数据项的键名
	删除指定键名的cookie数据项：
this.$cookies.remove(keyName [, path [, domain]]);
// keyName：必选实参，用于指定数据项的键名
// path：可选实参，用于指定数据项所在的 URL
// domain：可选实参，用于指定数据项所在的 URL
	检查键名的cookie数据项是否存在：
this.$cookies.isKey(keyName);
// keyName：必选实参，用于指定数据项的键名
	获取当前浏览器中存储的所有cookie数据项键名：
this.$cookies.keys();
// 返回一个字符串类型的数组，数组的每个元素都是一个数据项的键名
再来是相对复杂一些的Vuex组件，由于该组件是围绕一种被称为store的容器机制来管理应用状态的，所以我们配置它的第一步最好是选择单独创建一个store模块实例。具体做法就是先在code/05_bookComment/webclient/src目录下创建一个名为store的模块目录，然后在该目录下创建一个名为index.js的模块入口文件，并在其中输入以下代码：
import Vue from 'vue'
// 引入 vuex 组件
import Vuex from 'vuex'
// 注册 vuex组件
Vue.use(Vuex)
// 创建 store 模块实例
const store = new Vuex.Store({
    state: {
        user: { 
            isLogin: false,
            uid: ''
        }
    },
    mutations: {
        login (state, userData) {
            state.user.isLogin = userData.isLogin;
            state.user.uid = userData.uid;
            localStorage.isLogin = userData.isLogin;
            localStorage.uid = userData.uid;
        },
        logout (state) {
            localStorage.removeItem('uid');
            localStorage.removeItem('isLogin');
            state.user.isLogin = false;
            state.user.uid = '';
        }
    },
    getters: {
        isLogin: function(state) {
            if(localStorage.isLogin === 'true') {
                state.user.isLogin = localStorage.isLogin;
            }
            return state.user.isLogin;
        },
        getUID: function(state) {
            if(localStorage.isLogin === 'true') {
                state.user.uid = localStorage.uid;
            }
            return state.user.uid;
        }
    }
})

export default store;
接下来，我们同样需要将这个新建的store实例注册到Vue应用实例中，具体做法就是在code/05_bookComment/webclient/src目录下打开main.js文件，并将其内容修改如下：
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vueCookies from 'vue-cookies';
// 引入 store 模块
import store from './store';

Vue.use(vueCookies);
Vue.config.productionTip = false;

new Vue({
    router,
    store, // 注册 store 模块
    render: h => h(App)
}).$mount('#app');
现在，我们就可以在整个前端应用中通过this.$store表达式来应用存储在store实例中的状态了。例如在当前项目中，我们可以将之前的Home.vue页面修改如下：
<template>
    <div class="home">
        <!-- 当用户未登录时，显示如下 div 标签 -->
        <div class="users" v-show="!this.$store.getters.isLogin">
            <input type="button" value="用户登录" 
                :class="['tab-button', { active: componentId === 'login' }]"
                @click="componentId='login'">
            
            <input type="button" value="注册新用户" 
                :class="['tab-button',
                         { active: componentId === 'signup' }]"
                @click="componentId='signup'">
            <keep-alive>
                <component 
                    class="tab" 
                    :is="componentId" 
                    @login="login"
                    @goLogin="goLogin">
                </component>
            </keep-alive>
        </div>
        <!-- 当用户完成登录时，显示如下 div 标签 -->
        <div class="users" v-show="this.$store.getters.isLogin">
            <!-- 显示用户信息 -->
        </div>
    </div>
</template>
<script>
import userLogin from '../components/userLogin.vue';
import userSignUp from '../components/userSignUp.vue';

export default {
    name: 'Home',
    data: function() {
        return {
            componentId: 'login',
        };
    },
    methods: {
        goLogin: function() {
            this.componentId = 'login';
        },
        login: function(userData) {
            this.$cookies.set('uid', userData.uid);
            this.$cookies.set('isLogin', userData.isLogin);
            this.$store.commit('login', userData);
        }
    },
    components: {
        login: userLogin,
        signup : userSignUp
    }
}
</script>
<style scoped>
    @import '../assets/styles/Home.css';
</style>
在这里，读者需要注意引用 store 实例与引用一般性全局对象之间的不同之处：
	store实例的状态存储是响应式的，即当某个Vue组件中的数据与store实例的状态值建立了映射关系之后，只要store实例中的状态发生变化，该组件也会相应地得到高效地更新。
	store实例的状态不能直接修改，改变其状态只能通过显式调用它的commit()方法，以触发Vuex组件特有的mutation消息处理机制来实现，这样做有利于我们日后借助一些外部工具来跟踪应用中每一个状态的变化。
	store实例的getters只读属性需要通过this.$store.getters.[属性名称]的形式来访问。例如在上述代码中，我们就是通过this.$store.getters.isLogin这个表达式来访问用户的登录状态的。
另外，由于我们这一回在component组件中改用触发login事件来获取用户登录状态（而不是原先的v-model指令）了，所以务必还要记得将userLogin.vue组件的login事件函数中this.$emit()方法所触发的事件改为login，具体如下：
login: function() {
    if(this.userName !== '' && this.password !== '') {
        const userData =  {
            user: this.userName,
            passwd: md5(this.password)
        }
        const that = this;
        axios.post(`/users/session`, Qs.stringify(userData))
        .then(function(res) {
            if(res.statusText === 'OK' && 
                res.data.length == 1) {
                const user = {
                    isLogin: true,
                    uid: res.data[0].uid
                }; 
                // 向组件的调用方传递 login 事件
                that.$emit('login', user);
            } 
        })
        .catch(function(error) {
            if(error.message.indexOf('401') !== -1) {
                window.alert('用户名或密码错误！');
            }
        })
    } else {
        window.alert('用户名与密码都不能为空！');

    }
}
8.3.4 第四步：显示用户信息
在用户完成登录之后，我们应该在页面上显示该用户的信息，并允许它执行修改密码，退出登录等操作。所以接下来要做的任务就是在code/05_bookComment/webclient/src/components目录下创建一个名为userMessage.vue的组件文件，并在其中输入如下代码：
<template>
    <div id="userMessage" class="box">
        <h3> 欢迎回来，{{ userName }} </h3>
        <div class="operation">
            <h4> 可执行的操作： </h4>
            <div class="edit" v-show="isUpdate">
                <table>
                    <tr>
                        <td>用户名：</td>
                        <td><input type="text" v-model="userName"></td>
                    </tr>
                    <tr>
                        <td>设置密码：</td>
                        <td><input type="password" v-model="password"></td>
                    </tr>
                    <tr>
                        <td>重复密码：</td>
                        <td><input type="password"
                                   v-model="rePassword"></td>
                    </tr>
                    <tr>
                        <td><input type="button" value="提交"
                                   @click="update"></td>
                        <td><input type="button" value="重置"
                                   @click="reset"></td>
                    </tr>
                </table>
            </div>
            <ul>
                <li><a href="javascript:void(0)" 
                                   @click="isUpdate=!isUpdate">
                    {{ isUpdate? '取消编辑': '编辑信息' }}
                </a></li>
                <li><a href="javascript:void(0)" 
                       @click="logout">退出登录</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
import md5 from 'blueimp-md5';
import axios from 'axios';
import Qs from 'qs' ;

axios.defaults.withCredentials = true;

export default {
    name: 'userMessage',
    data: function() {
        return {
            isUpdate: false,
            userName: '',
            password: '',
            rePassword: ''
        }
    },
    created: function() {
        const that = this;
        axios.get('/users/'+this.$store.getters.getUID)
        .then(function(res) {
            if(res.statusText === 'OK' && 
                res.data.length == 1) {
                that.userName = res.data[0].userName;
            }
        })
        .catch(function(error) {
            if(error.message.indexOf('401') !== -1) {
                window.alert('你没有权限查看该用户！');
            } else if(error.message.indexOf('404') !== -1) {
                window.alert('用户不存在！');
            } else if(error.message.indexOf('500') !== -1) {
                window.alert('服务器故障，请稍后再试！');
            }
        })
    },
    methods: {
        update: function() {
            if(this.userName !== '' &&
                this.password !== '' &&
                this.rePassword !== '') {
                if(this.password === this.rePassword) {
                    const newMessage = {
                        uid: this.$store.getters.getUID,
                        user: this.userName,
                        passwd: md5(this.password)
                    }
                    const that = this;
                    axios.post('/users/'+newMessage.uid, 
                               Qs.stringify(newMessage))
                    .then(function(res) {
                        console.log(res.statusText)
                        if(res.statusText === 'OK') {
                            window.alert('信息修改成功！');
                            that.isUpdate = false;
                        }
                    })
                    .catch(function(error) {
                        if(error.message.indexOf('403') !== -1) {
                            window.alert('用户名已被占用！');
                        } else if(error.message.indexOf('400') !== -1) {
                            window.alert('你没有修改权限！');
                        } else if(error.message.indexOf('500') !== -1) {
                            window.alert('服务器故障，请稍后再试！');
                        }
                    });
                } else {
                    window.alert('你两次输入的密码不一致！');
                }
            } else {
                window.alert('请正确填写注册信息！');
            }

        },
        logout: function() {
            this.$emit('logout');
        },
        reset: function() {
            this.userName = '';
            this.password = '';
            this.rePassword = '';
        }
    }
}
</script>
<style>
    .box {
        width: 95%;
    }
    .box h3 {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 14px;
        border: 1px solid #42b983;
        background: #f0f0f0;
        margin: 0px;
    }
    .box .operation {
        border: 1px solid #42b983;
        padding: 5px;        
    }
</style>
在上述代码中，我们在处理组件的created生命周期事件时调用了axios.get()方法来获取用户信息，该查询会根据我们在登录时获得的用户uid(存储在store实例中)，由于这次调用不需要提供额外的GET请求参数，所以我们在调用axios.get()方法时只需提供用于查询用户信息的RESTful API所在的URI即可。然后，在用户单击“编辑信息”链接时，界面上将会出现修改用户信息的表单，这个表单的处理与用户注册的过程基本相同，只需要在调用axios.post()方法时指定用于修改用户信息的RESTful API所在的URI即可。最后，在用户单击“退出登录”链接时，就会触发userMessage组件的自定义事件，该事件将会注销用户的登录状态，我们在这里选择将事件消息直接传递给该组件的调用方，由后者统一处理用户的登录状态。稍后，我们将会在Home.vue页面中定义该事件的处理函数。
在定义完userMessage组件之后，我们最后要做的就是将它引入到Home.vue文件所定义的用户界面中，并使用v-if指令让其在用户登录成功之后载入到该界面中，具体做法就是将之前的Home.vue文件修改如下：
<template>
    <div class="home">
        <div class="users" v-if="!this.$store.getters.isLogin">
            <input type="button" value="用户登录" 
                :class="['tab-button', { active: componentId === 'login' }]"
                @click="componentId='login'">
            
            <input type="button" value="注册新用户" 
                :class="['tab-button', 
                         { active: componentId === 'signup' }]"
                @click="componentId='signup'">
            <keep-alive>
                <component 
                    class="tab" 
                    :is="componentId" 
                    @login="login"
                    @goLogin="goLogin">
                </component>
            </keep-alive>
        </div>
        <div class="users" v-if="this.$store.getters.isLogin">
            <!-- 加入用户信息的界面元素 -->
            <user-message @logout="logout"></user-message>
        </div>
    </div>
</template>
<script>
import userLogin from '../components/userLogin.vue';
import userSignUp from '../components/userSignUp.vue';
// 引入 userMessage 组件
import userMessage from '../components/userMessage.vue';

export default {
    name: 'Home',
    data: function() {
        return {
            componentId: 'login',
        };
    },
    methods: {
        goLogin: function() {
            this.componentId = 'login';
        },
        login: function(userData) {
            this.$cookies.set('uid', userData.uid);
            this.$cookies.set('isLogin', userData.isLogin);
            this.$store.commit('login', userData);
        },
        // 定义 userMessage 组件的 logout 事件
        logout: function() {
            this.$cookies.remove('uid');
            this.$cookies.remove('isLogin');
            this.$store.commit('logout');
        }
    },
    components: {
        'login': userLogin,
        'signup' : userSignUp,
        'user-message': userMessage  // 引入 userMessage 组件
    }
}
</script>
<style scoped>
    @import '../assets/styles/Home.css';
</style>
在上述代码中，我们用注释的方式标出了新增的内容。具体来说，就是先在Home.vue文件的<script>部分引入之前定义的userMessage组件，并将其注册到Vue应用实例中。然后在Home.vue文件的<template>部分的第二个<div class="users">标签中引入与该组件对应的自定义标签，并设计好相应的样式即可。
当然，正如之前所说，在Home.vue文件中引入userMessage组件的同时，我们还务必要定义一下其logout自定义事件的处理函数，以便对用户的登录状态进行逐一清理，这一步骤是非常必要的，切勿遗漏。




<!-- 待整理资料-第二部分 -- >

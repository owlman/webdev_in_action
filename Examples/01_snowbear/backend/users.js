// 引入用户数据操作模块
const usersDBApi = require('./useUsersDB');

// 创建用户功能模块的对象
const usersApi = {
    // 实现用户注册功能
    userSignUp: async function(req, res, responseMsg) {
        let formData = '';
        req.on('data', function (chunk) {
            formData += chunk;
        });
        req.on('end', function () {
            const tmp = queryString.parse(formData.toString());
            const newUser = {
                userName: tmp.user,
                password: tmp.passwd
            };
            if (newUser.userName || newUser.password) {
                if(usersDBApi.addUser(newUser)) {
                    return responseMsg(res, {
                        status: 200,
                        message: 'success'
                    });
                } else {
                    return responseMsg(res, {
                        status: 400,
                        message: 'user_exist'
                    });
                }
            } else {
                return responseMsg(res, {
                    status: 400,
                    message: 'user_name_or_passwd_err'
                });
            }
        });
    },
    
    // 实现用户登录功能
    userLogin: async function(req, res, responseMsg) {
        let formData = '';
        req.on('data', function (chunk) {
            formData += chunk;
        });
        req.on('end', function () {
            const tmp = queryString.parse(formData.toString());
            const user = {
                userName: tmp.user,
                password: tmp.passwd
            };
            if (user.userName || user.password) {
                const userInfo = await usersDBApi.checkUser(user);
                if(userInfo) {
                    return userInfo;
                } else {
                    return responseMsg(res, {
                        status: 400,
                        message: 'login_err' 
                    };
                }
             } else {
                 return responseMsg(res, {
                     status: 400,
                     message: 'user_name_or_passwd_err'
                 });
            }
        });
    },


    // 实现用户信息查询功能
    getUser: async function(req, res, responseMsg) {
        let formData = '';
        req.on('data', function (chunk) {
            formData += chunk;
        });
        req.on('end', function () {
            
        });
    },

    
    // 实现用户信息修改功能
    updateUser: async function(req, res, responseMsg) {
        let formData = '';
        req.on('data', function (chunk) {
            formData += chunk;
        });
        req.on('end', function () {
            
        });
    },

    
    // 实现用户删除功能
    deleteUser: async function(req, res, responseMsg) {
        let formData = '';
        req.on('data', function (chunk) {
            formData += chunk;
        });
        req.on('end', function () {
            
        });
    }
}

module.exports = usersApi;


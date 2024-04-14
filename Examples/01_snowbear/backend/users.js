const queryString = require('querystring');
// 引入用户数据操作模块
const usersDBApi = require('./useUsersDB');

// 创建用户功能模块的对象
const usersApi = {
    // 用于获取表单数据的函数
    getFormData: async function(req, callback) {
        let formData = '';
        req.on('data', function (chunk) {
            formData += chunk;
        });
        req.on('end', async function () {
            tmp = queryString.parse(formData.toString());
            if(tmp.username == undefined || tmp.password == undefined)
            {
                return false;
            }
            callback(tmp);
        });
    },
    
    // 实现用户注册功能
    userSignUp: async function(req) {
        const that = this;
        return new Promise(async function(resolve, reject) {
            that.getFormData(req, async function(newuser) {
                // console.log(newuser);
                newuser.address = "";
                newuser.phone = "";
                newuser.email = "";
                newuser.avatar = "";
                resolve(await usersDBApi.addUser(newuser));
            });
        })
    },
    
    // 实现用户登录功能
    userLogin: async function(req) {
        const that = this;
        return new Promise(async function(resolve, reject) {    
            await that.getFormData(req, async function(loginData) {
                // console.log(loginData);
                const tmp = await usersDBApi.checkUser(loginData);
                resolve(tmp.length == 0 ? false : tmp);
            }); 
        });
    },


    // 实现按 ID 查询用户的功能
    getUserById: async function(userid) {
        const userinfo = await usersDBApi.getUserById(userid);
        return userinfo.length == 0 ? false : userinfo;
    },

    
    // 实现用户信息修改功能
    updateUser: async function(req, userid) {
        const that = this;
        return new Promise(async function(resolve, reject) {
            that.getFormData(req, async function(userData) {
                // console.log(userData);
                resolve(await usersDBApi.updateUser(userid, userData));
            });
        })
    },

    
    // 实现用户删除功能
    deleteUser: async function(userid) {
        return await usersDBApi.deleteUser(userid);
    }
}

module.exports = usersApi;


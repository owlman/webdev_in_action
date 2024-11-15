// 引入用户数据操作模块
const usersDBApi = require('./useUsersDB');

// 定义一个用于获取表单数据的函数
async function getFormData(req, callback) {
    let formData = '';
    req.on('data', function (chunk) {
        formData += chunk;
    });
    req.on('end', async function () {
        // console.log(formData);
        tmp = JSON.parse(formData);
        callback(tmp);
    });
}

// 创建用户功能模块的对象
const usersApi = {
    // 实现用户注册功能
    userSignUp: async function(req) {
        return new Promise(async function(resolve, reject) {
            return getFormData(req, async function(newuser) {
                if(newuser.username == undefined 
                    || newuser.password == undefined)
                {
                    return resolve(false);
                }    
               console.log(newuser);
                newuser.address = newuser.address || "";
                newuser.phone = newuser.phone || "";
                newuser.email = newuser.email || "";
                newuser.avatar = newuser.avatar || "";
                resolve(await usersDBApi.addUser(newuser));
            });
        })
    },
    
    // 实现用户登录功能
    userLogin: async function(req) {
        return new Promise(async function(resolve, reject) {    
            await getFormData(req, async function(loginData) {
                console.log(loginData);
                if(loginData.username == undefined 
                    || loginData.password == undefined)
                {
                    return resolve(false);
                }
                const tmp = await usersDBApi.checkUser(loginData);
                resolve(tmp.length == 0 ? false : tmp[0]);
            }); 
        });
    },


    // 实现按 ID 查询用户的功能
    getUserById: async function(userid) {
        // console.log(userid);
        const userinfo = await usersDBApi.getUserById(userid);
        return userinfo.length == 0 ? false : userinfo[0];
    },

    
    // 实现用户信息修改功能
    updateUser: async function(req, userid) {
       // console.log(userid);
        return new Promise(async function(resolve, reject) {
            await getFormData(req, async function(userData) {
                // console.log(userData);
                resolve(await usersDBApi.updateUser(userid, userData));
            });
        })
    },

    
    // 实现用户删除功能
    deleteUser: async function(userid) {
        // console.log(userid);
        return await usersDBApi.deleteUser(userid);
    }
}

module.exports = usersApi;
 
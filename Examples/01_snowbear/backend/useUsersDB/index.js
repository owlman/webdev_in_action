// 引入 mongodb 扩展包
const { MongoClient } = require('mongodb');
// 设置数据库所在的服务器连接地址和端口号
const serverUrl = 'mongodb://localhost:27017';
// 设置要使用的数据库名称
const databaseName = 'snowbear_db';
// 设置要使用的数据集名称
const collectName = 'users';
// 创建数据库的连接对象
const client = new MongoClient(serverUrl);

// 创建当前模块要导出的 API 对象
const usersDBApi = {
    // 创建用于打开 user 数据库的 API
    openCollect : async function() {
        try {
            if(typeof this.conn == 'undefined') {
                this.conn = await client.connect();
                console.log('数据库连接成功！' );  
            }
            if(typeof this.collect == 'undefined' || 
                this.collect.collectName !== collectName) {
                    const db = this.conn.db(databaseName);
                    this.collect = await db.collection(collectName);
                }
        } catch(error) {
            console.log('数据库连接错误：' + error);  
        }
    },

    // 创建用于向 user 数据库中添加新用户的 API
    addUser : async function(jsonData) {
        try {
            await this.openCollect(collectName);
            const index = await this.collect.count({}) -1;
            const end = await this.collect.find({}).toArray();
            if(index < 0) {
                jsonData['uid'] = 1;
            } else if(collectName == 'users') {
                jsonData['uid'] = end[index] .uid+ 1;
            } 
            await this.collect.insertOne(jsonData);
            return true;
        } catch(error) {
            console.log('数据插入错误：' + error);  
            return false;
        };
    },
    
    // 创建用于查看 user 数据库中所有数据的 API
    getAllUsers : async function() {
        try {
            await this.openCollect(collectName);
            const result = await this.collect.find({}).toArray();
            return result;
        } catch(error) {
            console.log('数据查询错误：' + error);  
            return false;
        }
    },

    // 创建用于根据指定编号在 user 数据库中查询用户的 API
    getUserById : async function(collectName, id) {
        try {
            await this.openCollect(collectName);
            const result =
                await this.collect.find({['uid'] : Number(id)}).toArray();
            return result;
        } catch(error) {
            console.log('数据查询错误：' + error);  
            return false;
        }
    },

    // 创建用于验证用户是否拥有登录权限的 API
    // 该 API 在用户登录成功时会返回该用户的数据
    checkUser : async function(userData) {
        try {
            await this.openCollect(collectName);
            const result = await this.collect.find(userData).toArray();
            return result;
        } catch(error) {
            console.log('数据查询错误：' + error);  
            return false;
        }
    },

    // 创建用于在数据库中修改指定用户数据的 API
    updateUser : async function(id, jsonData) {
        try {
            await this.openCollect(collectName);
            await this.collect.updateOne({['uid'] : Number(id)}, 
                                                            {$set : jsonData});
            return true;
        } catch(error) {
            console.log('数据修改错误：' + error);  
            return false;
        }
    },

    // 创建用于根据指定编号在 user 数据库中删除用户的 API
    deleteUser : async function(id) {
        try {
            await this.openCollect(collectName);
            await this.collect.deleteOne({['uid'] : Number(id)});
            return true;
        } catch(error) {
            console.log('数据删除错误：'+error);  
            return false;
        }
    },

    // 创建用于清理数据库连接的 API
    clean : async function() {
        try {
            await client.close();
        } catch (error) {
            console.log('数据库关闭错误：'+error);  
        }
    }
}

module.exports = usersDBApi;

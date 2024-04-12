// 引入 mongodb 扩展包
const { MongoClient } = require('mongodb');
// 设置数据库所在的服务器连接地址和端口号
const serverUrl = 'mongodb://localhost:27017';
// 设置要使用的数据库名称
const databaseName = 'testdb';
// 创建数据库的连接对象
const client = new MongoClient(serverUrl);

// 测试数据库是否可用
async function test() {
    try {
        // 打开数据库连接
        await client.connect();
        const db = client.db(databaseName);
        console.log('数据库连接成功！');
        // 创建一个数据集
        const collection = db.collection('user');
        // 向数据集中插入一条数据
        const result = await collection.insertOne({
            name: '张三',
            age: 20,
            gender: '男'
        });
        console.log('插入成功！');
        // 向数据集中插入多条数据
        const result2 = await collection.insertMany([
            {
                name: '李四',
                age: 25,
                gender: '男'
            },
            {
                name: '王五',
                age: 30,
                gender: '男'
            }
        ])
        console.log('插入成功！');
        // 查找数据集中的所有数据
        const result3 = await collection.find().toArray();
        console.log(result3);
        // 查找数据集中的第一条数据
        const result4 = await collection.findOne({
            name: '李四'
        });
        console.log(result4);
        // 更新数据集中的第一条数据
        const result5 = await collection.updateOne({
            name: '李四'
        }, {
            $set: {
                age: 26
            }
        });
        console.log('更新成功！');
        // 删除数据集中的第一条数据
        const result6 = await collection.deleteOne({
            name: '李四'
        });
        console.log('删除成功！');
        // 关闭数据库连接
        await client.close();  
    } catch(error) {
        console.log('数据库连接错误：' + error);  
    } finally {
        // 关闭数据库连接
        await client.close();  
    }
}
test()

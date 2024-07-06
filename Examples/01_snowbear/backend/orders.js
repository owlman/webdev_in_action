const meunData = [
    {
        name: '茉莉花拿铁',
        price: 15
    },
    {
        name: '珍珠奶茶',
        price: 18
    }, 
    {
        name: '卡布奇诺',
        price: 20
    },
    {
        name: '焦糖玛奇朵',
        price: 22
    }
]

const orderData = [
    {
        number: '0001',
        message: '茉莉花拿铁，少冰，大杯',
        date: new Date().toLocaleString(),
        price: 15
    },
    {
        number: '0002',
        message: '珍珠奶茶，少冰，大杯',
        date: new Date().toLocaleString(),
        price: 18
    },
    {
        number: '0003',
        message: '焦糖玛奇朵，少冰，大杯',
        date: new Date().toLocaleString(),
        price: 20
    }
]

// 创建订单功能模块的对象
const ordersApi = {
    // 获取菜单
    getMenu: function () {
        return meunData;
    },
    
    // 获取指定用户的所有订单
    getAllByUser: function (userId) {
        return orderData;
    },

    // 获取指定订单的详细信息
    getOrder: function (userId, orderId) {
        return orderData.find(order => order.number === orderId);
    },
    
    // 添加新订单
    addOrder: function (req,userId) {
        let newOrder = '';
        req.on('data', function (chunk) {
            newOrder += chunk;
        });
        req.on('end', async function () {
            // console.log(newOrder);
            const tmp = JSON.parse(newOrder);
            orderData.push(tmp);
        });
        
        return true;
    },

    // 删除指定订单
    deleteOrder: function (userId, orderId) {
        orderData.splice(orderData.findIndex(order => order.number === orderId), 1);
        return true;
    }
}

module.exports = ordersApi;
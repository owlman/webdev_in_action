import "../node_modules/art-template/lib/template-web.js"

// 此处假设前端脚本从后端获取到如下响应数据;
const data = {
    orderlist: [
        {
            number: '0001',
            message: '茉莉花拿铁，少冰，大杯',
            date: '2022-01-01 10:00:00',
            status: '已结账'
        },
        {
            number: '0002',
            message: '珍珠奶茶，少冰，大杯',
            date: '2022-01-01 10:10:00',
            status: '已结账'
        },
        {
            number: '0003',
            message: '焦糖玛奇朵，少冰，大杯',
            date: '2022-01-01 10:20:00',
            status: '已结账'
        }
    ],
    drinks: [
        {
            name: '茉莉花拿铁',
            price: 20
        },
        {
            name: '珍珠奶茶',
            price: 20
        }, 
        {
            name: '卡布奇诺',
            price: 25
        },
        {
            name: '焦糖玛奇朵',
            price: 25
        }
    ]
};

const templateContent = template('ordertemplate', data);
const orderlist = document.querySelector('#orderlist');
orderlist.innerHTML = templateContent

const orderformtpl = template('orderformtpl', data);
const orderform = document.querySelector('#orderform');
orderform.innerHTML = orderformtpl
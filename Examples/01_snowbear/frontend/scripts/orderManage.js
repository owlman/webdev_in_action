import "../node_modules/art-template/lib/template-web.js"

// 此处假设前端脚本从后端获取到如下响应数据;
const data = {};
data.orderlist =  [
    {
        number: '0001',
        message: '茉莉花拿铁，少冰，大杯',
        date: '2022-01-01 10:00:00',
        price: 15
    },
    {
        number: '0002',
        message: '珍珠奶茶，少冰，大杯',
        date: '2022-01-01 10:10:00',
        price: 18
    },
    {
        number: '0003',
        message: '焦糖玛奇朵，少冰，大杯',
        date: '2022-01-01 10:20:00',
        price: 22
    }
];

data.drinks = [
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

const templateContent = template('ordertemplate', data);
const orderlist = document.querySelector('#orderlist');
orderlist.innerHTML = templateContent

const drinklistTpl = template('drinklistTpl', data);
const drinkList = document.querySelector('#drinkList');
drinkList.innerHTML = drinklistTpl

function isNumeric(value) {
    return /^[+-]?\d+(\.\d+)?$/.test(value);
}

function getSelectItem(selectInput) {
    const index = selectInput.selectedIndex;
    if (index == 0) {
        return false;
    }
    const option = selectInput.options[index];
    return option;
}

const addoder = document.querySelector('#addorder');
addoder.addEventListener('click', function() {
    const form = document.querySelector('#orderForm');
    const drink = getSelectItem(form.drink);
    const size = getSelectItem(form.size);
    const heatlevel = getSelectItem(form.heatlevel);
    if (drink && size && heatlevel) {
        const total =Number(drink.value) 
                        + Number(size.value) 
                        + Number(heatlevel.value);
        const newOrder = {
            number: '000'+Number(data.orderlist.length+1).toString(),
            message: `${drink.text}，${heatlevel.text}，${size.text}`,
            date: new Date().toLocaleString(),
            price: total
        };      
        console.log(newOrder);
        // data.orderlist.push(newOrder);
        sessionStorage.setItem('newOrder', JSON.stringify(newOrder));
        window.location.href = 'onlinePay.htm';
    } else {
        alert('请输入正确的订单选项');
    }
 });
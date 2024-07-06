import "../node_modules/art-template/lib/template-web.js"

// 设置用于 art-template 渲染的全局变量
const data = {};
// 设置网站的域名
// const domain = 'snowbear.com';
// 本地测试用的域名
const domain = 'localhost';
// 获取用户数据
const userData = JSON.parse(sessionStorage.getItem("userData"));

// 用于渲染用户订单列表的函数
async function renderOrderList() {
    // const actionAPI = 'http://snowbear.com/orders/' + userData["uid"];
    // 本地测试用的 URL
    const actionAPI = 'http://localhost/orders/' + userData["uid"];
    try {
        // 获取当前用户所有订单
        const res = await fetch(actionAPI, { method: 'GET' });
        data.orderlist = await res.json();
        // console.log(data.orderlist);
        const templateContent = template('ordertemplate', data);
        const orderlist = document.querySelector('#orderlist');
        orderlist.innerHTML = templateContent;
     } catch (error) {
        throw error;
    }
}

// 用于渲染新订单表单的函数
async function renderNewOrderForm() {
    // 从后端获取产品列表
    const actionAPI = `http://${domain}/orders/menu`;
    try {
        // 获取当前饮料店的菜单
        const res = await fetch(actionAPI, { method: 'GET' });
        data.menuList = await res.json();
        const drinklistTpl = template('drinklistTpl', data);
        const drinkList = document.querySelector('#drinkList');
        drinkList.innerHTML = drinklistTpl;    
    } catch (error) {
        throw error;
    }
}

// 用于显示订单详情的函数
async function showOrderDetail(orderNumber) {
    const actionAPI = `http://${domain}/orders/${userData["uid"]}&${orderNumber}`;
    // console.log(actionAPI);
    try {
        // 获取当前用户所有订单
        const res = await fetch(actionAPI, { method: 'GET' });
        const data = await res.json();
        const outMsg = `订单编号：${data.number}\n订单详情：${data.message}\n订单价格：${data.price}元`;
        window.alert(outMsg);
    } catch (error) {
        throw error;
    }
}

// 用于删除订单的函数
async function deleteOrder(orderNumber) {
    const actionAPI = `http://${domain}/orders/${userData["uid"]}&${orderNumber}`;
    try {
        const res = await fetch(actionAPI, { method: 'DELETE' });
        if (res.status == 200) {
            window.alert('订单删除成功');
        } else {
            window.alert('订单删除失败');
        }
    } catch (error) {
        throw error;
    }
}

// 执行页面渲染操作
window.addEventListener('load', async function() {
    try {
        await renderOrderList();
        await renderNewOrderForm();
        const showDetailBtns = document.querySelectorAll('.showDetail');
        // console.log(showDetailBtns.length);
        for (let btn of showDetailBtns) {
            const orderNumber = btn.getAttribute('order-number');
            btn.addEventListener('click', async function() {
                try {
                    await showOrderDetail(orderNumber)
                } catch (error) {
                    window.alert(`订单详情获取错误：${error}`);
                }
            });
        }
        const deleteOrderBtns = document.querySelectorAll('.deleteOrder');
        for (let btn of deleteOrderBtns) {
            const orderNumber = btn.getAttribute('order-number');
            btn.addEventListener('click', async function() {
                try {
                    await deleteOrder(orderNumber);
                    await renderOrderList();    
                } catch (error) {
                    window.alert(`订单删除错误：${error}`);
                }
            });
        }
    } catch (error) {
        window.alert(`页面渲染错误：${error}`);
    }
})

// 获取下拉菜单中选中的选项
function getSelectItem(selectInput) {
    const index = selectInput.selectedIndex;
    if (index == 0) {
        return false;
    }
    const option = selectInput.options[index];
    return option;
}

// 以下定义用于添加订单的事件函数
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
        sessionStorage.setItem('newOrder', JSON.stringify(newOrder));
        window.location.href = 'onlinePay.htm';
    } else {
        window.alert('请输入正确的订单选项');
    }
 });

// 以第三方扩展的方式导入 art-template 模板引擎
import "../node_modules/art-template/lib/template-web.js"

// 此处假设前端脚本从后端获取到如下响应数据;
const data = {
    name: '张三',
    age: 18,
    gender: '男',    
    hobbies: ['篮球', '足球', '游泳']
};

// template() 方法负责将数据填充到 id =“demo“ 的模板中
// 并返回模板渲染的结果，这里将其保存在 content 变量中
const content = template('demo', data);
// 接下来就只需要将渲染结果显示在 id=“centent”的标记中
const main = document.querySelector('#content');
main.innerHTML = content;
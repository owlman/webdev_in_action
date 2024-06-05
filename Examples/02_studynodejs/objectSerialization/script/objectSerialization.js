 const inputForm = document.querySelector("#demoForm");
const formData  = { // 创建将用于存储表单数据的对象
    "userName": "",
    "userIntro": "",
    "userPhoto": ""
}; 

inputForm.photo.addEventListener("change",  function(event) {
    const file = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.addEventListener('load', function(e) { 
        const base64 = e.target.result; // 获取头像的base64编码
        formData["userPhoto"] = base64; // 将头像的base64编码保存到formData对象中
    });
});

inputForm.addEventListener("submit",  function (event) {
    event.preventDefault();
    formData["userName"] = inputForm.name.value; // 将用户名信息保存到formData对象中
    formData["userIntro"] = inputForm.intro.value; // 将个人简介信息保存到formData对象中

    // 将formData对象转换为JSON字符串
    const jsonString = JSON.stringify(formData);
    console.log(jsonString); // 测试：输出序列化之后的结果
    // 此处省略将序列化结果发送给后端的代码
});
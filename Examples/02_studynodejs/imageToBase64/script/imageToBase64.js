// 使用 FileReader 对象将图像文件读取为 base64 编码的字符串
const input = document.querySelector('#inputImage'); 
input.addEventListener('change', function(event) {
    const file = event.target.files[0]; // 获取用户上传的图像文件
    const reader = new FileReader(); // 创建FileReader对象
    reader.readAsDataURL(file); // 将图像文件读取为base64编码
    reader.addEventListener('load', function(e) { // 读取完成后触发事件
        const base64 = e.target.result; // 获取图像的base64编码
    // console.log(base64); // 测试：在控制台中输出base64编码
        const image = document.querySelector('#outputImage');
        image.src = base64; // 将base64编码设置为图像的src属性
    });
});

// 使用canvas组件将 URL 的图形转换成 base64 编码的字符串
const img = new Image();
const seturl = document.querySelector('#btnGetImage');
seturl.addEventListener('click', function(event) {
    const input = document.querySelector('#inputURL');
    img.src = input.value; // 设置图像的URL
    img.crossOrigin = 'Anonymous'; // 设置跨域请求
});

img.addEventListener('load', function(e) {
    const canvas = document.querySelector('#demoCanvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0); // 将图像绘制到canvas上
    const base64 = canvas.toDataURL('image/png');  // 将图形转换为base64编码
    console.log(base64); // 测试：在控制台中输出base64编码
})
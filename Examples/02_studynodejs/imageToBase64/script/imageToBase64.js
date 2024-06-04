    const input = document.querySelector('inputImage'); 
    inputImage.addEventListener('change', function(event) {
        const file = event.target.files[0]; // 获取用户上传的图像文件
        const reader = new FileReader(); // 创建FileReader对象
        reader.readAsDataURL(file); // 将图像文件读取为base64编码
        reader.addEventListener('load', function(e) { // 读取完成后触发事件
            const base64 = e.target.result; // 获取图像的base64编码
        // console.log(base64); // 测试：在控制台中输出base64编码
            const image = document.querySelector('outputImage');
            image.src = base64; // 将base64编码设置为图像的src属性
        });
    });

// 一些全局设置
const userData = JSON.parse(sessionStorage.getItem("userData"));
const nickname = document.querySelector("#nickname");
nickname.innerText = userData["username"];

// 以下代码用于处理 id="baseinfoForm" 的表单元素
const baseinfoForm = document.querySelector("#baseinfoForm");
// 在昵称设置文本框获得焦点时移除输入提示信息
baseinfoForm.username.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(baseinfoForm, 'checkname');
});
// 在昵称设置文本框失去焦点时检查输入
baseinfoForm.username.addEventListener('blur', function() {
    checkUsername(baseinfoForm);
});
// 在邮箱设置文本框获得焦点时移除输入提示信息
baseinfoForm.email.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(baseinfoForm, 'checkemail');
});
// 在邮箱设置文本框失去焦点时检查输入
baseinfoForm.email.addEventListener('blur', function() {
    checkEmail(baseinfoForm);
});
// 在手机设置文本框获得焦点时移除输入提示信息
baseinfoForm.phone.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(baseinfoForm, 'checkphone');
});
// 在手机号码文本框失去焦点时检查输入
baseinfoForm.phone.addEventListener('blur', function() {
    checkPhone(baseinfoForm);
});
// 在收货地址文本框获得焦点时移除输入提示信息
baseinfoForm.address.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(baseinfoForm, 'checkaddress');
});
// 在收货地址文本框失去焦点时检查输入
baseinfoForm.address.addEventListener('blur', function() {
    checkAddress(baseinfoForm);
});
// 以下代码处理用户上传头像的操作
baseinfoForm.avatar.addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.addEventListener('load', function(e) { // 读取完成后触发
        const base64 = e.target.result; // 获取头像的base64编码
        userData['avatar'] = base64; // 更新用户数据
        baseinfoForm.outputAvatar.src = userData['avatar']; // 更新头像显示
    });
});
// 处理表单提交事件
baseinfoForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    if(baseinfoForm.username.classList.contains('is-invalid') ||
        baseinfoForm.email.classList.contains('is-invalid') ||
        baseinfoForm.phone.classList.contains('is-invalid') ||
        baseinfoForm.address.classList.contains('is-invalid')) {
        // 检查输入是否合法\
        alert('请检查输入是否合法！');
        return;
    }
    userData['username'] = baseinfoForm.username.value;
    userData['email'] = baseinfoForm.email.value;
    userData['phone'] = baseinfoForm.phone.value;
    userData['address'] = baseinfoForm.address.value;
    // 更新用户数据
    const actionAPI = 'http://localhost/users/'+userData['uid'];
    try {
        const res = await fetch(actionAPI, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if(res.status == 200) {
            // 更新成功时的处理逻辑
            window.alert('更新成功！');
            // 刷新当前页面
            window.location.reload();
        } else if(res.status == 403){
            // 更新失败时的处理逻辑
            window.alert('更新失败');
        }
    } catch(error) {
        // 请求出错时的处理逻辑
        window.alert('请求出错');
    }
});

// 以下代码用于处理 id="passwordForm" 的表单元素
const passwordForm = document.querySelector("#passwordForm");
// 在原密码文本框获得焦点时移除输入提示信息
passwordForm.oldPassword.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(passwordForm, 'checkoldPassword');
});
// 在原密码文本框失去焦点时检查输入
passwordForm.oldPassword.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        addHint(passwordForm, 'checkoldPassword', 
            '请先输入你的旧密码！');
    } else if(md5(this.value) !== userData['password']) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        addHint(passwordForm, 'checkoldPassword', 
            '您输入的旧密码与之前不一致！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        removeHint(passwordForm,'checkoldPassword');
        this.classList.add('is-valid');
    }
});
// 在新密码文本框获得焦点时移除输入提示信息
passwordForm.newPassword.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(passwordForm, 'checknewPassword');
});
// 在新密码文本框失去焦点时检查输入
passwordForm.newPassword.addEventListener('blur', function() {
    const tmp = passwordForm;
    tmp.password = passwordForm.newPassword;
    checkPassword(tmp, 'checknewPassword');
});
// 在确认新密码文本框获得焦点时移除输入提示信息
passwordForm.confirmPassword.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(passwordForm, 'checkconfirmPassword');
});
// 在确认新密码文本框失去焦点时检查输入
passwordForm.confirmPassword.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        addHint(passwordForm,'checkconfirmPassword', '请确认您的密码！');
    } else if(this.value !== passwordForm.newPassword.value) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        addHint(passwordForm, 'checkconfirmPassword', 
            '您输入的确认密码与之前不一致！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        removeHint(passwordForm,'checkconfirmPassword');
        this.classList.add('is-valid');
    }
});

// 以下代码用于处理 id="deleteForm" 的表单元素
const deleteForm = document.querySelector("#deleteForm");
// 在密码文本框获得焦点时移除输入提示信息
deleteForm.password.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(deleteForm, 'checkPassword');
});
// 在密码文本框失去焦点时检查输入
deleteForm.password.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        addHint(deleteForm,'checkPassword', '请先输入你的密码！');
    } else if(md5(this.value) !== userData['password']) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        addHint(deleteForm, 'checkPassword', 
            '您输入的密码错误！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        removeHint(deleteForm,'checkPassword');
        this.classList.add('is-valid');
    }
});

// 

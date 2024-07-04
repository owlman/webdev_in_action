import * as formCheck from '../scripts/CommonForm.js';

// 一些全局设置
const userData = JSON.parse(sessionStorage.getItem("userData"));
const nickname = document.querySelector("#nickname");
nickname.innerText = userData["username"];
// 封装用于向后端发送修改数据请求的函数
async function submitUserInfo() { 
     // 先设置HTTP API所在的 URL
     const actionAPI = 'http://localhost/users/'+userData['uid'];
     // 再序列化要提交的数据
     const formData = JSON.stringify(userData);
     try {
         const res = await fetch(actionAPI, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: formData
         });
          return res.status;
     } catch(error) {
         // 请求出错时的处理逻辑
         window.alert('请求出错');
         return 0;
     }  
}

// 以下代码用于处理 id="baseinfoForm" 的表单元素
const baseinfoForm = document.querySelector("#baseinfoForm");
// 当页面在加载时，对 baseinfoForm 表单执行以下初始化操作
window.addEventListener('load', function() {
    baseinfoForm.username.value = userData['username'];
    baseinfoForm.email.value = userData['email'];
    baseinfoForm.phone.value = userData['phone'];
    baseinfoForm.address.value = userData['address'];
    if (userData['avatar'] !== "") {
        baseinfoForm.outputAvatar.src = userData['avatar'];
    }
})
// 在昵称设置文本框获得焦点时移除输入提示信息
baseinfoForm.username.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(baseinfoForm, 'checkname');
});
// 在昵称设置文本框失去焦点时检查输入
baseinfoForm.username.addEventListener('blur', function() {
    formCheck.checkUsername(baseinfoForm);
});
// 在邮箱设置文本框获得焦点时移除输入提示信息
baseinfoForm.email.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(baseinfoForm, 'checkemail');
});
// 在邮箱设置文本框失去焦点时检查输入
baseinfoForm.email.addEventListener('blur', function() {
    formCheck.checkEmail(baseinfoForm);
});
// 在手机设置文本框获得焦点时移除输入提示信息
baseinfoForm.phone.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(baseinfoForm, 'checkphone');
});
// 在手机号码文本框失去焦点时检查输入
baseinfoForm.phone.addEventListener('blur', function() {
    formCheck.checkPhone(baseinfoForm);
});
// 在收货地址文本框获得焦点时移除输入提示信息
baseinfoForm.address.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(baseinfoForm, 'checkaddress');
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
// 处理 baseinfoForm 表单提交事件
baseinfoForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 先检查表单中的输入是否符合规则
    const blured = new Event('blur');
    baseinfoForm.username.dispatchEvent(blured);
    baseinfoForm.email.dispatchEvent(blured);
    baseinfoForm.phone.dispatchEvent(blured);
    baseinfoForm.address.dispatchEvent(blured);
    if(baseinfoForm.username.classList.contains('is-invalid') ||
        baseinfoForm.email.classList.contains('is-invalid') ||
        baseinfoForm.phone.classList.contains('is-invalid') ||
        baseinfoForm.address.classList.contains('is-invalid')) {
        // 当用户输入不符合规则时
        window.alert('请按提示输入正确的信息！');
        return;
    } else if(baseinfoForm.username.value == userData['username'] &&
        baseinfoForm.email.value == userData['email'] &&
        baseinfoForm.phone.value == userData['phone'] &&
        baseinfoForm.address.value == userData['address'] &&
        baseinfoForm.outputAvatar.src == userData['avatar']) {
        // 当用户没有修改任何信息时
        window.alert('您没有修改任何信息！');
        return;
    }

    // 更新用户的数据对象
    userData['username'] = baseinfoForm.username.value;
    userData['email'] = baseinfoForm.email.value;
    userData['phone'] = baseinfoForm.phone.value;
    userData['address'] = baseinfoForm.address.value;
    // 开始提交数据
   const status = await submitUserInfo();
   if(status == 200) {
        // 更新成功时的处理逻辑
        window.alert('用户数据更新成功！');
        // 更新存储在前端的用户数据
        sessionStorage.setItem('userData', 
            JSON.stringify(userData));
        // 刷新当前页面
        window.location.reload();
    } else if(status == 403){
        // 更新失败时的处理逻辑
        window.alert('用户数据更新失败');
    }
});

// 以下代码用于处理 id="passwordForm" 的表单元素
const passwordForm = document.querySelector("#passwordForm");
// 在原密码文本框获得焦点时移除输入提示信息
passwordForm.oldPassword.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(passwordForm, 'checkoldPassword');
});
// 在原密码文本框失去焦点时检查输入
passwordForm.oldPassword.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        formCheck.addHint(passwordForm, 'checkoldPassword', 
            '请先输入你的旧密码！');
    } else if(md5(this.value) !== userData['password']) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        formCheck.addHint(passwordForm, 'checkoldPassword', 
            '您输入的旧密码与之前不一致！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        formCheck.removeHint(passwordForm,'checkoldPassword');
        this.classList.add('is-valid');
    }
});
// 在新密码文本框获得焦点时移除输入提示信息
passwordForm.newPassword.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(passwordForm, 'checknewPassword');
});
// 在新密码文本框失去焦点时检查输入
passwordForm.newPassword.addEventListener('blur', function() {
    const tmp = passwordForm;
    tmp.password = passwordForm.newPassword;
    formCheck.checkPassword(tmp, 'checknewPassword');
});
// 在确认新密码文本框获得焦点时移除输入提示信息
passwordForm.confirmPassword.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(passwordForm, 'checkconfirmPassword');
});
// 在确认新密码文本框失去焦点时检查输入
passwordForm.confirmPassword.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        formCheck.addHint(passwordForm,
            'checkconfirmPassword',  '请确认您的密码！');
    } else if(this.value !== passwordForm.newPassword.value) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        formCheck.addHint(passwordForm, 
            'checkconfirmPassword', '您输入的确认密码与之前不一致！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        formCheck.removeHint(passwordForm,'checkconfirmPassword');
        this.classList.add('is-valid');
    }
});
// 处理 passwordForm 表单提交事件
passwordForm.addEventListener('submit', async function(event) {
    // 阻止表单默认提交行为
    event.preventDefault();
    // 检查表单输入是否符合规则
    const blured = new Event('blur');
    passwordForm.oldPassword.dispatchEvent(blured);
    if (passwordForm.oldPassword.classList.contains('is-invalid')) {
        // 原密码输入不合法时的处理逻辑
        window.alert('请正确输入你的原密码！');
        return;
    } else  {
        passwordForm.newPassword.dispatchEvent(blured);
        passwordForm.confirmPassword.dispatchEvent(blured);
        if (passwordForm.newPassword.classList.contains('is-invalid') ||
            passwordForm.confirmPassword.classList.contains('is-invalid')) {
            // 新密码输入不合法时的处理逻辑
            window.alert('请正确输入并确认你的新密码！');
            return;
        }
    }
    // 更新用户的数据对象
    userData['password'] = md5(passwordForm.newPassword.value);
    // 开始提交数据
    const status = await submitUserInfo()
    if(status == 200) {
        window.alert('密码修改成功！');
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location.reload();
    } else if(status == 403){
        window.alert('密码修改失败');
    }
});

// 以下代码用于处理 id="deleteForm" 的表单元素
const deleteForm = document.querySelector("#deleteForm");
// 在密码文本框获得焦点时移除输入提示信息
deleteForm.password.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    formCheck.removeHint(deleteForm, 'checkPassword');
});
// 在密码文本框失去焦点时检查输入
deleteForm.password.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        formCheck.addHint(deleteForm,
            'checkPassword', '请先输入你的密码！');
    } else if(md5(this.value) !== userData['password']) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        formCheck.addHint(deleteForm, 
            'checkPassword', '您输入的密码错误！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        formCheck.removeHint(deleteForm,
            'checkPassword');
        this.classList.add('is-valid');
    }
});
// 处理 deleteForm 表单提交事件
deleteForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    // 检查密码是否通过验证
    const blured = new Event('blur');
    deleteForm.password.dispatchEvent(blured);
    if(deleteForm.password.classList.contains('is-invalid')) {
        alert('请正确输入你的密码！');
        return;
    }
    
    // 提交表单
    const actionAPI = 'http://localhost/users/'+userData['uid'];
    try {
        const res = await fetch(actionAPI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if(res.status == 200) {
            window.alert('用户注销成功！');
            localStorage.removeItem('userData');
            window.location.href = 'login&signup.htm';
        } else if(res.status == 403){
            window.alert('用户注销失败');
        } 
    } catch(error) {
        // 请求出错时的处理逻辑
        window.alert('请求出错');
    }
}); 

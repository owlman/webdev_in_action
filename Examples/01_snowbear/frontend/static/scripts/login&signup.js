// 以下代码用于处理 id="loginForm" 的表单元素
const loginForm = document.querySelector('#loginForm');
// 在用户名文本框获得焦点时移除输入提示信息
loginForm.username.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(loginForm, 'checkname');
});
// 在用户名文本框失去焦点时检查输入
loginForm.username.addEventListener('blur', function() {
    checkUsername(loginForm);
});
// 在密码文本框获得焦点时移除输入提示信息
loginForm.password.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(loginForm, 'checkpwd');
});
// 在密码文本框失去焦点时检查输入
loginForm.password.addEventListener('blur', function() {
    checkPassword(loginForm);
});
// 提交表单时的处理逻辑
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 检查表单是否通过验证
    if (!loginForm.username.value || !loginForm.password.value) {
        // 用户名或密码为空时的处理逻辑
        checkUsername(loginForm);
        checkPassword(loginForm);
        return;
    }
    // 收集表单数据
    const formData = {
        username: loginForm.username.value,
        password: md5(loginForm.password.value)
    };
    console.log(formData);
    // 发送用户登录请求
    try {
        const res = await fetch(loginForm.action, {
            method: loginForm.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)        
        });
        if(res.status == 200) {
            // 登录成功时的处理逻辑
            const data = await res.json()
            document.cookie = `userid=${data.uid}`;
            // 在此处将后端返回的用户数据序列化
            // 并实现在sessionStorage对象中的持久化存储
            sessionStorage.setItem('userData', JSON.stringify(data));
            window.location.href = '/userinfo.htm';
        } else if(res.status == 403) {
            // 登录失败时的处理逻辑
            window.alert('登录失败');
        }
    } catch(error) {
        // 请求出错时的处理逻辑
        window.alert('请求出错');
    }
})
// 重置表单的处理逻辑
loginForm.addEventListener('reset', function() {
    // 清除表单输入提示
    removeHint(this, 'checkname');
    removeHint(this,'checkpwd');
    // 清除表单验证样式;
    removeValidation(loginForm.username);
    removeValidation(loginForm.password);
    // 重置表单
    loginForm.reset();
})

// 以下代码用于处理 id="signupForm" 的表单元素
const signupForm = document.querySelector('#signupForm');
// 在用户名文本框获得焦点时移除输入提示信息
signupForm.username.addEventListener('foucs', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(signupForm, 'checkname')
});
// 在用户名文本框失去焦点时检查输入
signupForm.username.addEventListener('blur', function() {
    checkUsername(signupForm);
});
// 在密码文本框获得焦点时移除输入提示信息
signupForm.password.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(signupForm, 'checkpwd');
})
// 在密码文本框失去焦点时检查输入
signupForm.password.addEventListener('blur', function() {
    checkPassword(signupForm);
});
// 在用于确认密码的文本框获得焦点时移除输入提示信息
signupForm.confirmpwd.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    this.classList.remove('is-valid');
    removeHint(signupForm, 'confirmpwd');
})
// 在用于确认密码的文本框失去焦点时检查输入
signupForm.confirmpwd.addEventListener('blur', function() {
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        this.classList.add('is-invalid');
        addHint(signupForm,'confirmpwd', '请确认您的密码！');
    } else if(this.value !== signupForm.password.value) {
        // 确认密码与密码不一致时的处理逻辑
        this.classList.add('is-invalid');
        addHint(signupForm, 'confirmpwd', 
            '您输入的确认密码与之前不一致！');
    } else {
        // 确认密码输入合法时的处理逻辑
        this.classList.remove('is-invalid');
        removeHint('confirmpwd');
        this.classList.add('is-valid');
    }
});
// 提交表单时的处理逻辑
signupForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 检查表单是否通过验证
    if (!signupForm.username.value 
        || !signupForm.password.value) {
        // 用户名或密码为空时的处理逻辑
        checkUsername(signupForm);
        checkPassword(signupForm);
        return;
    } else if(signupForm.password.value 
        !== signupForm.confirmpwd.value) {
        // 密码与确认密码不一致时的处理逻辑
        signupForm.confirmpwd.classList.add('is-invalid');
        addHint(signupForm, 'confirmpwd', '密码与确认密码不一致！');
        return;
    }
    // 收集表单数据
    const formData = {
        username: signupForm.username.value,
        password: md5(signupForm.password.value)
    };
    // 发送用户注册请求
    try {
        const res = await fetch(signupForm.action, {
            method: signupForm.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if(res.status == 200) {
            // 注册成功时的处理逻辑
            window.alert('注册成功，请登录！');
            // 刷新当前页面
            window.location.reload();
        } else if(res.status == 403){
            // 注册失败时的处理逻辑
            window.alert('注册失败');
        }
    } catch(error) {
        // 请求出错时的处理逻辑
        window.alert('请求出错');
    }
})
// 重置表单的处理逻辑
signupForm.addEventListener('reset', function() {
    // 清除表单输入提示
    removeHint(this, 'checkname');
    removeHint(this, 'checkpwd');
    removeHint(this, 'confirmpwd');
    // 清除表单验证样式;
    removeValidation(signupForm.username);
    removeValidation(signupForm.password);
    removeValidation(signupForm.confirmpwd);
    // 重置表单
    signupForm.reset();
})

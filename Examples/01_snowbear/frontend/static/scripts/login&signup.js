// 以下代码用于处理 id="loginForm" 的表单元素
const loginForm = document.querySelector('#loginForm');

// 检查用户名的输入
loginForm.username.addEventListener('blur', function() {
    const vmsg = loginForm.querySelector('#checkname');
    if (!this.value) {
        // 用户名为空时的处理逻辑
        vmsg.innerText = '用户名不能为空！';
        vmsg.classList.add('invalid-feedback');
        loginForm.username.classList.add('is-invalid');
    } else if(!/^[a-zA-Z0-9]+$/.test(this.value)) {
        // 用户名包含非法字符时的处理逻辑
        vmsg.innerText = '用户名只能包含字母和数字空！';
        vmsg.classList.add('invalid-feedback');
        loginForm.username.classList.add('is-invalid');;
    } else {
        // 用户名合法时的处理逻辑
        vmsg.innerText = '';
        loginForm.username.classList.remove('is-invalid');
        loginForm.username.classList.add('is-valid');
    }
})

// 检查密码的输入
loginForm.password.addEventListener('blur', function() {
    const vmsg = loginForm.querySelector('#checkpwd');
    if (!this.value) {
        // 密码为空时的处理逻辑
        vmsg.innerText = '密码不能为空！';
        vmsg.classList.add('invalid-feedback');
        loginForm.password.classList.add('is-invalid');
    } else if(this.value.length < 6) {
        // 密码长度小于6时的处理逻辑
        vmsg.innerText = '密码长度不能小于6！';
        vmsg.classList.add('invalid-feedback');
        loginForm.password.classList.add('is-invalid');
    } else {
        // 密码输入合法时的处理逻辑
        vmsg.innerText = '';
        loginForm.password.classList.remove('is-invalid');
        loginForm.password.classList.add('is-valid');
    }
})

// 提交表单时的处理逻辑
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 检查表单是否通过验证
    if (!loginForm.username.value || !loginForm.password.value) {
        // 用户名或密码为空时的处理逻辑
        window.alert('用户名和密码不能为空！');
        return;
    }
    // 收集表单数据
    const formData = {
        username: loginForm.username.value,
        password: loginForm.password.value
    };
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
            window.alert('登录成功');
        } else {
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
    // 清除表单验证信息
    let vmsg = loginForm.querySelector('#checkname');
    vmsg.innerText = '';
    vmsg.classList.remove('invalid-feedback');
    vmsg = loginForm.querySelector('#checkpwd');
    vmsg.innerText = ''
    vmsg.classList.remove('invalid-feedback');
    // 清除表单验证样式;
    loginForm.username.classList.remove('is-valid');
    loginForm.username.classList.remove('is-invalid');
    loginForm.password.classList.remove('is-valid');
    loginForm.password.classList.remove('is-invalid');
    // 重置表单
    loginForm.reset();
    
})

// 以下代码用于处理 id="signupForm" 的表单元素
const signupForm = document.querySelector('#signupForm');

// 检查用户名的输入
signupForm.username.addEventListener('blur', function() {
    const vmsg = signupForm.querySelector('#checkname');
    if (!this.value) {
        // 用户名为空时的处理逻辑
        vmsg.innerText = '用户名不能为空！';
        vmsg.classList.add('invalid-feedback');
        signupForm.username.classList.add('is-invalid');
    } else if(!/^[a-zA-Z0-9]+$/.test(this.value)) {
        // 用户名包含非法字符时的处理逻辑
        vmsg.innerText = '用户名只能包含字母和数字空！';
        vmsg.classList.add('invalid-feedback');
        signupForm.username.classList.add('is-invalid');
    } else {
        // 用户名合法时的处理逻辑
        vmsg.innerText = '';
        signupForm.username.classList.remove('is-invalid');
        signupForm.username.classList.add('is-valid');
    }
})

// 检查密码的输入
signupForm.password.addEventListener('blur', function() {
    const vmsg = signupForm.querySelector('#checkpwd');
    if (!this.value) {
        // 密码为空时的处理逻辑
        vmsg.innerText = '密码不能为空！';
        vmsg.classList.add('invalid-feedback');
        signupForm.password.classList.add('is-invalid');
    } else if(this.value.length < 6) {
        // 密码长度小于6时的处理逻辑
        vmsg.innerText = '密码长度不能小于6！';
        vmsg.classList.add('invalid-feedback');
        signupForm.password.classList.add('is-invalid');
    } else {
        // 密码输入合法时的处理逻辑
        vmsg.innerText = '';
        signupForm.password.classList.remove('is-invalid');
        signupForm.password.classList.add('is-valid');
    }
})

// 检查确认密码的输入
signupForm.confirmpwd.addEventListener('blur', function() {
    const vmsg = signupForm.querySelector('#confirmpwd');
    if (!this.value) {
        // 确认密码为空时的处理逻辑
        vmsg.innerText = '确认密码不能为空！';
        vmsg.classList.add('invalid-feedback');
        signupForm.confirmpwd.classList.add('is-invalid');
    } else if(this.value !== signupForm.password.value) {
        // 确认密码与密码不一致时的处理逻辑
        vmsg.innerText = '确认密码与密码不一致！';
        vmsg.classList.add('invalid-feedback');
        signupForm.confirmpwd.classList.add('is-invalid');
    } else {
        // 确认密码输入合法时的处理逻辑
        vmsg.innerText = '';
        signupForm.confirmpwd.classList.remove('is-invalid');
        signupForm.confirmpwd.classList.add('is-valid');
    }
})

// 提交表单时的处理逻辑
signupForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 检查表单是否通过验证
    if (!signupForm.username.value 
        || !signupForm.password.value 
        || !signupForm.confirmpwd.value) {
        // 用户名或密码为空时的处理逻辑
        window.alert('用户名、密码和确认密码不能为空！');
        return;
    } else if(signupForm.password.value !== signupForm.confirmpwd.value) {
        // 密码与确认密码不一致时的处理逻辑
        window.alert('密码与确认密码不一致！');
        return;
    }

    // 收集表单数据
    const formData = {
        username: signupForm.username.value,
        password: signupForm.password.value
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
            window.alert('注册成功');
        } else {
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
    // 清除表单验证信息
    let vmsg = signupForm.querySelector('#checkname');
    vmsg.innerText = '';
    vmsg.classList.remove('invalid-feedback');
    vmsg = signupForm.querySelector('#checkpwd');
    vmsg.innerText = '';
    vmsg.classList.remove('invalid-feedback');
    vmsg = signupForm.querySelector('#confirmpwd');
    vmsg.innerText = '';
    vmsg.classList.remove('invalid-feedback');
    // 清除表单验证样式;
    signupForm.username.classList.remove('is-valid');
    signupForm.username.classList.remove('is-invalid');
    signupForm.password.classList.remove('is-valid');
    signupForm.password.classList.remove('is-invalid');
    signupForm.confirmpwd.classList.remove('is-valid');
    signupForm.confirmpwd.classList.remove('is-invalid');
})

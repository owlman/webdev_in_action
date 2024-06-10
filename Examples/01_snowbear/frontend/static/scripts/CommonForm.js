// 以下是一些表单的通用处理代码
// 添加输入提示信息
function addHint(form, divid, hintText) {
    const hint = form.querySelector('#' + divid);
    hint.innerHTML = hintText;
    hint.classList.add('invalid-feedback');
}
// 移除输入提示信息
function removeHint(form, divid) {
    const hint = form.querySelector('#' + divid);
    hint.innerHTML = '';
    hint.classList.remove('invalid-feedback');
}
// 移除文本框验证样式
function removeValidation(input) {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
}
// 检查用户名文本框的输入
function checkUsername(form) {
    const inputText = form.username;
    if (!inputText.value) {
        // 用户名为空时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form,'checkname', '用户名不能为空！');
    } else if(!/^[a-zA-Z0-9]+$/.test(inputText.value)) {
        // 用户名包含非法字符时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, 'checkname', '用户名只能包含字母和数字！');
    } else {
        // 用户名合法时的处理逻辑
        inputText.classList.remove('is-invalid');
        removeHint(form, 'checkname');
        inputText.classList.add('is-valid');
    }
}
// 检查密码文本框的输入
function checkPassword(form, hintid) {
    const inputText = form.password;
    if (!inputText.value) {
        // 密码为空时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, hintid, '密码不能为空！');
    } else if(inputText.value.length < 6) {
        // 密码长度小于6时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, hintid, '密码长度不能小于6！');
    } else {
        // 密码输入合法时的处理逻辑
        inputText.classList.remove('is-invalid');
        removeHint(form, hintid);
        inputText.classList.add('is-valid');
    }
}

// 检查电子邮件的输入格式
function checkEmail(form) {
    const inputText = form.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputText.value)) {
        // 电子邮件格式不合法时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, 'checkemail', '电子邮件格式不正确！');
    } else {
        // 电子邮件格式合法时的处理逻辑
        inputText.classList.remove('is-invalid');
        removeHint(form, 'checkemail');
        inputText.classList.add('is-valid');
    }
}

// 检查手机号码的输入格式
function checkPhone(form) {
    const inputText = form.phone;
    if (!/^1[3-9]\d{9}$/.test(inputText.value)) {
        // 手机号码格式不合法时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, 'checkphone', '手机号码格式不正确！');
    } else {
        // 手机号码格式合法时的处理逻辑
        inputText.classList.remove('is-invalid');
        removeHint(form, 'checkphone');
        inputText.classList.add('is-valid');
    }
}

// 检查街道地址的输入格式
function checkAddress(form) {
    const inputText = form.address;
    // 限定地址输入应为汉字加数字
    if (!/^[\u4e00-\u9fa50-9]+$/.test(inputText.value)) {
        // 地址输入不合法时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, 'checkaddress', '地址输入应为汉字加数字！');
    } else {
        // 地址输入合法时的处理逻辑
        inputText.classList.remove('is-invalid');
        removeHint(form, 'checkaddress');
        inputText.classList.add('is-valid');
    }
}

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
function checkPassword(form) {
    const inputText = form.password;
    if (!inputText.value) {
        // 密码为空时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, 'checkpwd', '密码不能为空！');
    } else if(inputText.value.length < 6) {
        // 密码长度小于6时的处理逻辑
        inputText.classList.add('is-invalid');
        addHint(form, 'checkpwd', '密码长度不能小于6！');
    } else {
        // 密码输入合法时的处理逻辑
        inputText.classList.remove('is-invalid');
        removeHint(form, 'checkpwd');
        inputText.classList.add('is-valid');
    }
}

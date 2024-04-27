if(sessionStorage.getItem('newuser') != null) {
  const username = document.querySelector('#name');
  username.value = sessionStorage.getItem('newuser');
}
  
const signupForm = document.querySelector('#signupForm');
signupForm.onsubmit = function() {
  const username = document.querySelector('#name');
  const password = document.querySelector('#pword');
  const password2 = document.querySelector('#pwordAgain');
  if(username.value == '' || password.value == '') {
    alert('用户名和密码不能为空！');
    return false;
  } else if(password.value !== password2.value) {
    sessionStorage.setItem('newuser', username.value);
    alert('你设置的密码不一致！');
    return false;
  }
  return true;
}
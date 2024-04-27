if(sessionStorage.getItem('userid') != null) {
  const userid = document.querySelector('#name');
  userid.value = sessionStorage.getItem('userid');
}

const messageForm = document.querySelector('#messageForm');
messageForm.onsubmit = function() {
  const userid = document.querySelector('#name');
  const message = document.querySelector('#message');
  if(userid.value == '' || message.value == '') {
    alert('昵称或留言信息不能为空！');
    return false;
  }
  sessionStorage.setItem('userid', userid.value);
  return true;
}
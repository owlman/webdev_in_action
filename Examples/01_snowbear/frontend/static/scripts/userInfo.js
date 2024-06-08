const userData = JSON.parse(sessionStorage.getItem("userData"));
const userName = document.querySelector("#userName");
userName.innerText = userData["username"]
console.log(userData);
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let login = document.querySelector("#login");
let err = document.querySelector(".err");

let users = getUser();

login.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

function getUser() {
  let arr = JSON.parse(localStorage.getItem("users")) || [];
  return arr;
}

function validate() {
  users.forEach((user) => {
    console.log(user.email);
    if (
      user.userEmail.toLowerCase() != email.value.toLowerCase() ||
      user.userPassword != password.value
    ) {
      err.innerHTML = "Incorrect Email or Password";
      // window.location.href = "start.html";
    } else if (email.value == "" || password.value == "") {
      err.innerHTML = "Enter Email and Password";
    } else {
      window.location.href = "start.html";
    }
    err.classList.add("show");
  });
  setTimeout(() => {
    err.classList.remove("show");
  }, 2000);
}

let email = document.querySelector("#email");
let password = document.querySelector("#password");
let login = document.querySelector("#login");
let err = document.querySelector(".err");

let users = getUser();

login.addEventListener("submit", (e) => {
  e.preventDefault();
  users.forEach((user) => {
    console.log(user.email);
    if (
      user.userEmail.toLowerCase() == email.value.toLowerCase() &&
      user.userPassword == password.value
    ) {
      window.location.href = "start.html";
    } else {
      validate();
    }
  });
});

function getUser() {
  let arr = JSON.parse(localStorage.getItem("users")) || [];
  return arr;
}

function validate() {
  if (email.value == "" || password.value == "") {
    err.innerHTML = "Enter Email and Password";
  } else {
    err.innerHTML = "Incorrect Email or Password";
  }
  err.classList.add("show");
  setTimeout(() => {
    err.classList.remove("show");
  }, 2000);
}

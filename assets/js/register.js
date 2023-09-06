// ============= NAME VALIDATION ============= //
let form = document.querySelector("form");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let repeatPassword = document.querySelector("#repeat-pass");
let Err = document.querySelectorAll("p.err");

let users = getUsers();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateRepeatPassword()
  ) {
    addUserToLocalStorage();
    window.location.href = "index.html";
  }
});

function validateName() {
  let userName = name.value.trim();
  let validName = /^[A-Za-z]+$/;
  if (userName == "") {
    Err[0].innerHTML = "Name is required";
    Err[0].classList.add("show");
    name.focus();
  } else if (!validName.test(userName)) {
    Err[0].innerHTML = "Name must start with only string";
    Err[0].classList.add("show");
    name.focus();
  } else {
    Err[0].innerHTML = "";
    return true;
  }
  setTimeout(() => {
    Err[0].classList.remove("show");
  }, 2000);
}

function validateEmail() {
  let userEmail = email.value.trim();
  let validEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
  if (userEmail == "") {
    Err[1].innerHTML = "Email is required";
    Err[1].classList.add("show");
    email.focus();
  } else if (!validEmail.test(userEmail)) {
    Err[1].innerHTML = "Please Enter Valid Email";
    Err[1].classList.add("show");
    email.focus();
  } else {
    Err[1].innerHTML = "";
    return true;
  }
  setTimeout(() => {
    Err[1].classList.remove("show");
  }, 2000);
}

function validatePassword() {
  let userPassword = password.value.trim();
  let validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (userPassword == "") {
    Err[2].innerHTML = "Password is required";
    Err[2].classList.add("show");
    password.focus();
  } else if (!validPass.test(userPassword)) {
    Err[2].innerHTML =
      "password must contains at least one uppercase , one lowercase and one number";
    Err[2].classList.add("show");
    password.focus();
  } else {
    Err[2].innerHTML = "";
    return true;
  }
  setTimeout(() => {
    Err[2].classList.remove("show");
  }, 2000);
}

function validateRepeatPassword() {
  let userRepeatPass = repeatPassword.value.trim();
  let validRepeatPass = password.value;
  if (userRepeatPass == "") {
    Err[3].innerHTML = "confirm Password is required";
    Err[3].classList.add("show");
    repeatPassword.focus();
  } else if (userRepeatPass != validRepeatPass) {
    Err[3].innerHTML = "password didn't match";
    Err[3].classList.add("show");
    repeatPassword.focus();
  } else {
    Err[3].innerHTML = "";
    return true;
  }
  setTimeout(() => {
    Err[3].classList.remove("show");
  }, 2000);
}

function addUserToLocalStorage() {
  let user = {
    userName: name.value,
    userEmail: email.value,
    userPassword: password.value,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  let arr = JSON.parse(localStorage.getItem("users")) || [];
  return arr;
}

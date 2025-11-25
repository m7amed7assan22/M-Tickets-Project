const form = document.getElementById("signup_form");
const submitBtn = document.getElementById("submit_btn")

const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const birthdate = document.getElementById("birthdate");
const email = document.getElementById("email_address");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const showPassword = document.getElementById("show_password");

const err_fname = document.getElementById("err_fname");
const err_lname = document.getElementById("err_lname");
const err_email = document.getElementById("err_email");
const err_pass = document.getElementById("err_pass");
const err_confirm = document.getElementById("err_confirm");

showPassword.addEventListener("change", () => {
    const type = showPassword.checked ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;
});

let today = new Date();
let minAllowed = new Date();
minAllowed.setFullYear(today.getFullYear() - 12);
let maxDate = minAllowed.toISOString().split("T")[0];
birthdate.max = maxDate;
birthdate.addEventListener("change", () => {
    if (birthdate.value > maxDate) {
        birthdate.value = "";
    }});

firstName.addEventListener("input", () => {
    if(firstName.value.length < 3 || firstName.value.length > 12) {
        firstName.style.border = "2px solid red";
        err_fname.style.display = "block";
    }
    else {
        firstName.style.border = "none";
        err_fname.style.display = "none";
    }
});

lastName.addEventListener("input", () => {
    if(lastName.value.length < 3 || lastName.value.length > 12) {
        lastName.style.border = "2px solid red";
        err_lname.style.display = "block";
    }
    else {
        lastName.style.border = "none";
        err_lname.style.display = "none";
    }
});

const pattern = /^[^@]+@[^@]+\.com$/;
email.addEventListener("input", () => {
    if (!pattern.test(email.value)) {
        email.style.border = "2px solid red";
        err_email.style.display = "block";
    } else {
        email.style.border = "none";
        err_email.style.display = "none";
    }
});

password.addEventListener("input", () => {
    if (password.value.length < 8 || password.value.length > 16) {
        password.style.border = "2px solid red";
        err_pass.style.display = "block";
    }
    else {
        password.style.border = "none";
        err_pass.style.display = "none";
    }
});

[password,confirmPassword].forEach(input => {
    input.addEventListener("input", () => {
    if(password.value && confirmPassword.value && confirmPassword.value !== password.value){
        confirmPassword.style.border = "2px solid red";
        err_confirm.style.display = "block";
    }
    else {
        confirmPassword.style.border = "none";
        err_confirm.style.display = "none";
    }
});});

[firstName, lastName, email, password, confirmPassword, birthdate].forEach(input => {
    input.addEventListener("input", () => {
        const firstNameValid = firstName.value.length >= 3 && firstName.value.length <= 12;
        const lastNameValid = lastName.value.length >= 3 && lastName.value.length <= 12;
        const birthDateValid = birthdate.value !== "";
        const emailValid = pattern.test(email.value);
        const passwordValid = password.value.length >= 8 && password.value.length <= 16;
        const confirmPasswordValid = password.value === confirmPassword.value && password.value !== "";
        submitBtn.disabled = !(firstNameValid && lastNameValid && birthDateValid && emailValid && passwordValid && confirmPasswordValid);
    });
});
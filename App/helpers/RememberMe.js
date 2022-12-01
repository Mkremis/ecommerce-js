export function lsRememberMe() {
  const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("email"),
    passInput = document.getElementById("password");
  if (rmCheck.checked && emailInput.value !== "") {
    sessionStorage.username = emailInput.value;
    sessionStorage.password = passInput.value;
    sessionStorage.checkbox = rmCheck.value;
  } else {
    sessionStorage.username = "";
    sessionStorage.password = "";
    sessionStorage.checkbox = "";
  }
}

export function UserAgent() {
  const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("email"),
    passInput = document.getElementById("password");
  const logged = USER.getLog();
  console.log(logged);
  if (logged) {
    document.querySelector(".user-panel").classList.toggle("--invisible");
    document.getElementById("loginForm").classList.add("--invisible");
  } else {
    if (document.querySelector(".user-panel"))
      document.querySelector(".user-panel").classList.add("--invisible");
    document.getElementById("loginForm").classList.toggle("--invisible");

    if (sessionStorage.checkbox && sessionStorage.checkbox !== "") {
      rmCheck.setAttribute("checked", "checked");
      emailInput.value = sessionStorage.username;
      passInput.value = sessionStorage.password;
    } else {
      rmCheck.removeAttribute("checked");
      emailInput.value = "";
      passInput.value = "";
    }
  }
}

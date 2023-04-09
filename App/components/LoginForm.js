export function LoginForm() {
  return `
 <!-- The Modal -->
<div id="loginForm" class="modal --invisible">


  <!-- Modal Content -->
  <form class="login-form modal-content animate">
    <span onclick="document.getElementById('loginForm').classList.toggle('--invisible')"
class="close" title="Close Modal">&times;</span>
    <div class="imgcontainer">
      <img src="/ecommerce-js/images/not-logged.svg" alt="Avatar" class="avatar">
    </div>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username: silverladybug306" name="uname" id="email" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password: willy1" name="psw" id="password" required>

      <button id="login" class="login-submit" type="submit">Login</button>
      <label>
        <input type="checkbox" value="lsRememberMe" id="rememberMe"> Remember me
      </label>
    </div>
    <div class="cancel-container">
      <button type="button" onclick="document.getElementById('loginForm').classList.toggle('--invisible')" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>
</div>
  `;
}

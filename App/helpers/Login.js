import { CartManager } from "../components/ShoppingCart.js";
import { UserData } from "../test/FakeUser.js";
import { User } from "../User.js";

export function Login(FormData) {
  let { uname, psw } = Object.fromEntries(FormData);
  if (uname === UserData.login.username && psw === UserData.login.password) {
    document.getElementById("loginForm").classList.add("--invisible");
    const unloggedCart = USER.cart;
    USER = new User({
      cart: unloggedCart || null,
      user: UserData,
      logged: true,
    });
    document.querySelector(".header__user-avatar").src =
      USER.user.picture.thumbnail;
    CartManager();
    USER.userPanel();
    sessionStorage.setItem("username", UserData.login.username);
  }
}

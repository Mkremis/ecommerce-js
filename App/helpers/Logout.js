import { CartManager } from "../components/ShoppingCart.js";
import { urlRoute } from "../urlRoute.js";
import { User } from "../User.js";

export function Logout() {
  USER = new User({
    cart: null,
    user: {},
    logged: false,
  });
  CartManager();
  document.querySelector(".header__user").src =
    "/eCommerce-SPA/images/not-logged.svg";
  urlRoute((window.location.href = ""));
  // UserAgent();
  // window.sessionStorage.clear();
}

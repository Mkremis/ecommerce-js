import { User } from "./User.js";
import { urlRoute } from "./urlRoute.js";
import { Loader } from "./components/Loader.js";
import { sortFiltMob } from "./components/SortFilterMob.js";
import { filterMobile } from "./components/FilterMobile.js";
import { cartModal } from "./components/cartModal.js";
import { LoginForm } from "./components/LoginForm.js";
import { TopButton } from "./components/topBtn.js";
import { infiniteScroll } from "./helpers/InfiniteScroll.js";
import { AutoComplete } from "./helpers/AutoComplete.js";
import { CartManager } from "./components/ShoppingCart.js";
import { urlHandler } from "./urlHandler.js";
import { EVENTS } from "./helpers/EventRoutes.js";
import { FilterMenu } from "./components/FilterMenu.js";
import { FilterChk } from "./components/FilterChk.js";
import { Filter } from "./helpers/Filter.js";
import { Login } from "./helpers/Login.js";

document.addEventListener("DOMContentLoaded", (e) => {
  window.USER = new User({
    cart: null,
    user: {},
    logged: false
  });
  window.product;
  // window.route = urlRoute;
  Loader();
  const $main = document.querySelector(".main-container"),
    $aside = document.getElementById("nav-bar__aside");
  $main.insertAdjacentHTML("afterbegin", sortFiltMob());
  $main.insertAdjacentHTML("afterbegin", filterMobile());
  const $filter = document.querySelector(".filter__mobile__background"),
    $SFmenu = document.querySelector(".sort-filter__mobile");
  $aside.after($SFmenu, $filter);
  document.querySelector(".main-container").innerHTML += cartModal();
  document.querySelector(".main-container").innerHTML += LoginForm();
  document.querySelector(".main-container").appendChild(TopButton());
  infiniteScroll();
  AutoComplete();
  CartManager();
  urlHandler();
});
window.addEventListener("popstate", (e) => {
  urlHandler();
});
document.addEventListener("click", (e) => {
  const CLASS_TARGET = e.target.classList[0];
  let classEvents = Object.keys(EVENTS).find(
    (selector) => selector === CLASS_TARGET
  );

  if (classEvents) {
    EVENTS[CLASS_TARGET].action(CLASS_TARGET, e.target, e);
  } else if (
    e.target.matches(".navbar__link") ||
    e.target.matches(".modal-navbar__link") ||
    e.target.matches(".category__link") ||
    e.target.matches(".category__link__Mob") ||
    e.target.matches(".WM-product-header") ||
    e.target.matches(".M-product-header")
  ) {
    if (e.target.dataset.id)
      localStorage.setItem("category", e.target.dataset.id);
    if (e.target.value) e.target.href = e.target.value;
    sessionStorage.removeItem("filter");
    sessionStorage.removeItem("menufilter");
    urlRoute(e);
  } else if (
    e.target.matches(".product>figure *") ||
    e.target.matches(".home-product>figure *") ||
    e.target.matches(".cart-modal__item *")
  ) {
    e.target.href = "/checkout";
    localStorage.setItem("category", e.target.parentNode.dataset.id);
    urlRoute(e);
  } else if (e.target.matches(".filter-menu")) {
    document.querySelector(".filter-clear").style.visibility = "hidden";
    FilterMenu(product, e.target.id);
    FilterChk();
  } else if (e.target.matches(".filter-sub_menu")) {
    if (e.target.checked) {
      Filter(e.target);
    } else {
      let filter = sessionStorage.getItem("filter"),
        updatedFilter = filter.replace(e.target.value, "");
      sessionStorage.setItem("filter", updatedFilter);
      let menufilter = JSON.parse(sessionStorage.getItem("menufilter"));
      let updatedMenu = menufilter.filter(
        (obj) => obj[e.target.dataset.parentid] !== e.target.name
      );
      sessionStorage.setItem("menufilter", JSON.stringify(updatedMenu));
    }
  } else if (
    e.target.matches(".filter_selection") ||
    e.target.matches(".filter_selection *")
  ) {
    document.getElementById("content").innerHTML = null;
    urlRoute(window.location.pathname);
    document
      .querySelector(".filter__mobile__background")
      .classList.toggle("--invisible");
  } else if (
    e.target.matches(".filter-clear") ||
    e.target.matches(".filter-clear *")
  ) {
    document.getElementById("content").innerHTML = null;
    sessionStorage.removeItem("filter");
    sessionStorage.removeItem("menufilter");
    FilterMenu(product, "menu");
    urlRoute(window.location.pathname);
    document
      .querySelector(".filter__mobile__background")
      .classList.toggle("--invisible");
  } else if (e.target.matches(".details a>strong")) {
    e.preventDefault();
    let link = `https://www.asos.com/${e.target.parentNode.href}`;
    window.open(link, "_blank");
  } else if (
    e.target.matches(".details__button") ||
    e.target.matches(".details__button *")
  ) {
    const newItem = {
      [product.id]: {
        prodName: product.name,
        prodImage: product.media.images[0].url,
        prodPrice: product.price.current.value,
        prodQ: parseInt(document.querySelector(".input__number").value)
      }
    };
    document.querySelector(".header__cart-img").style.animation = "shake 0.5s";
    USER.setCart(newItem);
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches(".login-form")) Login(new FormData(e.target));
  if (e.target.matches(".user-account__form")) User.updateUser(e.target);
});

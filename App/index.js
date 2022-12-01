import { User } from "./User.js";
import { Loader } from "./components/Loader.js";
import { urlRoute } from "./urlRoute.js";
import { AutoComplete } from "./helpers/AutoComplete.js";
import { sortFiltMob } from "./components/SortFilterMob.js";
import { filterMobile } from "./components/FilterMobile.js";
import { cartModal } from "./components/cartModal.js";
import { LoginForm } from "./components/LoginForm.js";
import { CartManager } from "./components/ShoppingCart.js";
import { urlHandler } from "./urlHandler.js";
import { EVENTS } from "./helpers/EventRoutes.js";
import { FilterMenu } from "./components/FilterMenu.js";
import { FilterChk } from "./components/FilterChk.js";
import { Filter } from "./helpers/Filter.js";
import { Login } from "./helpers/Login.js";

document.addEventListener("DOMContentLoaded", (e) => {
  window.product;
  AutoComplete();
  const $main = document.querySelector(".main-container"),
    $aside = document.getElementById("nav-bar__aside");
  $main.insertAdjacentHTML("afterbegin", sortFiltMob());
  $main.insertAdjacentHTML("afterbegin", filterMobile());
  const $filter = document.querySelector(".filter__mobile__background"),
    $SFmenu = document.querySelector(".sort-filter__mobile");
  $aside.after($SFmenu, $filter);
  window.USER = new User({
    cart: null,
    user: {},
    logged: false,
  });
  Loader();
  // window.route = urlRoute;
  document.querySelector(".main-container").innerHTML += cartModal();
  document.querySelector(".main-container").innerHTML += LoginForm();
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
    urlRoute(e);
  } else if (
    e.target.matches(".product>figure>*") ||
    e.target.matches(".home-product>figure>*") ||
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
      let updatedMenu = menufilter.filter((obj) => obj[e.target.dataset.parentid] !== e.target.name);
      sessionStorage.setItem("menufilter", JSON.stringify(updatedMenu));
    }
  } else if (
    e.target.matches(".filter_selection") ||
    e.target.matches(".filter_selection *")
  ) {
    urlRoute(window.location.pathname);
    document
      .querySelector(".filter__mobile__background")
      .classList.toggle("--invisible");
  } else if (
    e.target.matches(".filter-clear") ||
    e.target.matches(".filter-clear *")
  ) {
    sessionStorage.removeItem("filter");
    sessionStorage.removeItem("menufilter");
    FilterMenu(product, "menu");
    urlRoute(window.location.pathname);
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches(".login-form")) Login(new FormData(e.target));
});

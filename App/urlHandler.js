import { Home } from "./components/HomeLand.js";
import urlRoutes from "./urlRoutes.js";
import { ajax } from "./helpers/Ajax.js";
import { productOrder } from "./components/productOrder.js";
import { productCards } from "./components/productCards.js";

export function urlHandler() {
  const $mobileNav = document.querySelector(".modal-navbar__background ");
  document.getElementById("loader").style.display = "block";
  document.getElementById("nav-bar__aside").style.display = "block";
  let {
    location: { pathname },
  } = window;
  if (pathname.length === 0 || pathname === "/index.html" || pathname === "") {
    window.location.pathname = "/eCommerce-SPA/";
  }
  if (pathname === "/eCommerce-SPA/") {
    document.querySelector(".sort-filter__mobile").style.display = "none";
    Home("16661", "16691");
    document.title = `Home | Nataly`;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", "This is the homepage");
  } else {
    document.querySelector(".hero-container").style.display = "none";
    let { route, title, description } = urlRoutes[pathname] || urlRoutes["404"];

    document.getElementById("content").innerHTML = null;
    if (pathname === "/404" || pathname === "/about") {
      document.getElementById("content").innerHTML = route();
    } else if (pathname === "/contact") {
      route();
    } else if (pathname === "/checkout") {
      document.querySelector(".sort-filter__mobile").style.display = "none";
      ajax({
        url: route(),
        success: (response) => {
          product = response;
          productOrder(response);
        },
      });
    } else {
      console.log(route());
      ajax({
        url: route(),
        success: async (response) => {
          if (response) {
            window.product = response;
            productCards(response);
          } else {
            return;
          }
        },
      });
    }

    document.getElementById("loader").style.display = "none";
    if (!$mobileNav.classList.contains("--invisible"))
      $mobileNav.classList.toggle("--invisible");
    document.title = title;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", description);
  }
}

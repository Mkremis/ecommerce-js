import { Home } from "./components/HomeLand.js";
import urlRoutes from "./urlRoutes.js";
import { ajax } from "./helpers/Ajax.js";
import { productOrder } from "./components/productOrder.js";
import { productCards } from "./components/productCards.js";

export function urlHandler() {
  const $mobileNav = document.querySelector(".modal-navbar__background "),
         $hero = document.querySelector(".hero-container");
  document.getElementById("loader").style.display = "block";
  document.getElementById("nav-bar__aside").style.display = "block";
  let {
    location: { pathname },
  } = window;
  if (pathname.length === 0 || pathname === "/index.html" || pathname === "") {
    window.location.pathname = "/ecommerce-js/";
  }
  if (pathname === "/ecommerce-js/") {
    document.querySelector(".sort-filter__mobile").style.display = "none";
    document.querySelector(".filter__mobile").style.display = "none";
    Home("16661", "16691");
    document.title = `Home | Nataly`;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", "This is the homepage");
  } else {
    if ($hero) $hero.style.display = "none";
    let { route, title, description } = urlRoutes[pathname] || urlRoutes["404"];
    
    if (pathname === "/404" || pathname === "/about") {
    document.querySelector(".sort-filter__mobile").style.display = "none";
    document.querySelector(".filter__mobile").style.display = "none";
      document.getElementById("content").innerHTML = route();
    } else if (pathname === "/contact") {
    document.querySelector(".sort-filter__mobile").style.display = "none";
    document.querySelector(".filter__mobile").style.display = "none";
        document.getElementById("content").innerHTML = null;
      route();
    } else if (pathname === "/checkout") {
    document.getElementById("content").innerHTML = null;
    document.querySelector(".sort-filter__mobile").style.display = "none";
    document.querySelector(".filter__mobile").style.display = "none";
      ajax({
        url: route(),
        success: (response) => {
          product = response;
          productOrder(response);
        },
      });
    } else {
        if (!parseInt(sessionStorage.getItem("offset")) > 0) document.getElementById("content").innerHTML = null;
      ajax({
        url: route(),
        success: async (response) => {
          if (response) {
            window.product = response;
            console.log(response);
            productCards(response);
          } else {
            return;
          }
        },
      });
    }

      setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 3000);
    if (!$mobileNav.classList.contains("--invisible"))
      $mobileNav.classList.toggle("--invisible");
    document.title = title;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", description);
  }
}

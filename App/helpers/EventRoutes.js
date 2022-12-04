import { urlRoute } from "../urlRoute.js";
import { Logout } from "./Logout.js";
import { UserAgent } from "./UserAgent.js";
import { FilterMenu } from "../components/FilterMenu.js";

let totalCart = 0;
export const EVENTS = {
  header__logo: {
    action: (classTarget, eTarget, e) => {
      eTarget.href = eTarget.dataset.href;
      urlRoute(e);
    },
  },
  input__plus: {
    action: (classTarget) => {
      let newValue =
        parseInt(document.querySelector(".input__number").value) + 1;
      document.querySelector(".input__number").value = newValue;
    },
  },
  input__minus: {
    action: (classTarget) => {
      let newValue =
        parseInt(document.querySelector(".input__number").value) - 1;
      document.querySelector(".input__number").value =
        newValue < 0 ? 0 : newValue;
    },
  },
  "header__cart-img": {
    action: (classTarget, eTarget) => {
      document.querySelector(".cart-modal").classList.toggle("--invisible");
    },
  },
  "search-button_mobile-image": {
    action: (classTarget, eTarget) => {
      document.querySelector(".autocomplete").style.display = "flex";
      document
        .querySelector(".close-search-button_mobile-image")
        .classList.toggle("--invisible");
      document
        .querySelector(".search-button_mobile-image")
        .classList.toggle("--invisible");
      document
        .querySelector(".header__navigation")
        .classList.toggle("--invisible");
    },
  },
  "close-search-button_mobile-image": {
    action: (classTarget, eTarget) => {
      document.querySelector(".autocomplete").style.display = "none";
      document
        .querySelector(".close-search-button_mobile-image")
        .classList.toggle("--invisible");
      document
        .querySelector(".search-button_mobile-image")
        .classList.toggle("--invisible");
      document
        .querySelector(".header__navigation")
        .classList.toggle("--invisible");
    },
  },
  "header__cart--notification": {
    action: (classTarget, eTarget) => {
      document.querySelector(".cart-modal").classList.toggle("--invisible");
    },
  },
  "cart-modal__delete": {
    action: (classTarget, eTarget) => {
      // invoke the function getCart() to obtain the CART object
      let cart = { ...USER.getCart() };
      cart.items[eTarget.dataset.item]["prodQ"] = 0; //we get the item to delete into the CART object
      // item.prodQ = 0; //actually we dont delete the item from the CART object, we just set the quantity = 0.
      document.querySelector(".header__cart-img").style.animation =
        "shake 0.5s";
      let item = eTarget.dataset.item,
        itemToDelete = { [item]: cart.items[item] };
      USER.setCart(itemToDelete); //invoke to the setCart() method in order to update the CART object with the item updated to quantity = 0;
    },
  },
  "gallery__image-container": {
    action: (e) => {
      document.querySelector(".modal-gallery__background").style.display =
        "block";
    },
  },
  "modal-gallery__close": {
    action: (e) => {
      document.querySelector(".modal-gallery__background").style.display =
        "none";
    },
  },
  "modal-gallery__next": {
    action: (classTarget) => {
      const gallery = product.media.images.map((img) => img.url, {});
      const $DskModalGalleryContainer = document.querySelector(
        ".modal-gallery__image-container"
      );
      let bckImg = getComputedStyle($DskModalGalleryContainer).backgroundImage,
        currentImg = gallery.filter((img) => bckImg.includes(img)),
        nextIndex = gallery.indexOf(currentImg[0]) + 1,
        nextImg =
          nextIndex === gallery.length ? gallery[0] : gallery[nextIndex];
      document.querySelector(
        ".modal-gallery__image-container"
      ).style.backgroundImage = document.querySelector(
        ".modal-gallery__image-container"
      ).style.backgroundImage = `url('https://${nextImg}')`;
    },
  },
  "modal-gallery__previous": {
    action: (classTarget) => {
      const gallery = product.media.images.map((img) => img.url, {});
      const $DskModalGalleryContainer = document.querySelector(
        ".modal-gallery__image-container"
      );
      let bckImg = getComputedStyle($DskModalGalleryContainer).backgroundImage,
        currentImg = gallery.filter((img) => bckImg.includes(img)),
        prevIndex = gallery.indexOf(currentImg[0]) - 1,
        prevImg =
          prevIndex < 0 ? gallery[gallery.length - 1] : gallery[prevIndex];
      document.querySelector(
        ".modal-gallery__image-container"
      ).style.backgroundImage = `url('https://${prevImg}')`;
    },
  },
  "modal-gallery__thumnail": {
    action: (classTarget, eTarget) => {
      let index = eTarget.id.replace("m", "") - 1;
      document.querySelector(
        ".modal-gallery__image-container"
      ).style.backgroundImage = `url('https://${product.media.images[index].url}')`;
    },
  },
  gallery__thumnail: {
    action: (classTarget, eTarget) => {
      const $DskGallery_Container = document.querySelector(
        ".gallery__image-container"
      );
      let index = eTarget.id - 1;
      $DskGallery_Container.style.backgroundImage = `url('https://${product.media.images[index].url}')`;
    },
  },
  gallery__next: {
    action: (classTarget) => {
      const gallery = product.media.images.map((img) => img.url, {});
      let bckImg = getComputedStyle(
          document.querySelector(".gallery__image-container")
        ).backgroundImage,
        currentImg = gallery.filter((img) => bckImg.includes(img)),
        nextIndex = gallery.indexOf(currentImg[0]) + 1,
        nextImg =
          nextIndex === gallery.length ? gallery[0] : gallery[nextIndex];
      document.querySelector(
        ".gallery__image-container"
      ).style.backgroundImage = `url('https://${nextImg}')`;
    },
  },
  gallery__previous: {
    action: (classTarget) => {
      const gallery = product.media.images.map((img) => img.url, {});
      let bckImg = getComputedStyle(
          document.querySelector(".gallery__image-container")
        ).backgroundImage,
        currentImg = gallery.filter((img) => bckImg.includes(img)),
        prevIndex = gallery.indexOf(currentImg[0]) - 1,
        prevImg =
          prevIndex < 0 ? gallery[gallery.length - 1] : gallery[prevIndex];
      document.querySelector(
        ".gallery__image-container"
      ).style.backgroundImage = `url('https://${prevImg}')`;
    },
  },
  "header__menu-container": {
    action: (classTarget) => {
      document
        .querySelector(".modal-navbar__background")
        .classList.toggle("--invisible");
    },
  },
  header__menu: {
    action: (classTarget) => {
      document
        .querySelector(".modal-navbar__background")
        .classList.toggle("--invisible");
    },
  },
  "modal-navbar__close": {
    action: (classTarget) => {
      document
        .querySelector(".modal-navbar__background")
        .classList.toggle("--invisible");
    },
  },
  "user-logout": {
    action: () => Logout(),
  },
  "user-signout": {
    action: () => {
      document.querySelector(".user-panel").classList.add("--invisible");
      Logout();
    },
  },
  "user-mangment": {
    action: () => {
      document.querySelector(".user-panel").classList.add("--invisible");
      USER.userAccount();
    },
  },
  "header__user-avatar": {
    action: () => UserAgent(),
  },
  "filter__mobile-back": {
    action: (classTarget, eTarget) => {
      if (document.querySelector(".filter-sub_menu")) {
        FilterMenu(product, "menu");
        document.querySelector(".filter-clear").style.visibility = "visible";
      } else {
        document
          .querySelector(".filter__mobile__background")
          .classList.toggle("--invisible");
        document.querySelector(".sort-filter__mobile").style.display = "flex";
      }
    },
  },
  "filter-button__mobile": {
    action: (classTarget, eTarget) => {
      document
        .querySelector(".filter__mobile__background")
        .classList.toggle("--invisible");
      document.querySelector(".sort-filter__mobile").style.display = "none";
      document.querySelector(".filter-clear").style.visibility = "visible";
    },
  },
  "filter-close__mobile": {
    action: (classTarget, eTarget) => {
      document
        .querySelector(".filter__mobile__background")
        .classList.toggle("--invisible");
      document.querySelector(".sort-filter__mobile").style.display = "flex";
    },
  },
   "scroll-top-btn": {
    action: (classTarget, eTarget) => {
      window.scroll({ top: 0, behavior: "smooth" })
    },
  },
};

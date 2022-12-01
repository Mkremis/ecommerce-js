import { ajax } from "../helpers/Ajax.js";

export function SubCat() {
  ajax({
    url: "https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US",
    success: (response) => {
      asideRender(response);
    },
  });

  function asideRender(response) {
    // console.log(
    //   response.navigation[0].children[4].children[3].children[1].children
    // );
    //sale women: response.navigation[1].children[4].children[0].children[0].children
    //sale men:  response.navigation[0].children[4].children[0].children[0].children
    const $aisde = document.getElementById("nav-bar__aside"),
      $modalAside = document.querySelector(".modal-aside");
    const URI = window.location.pathname,
      subCats = {
        "/": {
          url: response.navigation[1].children[4].children[0].children[0]
            .children,
          header: "SALE",
        },
        "/search": {
          url: response.navigation[1].children[4].children[0].children[0]
            .children,
          header: "SALE",
        },
        "/men": {
          url: response.navigation[0].children[4].children[3].children[1]
            .children,
          header: "MEN",
        },
        "/women": {
          url: response.navigation[1].children[4].children[3].children[1]
            .children,
          header: "WOMEN",
        },
      };
    // cat_url = subCats[0].link.appUrl,
    // cat_id = subCats[0].link.categoryId,
    // cat_name = subCats[0].content.title;
    if (subCats[URI]) {
      $aisde.innerHTML = null;
      $modalAside.innerHTML = null;
      const $navDsk = document.createElement("nav"),
        $navMobile = document.createElement("nav"),
        $itemsDsk = document.createElement("ul"),
        $itemsMobile = document.createElement("ul");
      $navDsk.classList.add("modal__sub-nav-bar");
      $navMobile.classList.add("modal__sub-nav-bar__Mob");
      $itemsDsk.classList.add("nav__category-items");
      $itemsMobile.classList.add("nav__category-items__Mob");
      $navDsk.appendChild($itemsDsk);
      $navMobile.appendChild($itemsMobile);
      $aisde.appendChild($navDsk);
      $modalAside.appendChild($navMobile);

      subCats[URI].url.forEach((cat, index) => {
        let $cat_item = document.createElement("li"),
          $cat_link = document.createElement("button");
        $cat_link.classList.add("category__link");
        $cat_link.href = "/category";
        $cat_link.textContent = cat.content.title.replace("SALE", "");
        $cat_link.dataset.id = cat.link.categoryId;
        $cat_item.appendChild($cat_link);
        document.querySelector(".nav__category-items").appendChild($cat_item);
        let $cat_itemMob = document.createElement("li"),
          $cat_linkMob = document.createElement("button");
        $cat_linkMob.classList.add("category__link__Mob");
        $cat_linkMob.href = "/category";
        $cat_linkMob.textContent = cat.content.title.replace("SALE", "");
        $cat_linkMob.dataset.id = cat.link.categoryId;
        $cat_itemMob.appendChild($cat_linkMob);
        document
          .querySelector(".nav__category-items__Mob")
          .appendChild($cat_itemMob);
      });
      document
        .querySelector(".nav__category-items")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class = "asideHeader"><span>${subCats[URI].header}</span></div>`
        );
      document
        .querySelector(".nav__category-items__Mob")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class = "asideHeader"><span>${subCats[URI].header}</span></div>`
        );
    } else {
      return false;
    }
  }
}

import { SubCat } from "./SubCateg.js";
import { Sort } from "../helpers/Sort.js";
import { FilterMenu } from "./FilterMenu.js";
import { Components } from "./Components.js";

export function productCards(response) {
  const { products } = response;
 if (!parseInt(sessionStorage.getItem("offset")) > 0) SubCat();
  document.querySelector(".sort-filter__mobile").style.display = "flex";
  document.querySelector(".filter__mobile").style.display = "grid";
  const $fragment = document.createDocumentFragment(),
    $container = document.getElementById("content");
  $container.className = "";
  $container.classList.add("content");
  Sort();
  FilterMenu(response, "menu");

  let cards;
  products.forEach((product) => {
    let image = `https://${product.imageUrl}`,
      name = product.name,
      brand = product.brandName,
      colour = product.colour,
      currency = product.price.currency,
      price_curr = product.price.current.text,
      price_prev = product.price.previous.text,
      id = product.id;
    
    // only products with with 9 digits Ids are avaible for product details
    if (id.toString().length === 9) {
      cards = new Components({
        image,
        name,
        brand,
        colour,
        currency,
        price_curr,
        price_prev,
        id,
      });

      const $product = document.createElement("article");
      $product.classList.add("product");
      $product.innerHTML = cards.productCardMaker();
      $fragment.appendChild($product);
    }
  });

  $container.appendChild($fragment);
}

import { ProductGallery } from "./ProductGallery.js";
import { productDetails } from "./productDetails.js";
import { galleryModal } from "./galleryModal.js";
export function productOrder(product) {
  document.getElementById("nav-bar__aside").style.display = "none";
  const $container = document.getElementById("content");
  $container.className = "";
  $container.classList.add("content-order");
  ProductGallery(product);
  $container.innerHTML += productDetails(product);
  if (product.price.previous.value !== product.price.current.value) {
    document.querySelector(".details__discount").style.display = "block";
    document.querySelector(".details__before").style.display = "block";
  }
  galleryModal(product);
}

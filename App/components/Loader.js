export function Loader() {
  let $loader = document.createElement("img");
  $loader.src = "/ecommerce-js/images/loader.svg";
  $loader.id = "loader";
  $loader.style.display = "none";
  document.querySelector(".main-container").appendChild($loader);
}

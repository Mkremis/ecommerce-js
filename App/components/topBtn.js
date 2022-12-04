export function TopButton() {
  const $scrollTopButton = document.createElement("button");
  $scrollTopButton.classList.add("scroll-top-btn", "--invisible");
  $scrollTopButton.innerHTML = "<img src='/eCommerce-SPA/images/up.svg'>";
  return $scrollTopButton;
}

export function TopButton() {
  const $scrollTopButton = document.createElement("button");
  $scrollTopButton.classList.add("scroll-top-btn", "--invisible");
  $scrollTopButton.innerHTML = "&#11014";
  return $scrollTopButton;
}

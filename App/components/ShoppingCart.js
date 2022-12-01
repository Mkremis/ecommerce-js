export function CartManager() {
  setTimeout(() => {
    document.querySelector(".header__cart-img").style.animation = "none";
  }, 500);
  const $detailCont = document.querySelector(".cart-modal__details-container");
  $detailCont.innerHTML = null;
  let items;
  if (!USER.getCart()) {
    // console.log(USER.cart);
    items = USER.cart || {};
  } else {
    let userCart = USER.getCart();
    items = userCart.items;
    console.log(items);
  }
  const CART = { ...items };
  console.log("SHOPPING CART", CART);
  // if some product quantity in the cart is = 0, this product is deleted from the cart modal (not from the user or session object CART)
  for (const key in CART) {
    if (CART[key]["prodQ"] === 0) delete CART[key];
  }
  let cartItems = CART ? Object.keys(CART) : [];
  if (cartItems.length > 0) {
    let totalCart = 0;
    document.querySelector(
      ".header__cart--notification"
    ).textContent = `${cartItems.length}`;
    document.querySelector(".header__cart--notification").style.display =
      "block";
    document.querySelector(".cart-modal__empty").classList.add("--invisible");
    document;
    $detailCont.classList.remove("--invisible");
    document
      .querySelector(".cart-modal__checkout")
      .classList.remove("--invisible");
    for (const item in CART) {
      let totalPrice = CART[item].prodPrice * CART[item].prodQ;
      totalCart += totalPrice;
      $detailCont.innerHTML += `
          <article class="cart-modal__item" data-id="${item}">
          <img
            class="cart-modal__image"
            src="https://${CART[item].prodImage}"
            alt="${CART[item].prodName}"
          />
        <p class="cart-modal__product">${CART[item].prodName}</p>
        <p class="cart-modal__quantity">x ${CART[item].prodQ}</p>
        <p class="cart-modal__total-price">
          $${totalPrice}
        </p>
        <div class="cart-modal__delete-container">
          <img
            class="cart-modal__delete"
            src="/eCommerce-SPA/images/icon-delete.svg"
            alt="delete"
            data-item="${item}"/>
        </div>
      </article>
        `;
    }

    document.querySelector(
      ".cart-modal__total-cart>span"
    ).textContent = `${totalCart}`;
  } else {
    document.querySelector(".cart-modal__total-cart>span").textContent = "0";
    document.querySelector(".header__cart--notification").textContent = "0";
    document.querySelector(".header__cart--notification").style.display =
      "none";
    if ($detailCont.hasChildNodes) {
      $detailCont.innerHTML = null;
      document
        .querySelector(".cart-modal__details-container")
        .classList.toggle("--invisible");
      document
        .querySelector(".cart-modal__empty")
        .classList.remove("--invisible");
      document
        .querySelector(".cart-modal__checkout")
        .classList.toggle("--invisible");
    }
  }
}

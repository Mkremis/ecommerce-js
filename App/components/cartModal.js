export function cartModal() {
  return `
  <!-- inicio cart modal -->
  <article class="cart-modal --invisible">
   <span class = "cart-modal__close" onclick="document.querySelector('.cart-modal').classList.toggle('--invisible')"
 title="Close Modal">&times;</span>
  <section class="cart-modal__content">
    <div class="cart-modal__header">
      <h3 class="cart-modal__title">Cart</h3>
      <p class="cart-modal__total-cart">Total: $<span></span></p>
     </div>
    <div class="cart-modal__checkout-container">
      <div class="cart-modal__empty --invisible">
        <p>Your cart is empty</p>
      </div>
      <div class="cart-modal__details-container --invisible">
      </div>
    </div>
    <div class="cart-modal__checkout">
      <button>Checkout</button>
      </div>
    </section>
  </article>
      <!-- final cart modal -->
  `;
}

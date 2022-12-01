export class Components {
  constructor(options) {
    this.image = options.image || null;
    this.name = options.name || null;
    this.brand = options.brand || null;
    this.colour = options.colour || null;
    this.currency = options.currency || null;
    this.price_curr = options.price_curr || null;
    this.price_prev = options.price_prev || "";
    this.id = options.id || null;
  }

  productCardMaker() {
    return `
  <figure data-id=${this.id}>
    <img class="product-image" src = "${this.image}" alt="${this.name}"/>
    <figcaption class="product-description">
    <p class="product-name">${this.name}</p>
    <p class="product-price"><b>${this.price_curr}</b></p></figcaption>
  </figure>
`;
  }
}

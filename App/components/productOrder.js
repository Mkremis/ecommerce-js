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

function ProductGallery(product) {
  const $gallery = document.createElement("article"),
    $galleryImgCont = document.createElement("div"),
    $images = [
      {
        class: "gallery__previous",
        src: "/eCommerce-SPA/images/icon-previous.svg",
        alt: "previous"
      },
      {
        class: "gallery__next",
        src: "/eCommerce-SPA/images/icon-next.svg",
        alt: "next"
      }
    ];
  $gallery.classList = "gallery";
  $galleryImgCont.classList = "gallery__image-container";
  $galleryImgCont.style.backgroundImage = `url('https://${product.media.images[0].url}')`;

  $gallery.appendChild($galleryImgCont);
  document.getElementById("content").appendChild($gallery);

  $images.forEach((image) => {
    let $image = document.createElement("img");
    $image.classList.add(image.class);
    $image.src = image.src;
    $image.alt = image.alt;
    document.querySelector(".gallery__image-container").appendChild($image);
  });
  const $galleryThum = document.createElement("div");
  $galleryThum.classList.add("gallery__thumnails");
  $gallery.appendChild($galleryThum);
  let { images } = product.media;
  images.forEach((image, index) => {
    let $image = document.createElement("img");
    $image.id = index + 1;
    $image.classList.add("gallery__thumnail");
    $image.src = `https://${image.url}`;
    $image.alt = "thumnail";
    document.querySelector(".gallery__thumnails").appendChild($image);
  });
}

export function productDetails(product) {
  // console.log(product);
  return `
  <article class="details">
      <section class="details__product">
        <h1 class="details__company">${product.brand.name}</h1>
        <h2 class="details__title">${product.name}</h2>
        <div class="details__description">
          ${product.brand.description || product.description || ""}
          </div>
        <details>
          <summary><span>Product Information</span></summary>
            <article>
             <a href="${product.sizeGuide || ""}" target="_blank">${
    product.sizeGuide ? "Size Guide" : ""
  }</a>
             <p>Gender: <span>${product.gender}</span></p>
             <p>Colour: <span>${product.media.images[0].colour}</span></p>
             <div>${product.description}</div>
             <div>${product.info.aboutMe}</div>
          </article>
        </details>
        
      </section>
      <section class="details__order">
        <div class="details__prices">
          <div class="details__now">
            <p class="price_now">${product.price.current.text}</p>
            <p class="details__discount">
              -${parseInt(
                ((product.price.previous.value - product.price.current.value) /
                  product.price.previous.value) *
                  100
              )}%
            </p>
          </div>
          <p class="details__before">${product.price.previous.text}</p>
        </div>
        <div class="details__product-quantity">
          <div class="input">
            <button  class="input__minus">-</button>
            <input class="input__number" type="text" value="0" />
            <button class="input__plus">+</button>
          </div>
          <button class="details__button">
             <img src="/eCommerce-SPA/images/icon-cart-white.svg" alt="cart" />Add to cart
          </button>
        </div>
      </section>
    </article>  
    `;
}
export function galleryModal(product) {
  document.getElementById("content").innerHTML += `
      <!-- inicio gallery modal -->
      <div class="modal-gallery__background">
        <article class="modal-gallery">
          <div class="modal-gallery__close-container">
            <img
              class="modal-gallery__close"
              src="/eCommerce-SPA/images/icon-close.svg"
              alt="icon close"
            />
          </div>
          <div class="modal-gallery__image-container" style="background-image: url('https://${product.media.images[0].url}');">
            <img
              class="modal-gallery__previous"
              src="/eCommerce-SPA/images/icon-previous.svg"
              alt="previous"
            />
            <img
              class="modal-gallery__next"
              src="/eCommerce-SPA/images/icon-next.svg"
              alt="next"
            />
          </div>
          <div class="modal-gallery__thumnails">
          </div>
        </article>
      </div>
      <!-- final gallery modal -->
    `;

  let { images } = product.media;
  images.forEach((image, index) => {
    document.querySelector(".modal-gallery__thumnails").innerHTML += `
      <img id=m${index + 1}
     class="modal-gallery__thumnail"
     src= https://${image.url}
     alt="thumnail"/>
     `;
  });
}

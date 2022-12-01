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

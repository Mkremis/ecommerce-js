export function ProductGallery(product) {
  const $gallery = document.createElement("article"),
    $galleryImgCont = document.createElement("div"),
    $images = [
      {
        class: "gallery__previous",
        src: "/eCommerce-SPA/images/icon-previous.svg",
        alt: "previous",
      },
      {
        class: "gallery__next",
        src: "/eCommerce-SPA/images/icon-next.svg",
        alt: "next",
      },
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

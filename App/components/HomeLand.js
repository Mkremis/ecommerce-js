import { SubCat } from "./SubCateg.js";
import { Components } from "./Components.js";
import { heroImage } from "./Hero.js";

export function Home(women, men) {
  SubCat();
  const $loader = document.getElementById("loader"),
    $mobileNav = document.querySelector(".modal-navbar__background ");

  let bestWM, bestM;
  const options = {
   method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd210c99c19mshfe716f01deb4167p14f4c9jsn9e4d8f8900ce',
		'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
	}
};
    urlWM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${women}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
    urlM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${men}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
    $WMfragment = document.createDocumentFragment(),
    $Mfragment = document.createDocumentFragment(),
    $container = document.getElementById("content");
  $container.className = "";
  $container.classList.add("content");
  Promise.all([fetch(urlWM, options), fetch(urlM, options)])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((json) => {
      bestWM = json[0].products;
      bestM = json[1].products;
      window.product = [...bestWM, ...bestM];
      render(bestWM, bestM);
    })
    .catch((err) => console.log(err));

  function render(bestWM, bestM) {
    bestWM.forEach((product) => {
      let image = `https://${product.imageUrl}`,
        name = product.name,
        brand = product.brandName,
        colour = product.colour,
        currency = product.price.currency,
        price_curr = product.price.current.text,
        price_prev = product.price.previous.text,
        id = product.id;

      let WMcards = new Components({
        image,
        name,
        brand,
        colour,
        currency,
        price_curr,
        price_prev,
        id,
      });
      const $product = document.createElement("article");
      $product.classList.add("home-product");

      $product.innerHTML = WMcards.productCardMaker();
      $WMfragment.appendChild($product);
    });
    bestM.forEach((product) => {
      let image = `https://${product.imageUrl}`,
        name = product.name,
        brand = product.brandName,
        colour = product.colour,
        currency = product.price.currency,
        price_curr = product.price.current.text,
        price_prev = product.price.previous.text,
        id = product.id;

      let Mcards = new Components({
        image,
        name,
        brand,
        colour,
        currency,
        price_curr,
        price_prev,
        id,
      });
      const $product = document.createElement("article");
      $product.classList.add("home-product");

      $product.innerHTML = Mcards.productCardMaker();
      $Mfragment.appendChild($product);
    });
    const $WMproduct = document.createElement("div"),
      $Mproduct = document.createElement("div"),
      $WMheader = document.createElement("button"),
      $Mheader = document.createElement("button");
    $WMheader.innerHTML = "<span>Women</span>";
    $Mheader.innerHTML = "<span>Men</span>";
    $WMheader.classList.add("WM-product-header");
    $WMheader.dataset.id = "27108";
    $WMheader.value = "/women";
    $Mheader.classList.add("M-product-header");
    $Mheader.dataset.id = "27110";
    $Mheader.value = "/men";
    $WMproduct.classList.add("WM-home");
    $Mproduct.classList.add("M-home");

    $WMproduct.append($WMheader, $WMfragment);
    $Mproduct.append($Mheader, $Mfragment);

    //avoid to append twice the hero if home is reloaded
    $container.innerHTML = null;
    const $heroAlready = document.querySelector(".hero-container");
    if (!$heroAlready) {
      const $hero = document.createElement("article");
      $hero.classList.add("hero-container");
      $hero.innerHTML = heroImage();
      $container.before($hero);
    } else {
      $heroAlready.style.display = "block";
    }

    $container.append($WMproduct, $Mproduct);
    if (!$mobileNav.classList.contains("--invisible")) {
      $mobileNav.classList.toggle("--invisible");
    }
    $loader.style.display = "none";
  }
}

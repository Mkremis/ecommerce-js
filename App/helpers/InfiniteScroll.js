import { urlRoute } from "../urlRoute.js";

urlRoute;
export function infiniteScroll() {
  const $scrollTopBtn = document.querySelector(".scroll-top-btn");

  window.addEventListener("scroll", (e) => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement,
      offset = sessionStorage.getItem("offset");
    const { itemCount } = product;

    if (scrollTop > 400) {
      $scrollTopBtn.classList.remove("--invisible");
    } else {
      $scrollTopBtn.classList.add("--invisible");
    }

    if (scrollTop + clientHeight > scrollHeight && offset) {
      offset = parseInt(offset);
      let rest = itemCount - offset;
      offset += Math.min(48, rest);
      sessionStorage.setItem("offset", offset);
      if (offset < itemCount){
        document.getElementById("loader").style.display = "block";
        urlRoute(window.location.pathname);
      }
    } else {
      return false;
    }
  });
}

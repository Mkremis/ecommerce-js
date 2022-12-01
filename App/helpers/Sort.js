import { urlRoute } from "../urlRoute.js";

export function Sort() {
  const $sort = document.getElementById("sortBy");
  $sort.addEventListener("change", (e) => {
    localStorage.setItem("sort", e.target.value);
    urlRoute(window.location.pathname);
  });
}

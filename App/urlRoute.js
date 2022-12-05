import { urlHandler } from "./urlHandler.js";

export function urlRoute(event) {
  let { href } = window.location,
    { pathname } = window.location;
  if (event === window.event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    console.log(event.target.href);
    if (event.target.href !== href) {
      if (
        event.target.href.includes("/search") ||
        event.target.href.includes("/women") ||
        event.target.href.includes("/men") ||
        event.target.href.includes("/sneakers")
      ) {
        offsetInit();
      } else {
        sessionStorage.removeItem("offset");
      }
    }
  } else {
    window.history.pushState({}, "", event);
    if (event !== pathname) {
      if (
        pathname.includes("/search") ||
        pathname.includes("/women") ||
        pathname.includes("/men") ||
        pathname.includes("/sneakers")
      ) {
        offsetInit();
      } else {
        sessionStorage.removeItem("offset");
      }
    }
  }
  function offsetInit() {
    sessionStorage.setItem("offset", 0);
    sessionStorage.removeItem("filter");
    sessionStorage.removeItem("menufilter");
  }
  urlHandler();
}

import { urlHandler } from "./urlHandler.js";

const urlRoute = (event)=> {
  //capture the current location
  let { href } = window.location,
    { pathname } = window.location;
  if (event === window.event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    console.log(event.target.href,  window.history );
    //if the target location is diferent to the current reset offset to 0 and clear filters
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
    window.history.pushState({}, "", `https://mkremis.github.io${event}`);
 //if the target location is diferent to the current reset offset to 0 and clear filters
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
export urlRoute;

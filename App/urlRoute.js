import { urlHandler } from "./urlHandler.js";

export function urlRoute(event) {
  if (event === window.event) {
    localStorage.removeItem("sort");
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
  } else {
    window.history.pushState({}, "", event);
  }

  urlHandler();
}

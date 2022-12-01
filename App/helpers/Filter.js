import { urlRoute } from "../urlRoute.js";

export function Filter(target) {
  urlRoute;
  let filter = sessionStorage.getItem("filter") || "";
  filter = filter.concat(target.value);
  sessionStorage.setItem("filter", filter);
  let menufilter = JSON.parse(sessionStorage.getItem("menufilter")) || [];
  menufilter.push({ [target.dataset.parentid]: target.name });
  sessionStorage.setItem("menufilter", JSON.stringify(menufilter));
}

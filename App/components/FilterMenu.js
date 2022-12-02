export function FilterMenu({ facets }, screen) {
  facets =
    screen === "menu"
      ? facets
      : facets
          .filter((obj) => obj.id === screen)
          .map((ele) => ele.facetValues)[0];
  if (facets)
    document.querySelector(".filter-categories").innerHTML = Menu(facets);

  function Menu(facets) {
    let $template = "";
    facets.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    facets.forEach((facet) => {
      let parentId = screen === "menu" ? "" : screen,
        clss = screen === "menu" ? "filter-menu" : "filter-sub_menu",
        value = screen === "menu" ? "" : `&${screen}=${facet.id}`,
        count = screen === "menu" ? "" : facet.count;
      $template += `
        <li>
          <input type="checkbox" id="${facet.id}" data-parentid="${parentId}" class="${clss}" name="${facet.name}" value="${value}">
          </checkbox>
           <label for="${facet.id}" class="label-${clss}">
      `;

      if (parentId === "base_colour" && facet.name) {
        let color;
        let hexColor = namedColors.find((color) => color.name === facet.name);
        if (hexColor) color = hexColor.hex;
        $template += `<div class="label-${clss}_colour" style="background-color:${color}"></div>`;
      }

      $template += ` 
           <div class="label-${clss}_description">
            ${facet.name}<span class="filter-count">${count}</span>
           </div>
          </label>`;
      if ((clss = "menu")) {
        $template += "<span class ='filter-menu__fiters'>";
        let menufilter = JSON.parse(sessionStorage.getItem("menufilter")) || [];
        menufilter.forEach((filter) => {
          if (facet.id === Object.keys(filter)[0])
            $template += `${Object.values(filter)[0]}<span></span>`;
        });
        $template += "</span>";
      }
      $template += "</li>";
    });
    return $template;
  }
}

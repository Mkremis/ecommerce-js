export function sortFiltMob() {
  return `
  <aside class="sort-filter__mobile">
      <section class="sort__mobile">
        <select name="sortBy" id="sortBy" class="sort-select__mobile">
          <option value>SORT</option>
          <option value="recommended">Recommended</option>
          <option value="freshness">What's new</option>
          <option value="pricedesc">Price high to low</option>
          <option value="priceasc">Price low to high</option>
        </select>
      </section>
      <section class="filter">
        <button class="filter-button__mobile" >Filter</button>
      </section>
    </aside>
  `;
}

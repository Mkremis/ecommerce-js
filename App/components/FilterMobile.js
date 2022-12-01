export function filterMobile() {
  return `
<article class="filter__mobile__background --invisible">
  <aside class="filter__mobile">
      <header>
       <button class="filter__mobile-back" name ="back"></button>
       <button class="filter_selection" name ="filter"><span>Filter</span></button>
        <button class="filter-clear" name ="clear"><span>Clear</span></button>
         <span class="filter-close__mobile" title="Close Modal">&times;</span>
      </header>
      <ul class="filter-categories">
      </ul>
    </aside>
  </article>
  `;
}

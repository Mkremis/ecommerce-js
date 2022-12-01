export function FilterChk() {
  let filtered = sessionStorage.getItem("filter"),
    filters = filtered ? filtered.split("&") : [];

  filters.forEach((filter) => {
    if (!filter) return;
    let chkData = filter.split("=");
    let chkList = document.querySelectorAll(`[data-parentid='${chkData[0]}']`);
    Array.from(chkList)
      .filter(({ id }) => id === chkData[1])
      .map((entrie) => (entrie.checked = true));
  });
}

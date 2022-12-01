export function ajax({ url, success }) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "beb5fe007fmsh24089c307704c5dp13a623jsn4b8e75a7763a",
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
    },
  };

  const FETCH = fetch(url, options)
    .then((res) => res.json())
    .then((jsn) => {
      success(jsn);
    })
    .catch((err) => console.error(err));
}

export function ajax({ url, success }) {
  const options = {
  method: "GET",
      headers: {
        "X-RapidAPI-Key": "2396f3e6fdmsh5a90589f99d3620p11ae3cjsn28439e10058d",
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

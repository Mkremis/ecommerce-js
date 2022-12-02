export function ajax({ url, success }) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c61d7c0bamsh1659f791e94b92fp14bc20jsne92bfd2f3e80",
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

export function ajax({ url, success }) {
  const options = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd210c99c19mshfe716f01deb4167p14f4c9jsn9e4d8f8900ce',
		'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
	}
};

  const FETCH = fetch(url, options)
    .then((res) => res.json())
    .then((jsn) => {
      success(jsn);
    })
    .catch((err) => console.error(err));
}

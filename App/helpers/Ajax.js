export function ajax({ url, success }) {
  const options = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0b048e90e6mshcd711004ccd8b43p1c3fbajsnd92706b2c07f',
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

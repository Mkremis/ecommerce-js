export function ajax({ url, success }) {
  const options = {
   method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1693f38f67mshed9ca24b1b2aec1p1fe1b4jsnd9da89021c3a',
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

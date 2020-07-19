const baseURL = "https://restcountries.eu/rest/v2/name/";

export default function fetchCountries(searchQuery, callback) {
  fetch(baseURL + searchQuery)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      callback(data)
    })
    .catch(e => 'fetch error')
}

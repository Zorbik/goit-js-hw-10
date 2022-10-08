const BASE_URL = 'https://restcountries.com/';

export function fetchCountry(name) {
  return fetch(
    `${BASE_URL}v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}

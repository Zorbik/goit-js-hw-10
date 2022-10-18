const BASE_URL = 'https://restcountries.com/';

export async function fetchCountry(name = '') {
  const response = await fetch(
    `${BASE_URL}v3.1/name/${name}?fields=name,capital,population,flags,languages`
  );
  return await response.json();
}

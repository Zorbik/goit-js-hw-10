const BASE_URL = 'https://restcountries.com/';

export async function fetchCountry(name = '') {
  return await fetch(
    `${BASE_URL}v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      console.log(`response`, response);
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

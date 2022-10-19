import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import listOfCountries from './template/listOfCountries.hbs';
import country from './template/country.hbs';
import { fetchCountry } from './js/fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  const search = event.target.value.trim();
  if (!search) {
    return;
  }
  fetchCountry(search)
    .then(countryItems => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      createMarkup(countryItems);
    })
    .catch(onFetchError);
}

function createMarkup(array = []) {
  if (array.length > 10) {
    Notify.info(`Too many matches found. Please enter a more specific name.`);
  } else if (array.length >= 2) {
    refs.countryList.innerHTML = listOfCountries(array);
  } else {
    refs.countryInfo.innerHTML = country(...array);
  }
}

function onFetchError() {
  Notify.failure(`Oops, there is no country with that name`);
}

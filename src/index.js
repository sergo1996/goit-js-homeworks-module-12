import './styles.css';
import fetchCountries from './js/fetchCountries';
//Templates
import countriesListItemsTemplate from './templates/country-template.hbs';
import shortListItemsTemplate from './templates/short-list.hbs';
//Pnotify starts
import { error, alert, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
//Pnotify ends
const debounce = require('lodash.debounce');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

const refs = {
  input: document.querySelector('#search-field'),
  countriesList: document.querySelector('#countries-list'),
};

refs.input.addEventListener(
  'input',
  debounce(() => searchForCountry(), 500),
);

//take data to fetch from input
function searchForCountry() {
  clearListItems();
  const searchQuery = refs.input.value;
  fetchCountries(searchQuery, onData);
}

function onData(data) {
  if (data.length > 10) {
    tooManyMatches();
    return;
  }

  data.map(countries => {
    if (data.length === 1) {
      buildListItems(countries);
    } else {
      buildShortList(countries);
    }
  });
}

//Build markup of Country
function buildListItems(items) {
  const template = countriesListItemsTemplate(items);
  refs.countriesList.insertAdjacentHTML('beforeend', template);
}
//Clear markup
function clearListItems() {
  refs.countriesList.innerHTML = '';
}
//Message if countries list longer than 10
function tooManyMatches() {
  error('Too many matches found. Please enter a more specific query!');
}

//Build list from 2 to 10 countries
function buildShortList(items) {
  // console.log(items.name)
  const markup = shortListItemsTemplate(items);
  // console.log(markup)
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

onLoader();
addingOptions();

//функція наповнення селекту
function addingOptions() {
  fetchBreeds().then(
    catsList =>
      (select.innerHTML = catsList.data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(''))
  );
  offLoader();
}

//функція наповнення інформації по вибраному айді
function addingInformation() {}

//функція для зміни видимості лоадера
function onLoader() {
  loader.style.display = 'block';
}
function offLoader() {
  loader.style.display = 'none';
}
//функція для виклику сповіщення про помилку
function onError() {
  Notiflix.Report('Oops! Something went wrong! Try reloading the page!');
}

// Імпорт необхідних модулів з інших файлів
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css"

// Отримуємо посилання на елементи DOM, які нам потрібні
const selectCat = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

// Викликаємо функцію для наповнення опцій селекту
addingOptions();

// Встановлюємо початковий текст для блоку інформації про кота
catInfo.innerHTML = `<p>Виберіть котика зі списку вище для відображення інформації про нього</p>
`;

// Функція для наповнення опцій селекту зі списком порід
function addingOptions() {
  fetchBreeds()
    .then(catsList => {
      // Додаємо опції до селекту на основі отриманого списку порід
      const defaultOption = ' <option data-placeholder="true"></option>';
      selectCat.innerHTML =
        defaultOption +
        catsList.data
          .map(({ id, name }) => `<option value="${id}">${name}</option>`)
          .join('');

      // Додаємо слухача подій для селекту, щоб відображати інформацію при виборі опції
      selectCat.addEventListener('change', addingInformation);

      // Вмикаємо відображення блоку інформації та вимикаємо лоадер
      onDisplayInfo();
      offLoader();

      // Ініціалізуємо функціонал SlimSelect для кастомізації селекту
      onSelect();
    })
    .catch(err => {
      // Вимикаємо лоадер та показуємо повідомлення про помилку
      offLoader();
      onError();
    });
}

// Функція для відображення інформації про вибраного кота по айді
function addingInformation(evt) {
  const idCat = evt.target.value;
  // Вимикаємо блок інформації та вмикаємо лоадер
  offDisplayInfo();
  onLoader();

  fetchCatByBreed(idCat)
    .then(resp => {
      const currentCat = resp.data[0];
      const catImg = currentCat.url;
      const catName = currentCat.breeds[0].name;
      const catDescr = currentCat.breeds[0].description;

      // Відображаємо інформацію про кота та вимикаємо лоадер
      catInfo.innerHTML = ` <img class="cat-img" src="${catImg}" alt="${catName}">
    <h2 class="cat-name">${catName}</h2>
    <p class="cat-descr">${catDescr}</p>`;
      offLoader();
      onDisplayInfo();
    })
    .catch(err => {
      // Вимикаємо лоадер та показуємо повідомлення про помилку
      offLoader();
      onError();
    });
}

// Функції для зміни видимості лоадера та блоку інформації
function onLoader() {
  loader.style.display = 'flex';
}
function offLoader() {
  loader.style.display = 'none';
}
function onDisplayInfo() {
  catInfo.style.display = 'flex';
}
function offDisplayInfo() {
  catInfo.style.display = 'none';
}

// Функція для виклику сповіщення про помилку
function onError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      position: 'center-top',
      timeout: 10000,
      width: '350px',
      fontSize: '20px',
    }
  );
}

// Функція для ініціалізації кастомізації селекту
function onSelect() {
  selectCat.style.display = 'flex';

  new SlimSelect({
    select: '#selectElement',
    settings: {
      showSearch: true,
      searchHighlight: true,
      placeholderText: 'Оберіть породу кота',
    },
  });
}

//live_Io2IL4uq7kBqpCSyUxyMmzmqLQlKVoUlsGVytGVZAbTWrdVebIluIG10KwbORlhm

// Імпортуємо axios для здійснення запитів до API
import axios from 'axios';
const BASE_URL= "https://api.thecatapi.com/v1"

// Встановлюємо заголовок 'x-api-key' для всіх запитів до API
axios.defaults.headers.common['x-api-key'] =
  'live_Io2IL4uq7kBqpCSyUxyMmzmqLQlKVoUlsGVytGVZAbTWrdVebIluIG10KwbORlhm';

// Функція для отримання списку порід котів
function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(resp => {
    return resp;
  });
}

// Функція для отримання випадкового кота за айді породи
function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(resp => {
      return resp;
    });
}

export { fetchBreeds, fetchCatByBreed };

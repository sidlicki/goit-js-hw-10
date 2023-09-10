//live_Io2IL4uq7kBqpCSyUxyMmzmqLQlKVoUlsGVytGVZAbTWrdVebIluIG10KwbORlhm

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Io2IL4uq7kBqpCSyUxyMmzmqLQlKVoUlsGVytGVZAbTWrdVebIluIG10KwbORlhm';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(resp => {
    return resp;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds/search?breed_ids=${breedId}`)
    .then(resp => {
      return resp;
    });
}

export { fetchBreeds, fetchCatByBreed };

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31948994-c82329770758e332123bf6568';

export async function getSearchImages(currentQuery, currentPage) {
  const resp = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: currentQuery,
      page: currentPage,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });

  return resp.data;
}

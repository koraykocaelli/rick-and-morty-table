import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = (page = 1) => {
  return axios.get(`${BASE_URL}/character?page=${page}`).then(res => res.data);
};

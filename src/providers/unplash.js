import axios from 'axios';
import Config from 'react-native-config';

const url = 'https://api.unsplash.com/';

// eslint-disable-next-line dot-notation
axios.defaults.headers.common.Authorization = `Client-ID ${Config.UNSPLASH_ACCESS_KEY}`;

const unsplash = {
  photos: {
    list: async ({page, per_page, order_by}) =>
      await axios.get(`${url}photos`, {params: {page, per_page, order_by}}),
    getRandom: async ({count}) =>
      await axios.get(`${url}photos/random`, {params: {count}}),
  },
  users: {
    get: async username => await axios.get(`${url}users/${username}`),
    getPhotos: async username =>
      await axios.get(`${url}users/${username}/photos`),
  },
};

export default unsplash;

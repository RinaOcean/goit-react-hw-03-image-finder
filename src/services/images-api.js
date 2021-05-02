import axios from 'axios';
// import { toast } from 'react-toastify';

const API_KEY = '20659430-8e33c69d8b4c60137606db57c';
const BASE_URL = 'https://pixabay.com/api';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`;
  return axios.get(url);
};
// eslint-disable-next-line
export default { fetchImages };

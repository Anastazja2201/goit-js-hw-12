import axios from 'axios';

const API_KEY = '49358433-5727c4bf05d17bed3943eaf07';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

export const fetchImages = async (searchQuery, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page,
      },
    });
    totalHits = response.data.totalHits;
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return { hits: [], totalHits: 0 };
  }
};

export const loadMoreImages = async () => {
  if (!currentQuery) return;
  if (currentPage * PER_PAGE >= totalHits) {
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      color: 'red',
    });
    return { hits: [] };
  }
  currentPage += 1;
  return fetchImages(currentQuery, currentPage);
};

export const resetPagination = () => {
  currentPage = 1;
};

export const setQuery = (query) => {
  if (currentQuery !== query) {
    currentQuery = query;
    resetPagination();
  }
};

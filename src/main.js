import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  fetchImages,
  setQuery,
  resetPagination,
  loadMoreImages,
  getCurrentPage,
  getPerPage,
} from './js/pixabay-api.js';

import {
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollPageAfterLoad,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const input = document.querySelector('input[name="search-text"]');
  const loadMoreBtn = document.querySelector('.load-more');

  hideLoader();
  hideLoadMoreButton();

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const searchQuery = input.value.trim();

    if (searchQuery === '') {
      iziToast.error({
        message: 'Please enter a search term!',
        position: 'topRight',
      });
      return;
    }

    setQuery(searchQuery);
    resetPagination();
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
      const { hits, totalHits } = await fetchImages(searchQuery);
      const perPage = getPerPage();

      if (hits.length === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
      } else {
        renderGallery(hits);

        if (perPage * getCurrentPage() < totalHits) {
          showLoadMoreButton();
        }
      }
    } catch (error) {
      iziToast.error({
        message:
          'An error occurred while fetching images. Please try again later.',
          position: 'topRight',
        });
      console.error('Error fetching images:', error);
    } finally {
      hideLoader();
    }
  });
  loadMoreBtn.addEventListener('click', async () => {
    showLoader();

    try {
      const { hits, totalHits } = await loadMoreImages();
      const perPage = getPerPage();

      if (hits.length > 0) {
        renderGallery(hits);
        scrollPageAfterLoad();
      }

       if (perPage * getCurrentPage() >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } catch (error) {
      iziToast.error({
        message: 'Error loading more images.',
        position: 'topRight',
      });
      console.error(error);
    } finally {
      hideLoader();
    }
  });
});

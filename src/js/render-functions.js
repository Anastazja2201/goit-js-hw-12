import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
});

export const renderGallery = images => {
  gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const markup = images
    .map(
      image => `
  <li class="gallery-item">
       <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const showLoader = () => {
  document.querySelector('.loader').style.display = 'block';
};

export const hideLoader = () => {
  document.querySelector('.loader').style.display = 'none';
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const showLoadMoreButton = () => {
  document.querySelector('.load-more').classList.remove('hidden');
};

export const hideLoadMoreButton = () => {
  document.querySelector('.load-more').classList.add('hidden');
};

export const scrollPageAfterLoad = () => {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;

  const itemHeight = galleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: itemHeight * 2,
    behavior: 'smooth',
  });
};

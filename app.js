'use strict';

const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightboxOverlay = document.querySelector('.lightbox__overlay');

const galleryItemsMarkup = galleryItems
  .map(
    (item) =>
      `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.preview}"
    >
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </li>`
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

gallery.addEventListener('click', onGalleryItemsClick);

function onGalleryItemsClick(evt) {
  evt.preventDefault();

  const target = evt.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const originalImage = target.getAttribute('data-source');

  lightbox.classList.add('is-open');

  lightboxImage.src = originalImage;
  lightboxImage.alt = target.alt;

  lightboxCloseBtn.addEventListener('click', handleLightboxClose);
  lightboxOverlay.addEventListener('click', handleLightboxClose);
  window.addEventListener('keydown', handleKeydownLightboxListener);
}

function handleLightboxClose() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
}

function handleKeydownLightboxListener(evt) {
  if (evt.key === 'Escape') {
    handleLightboxClose();
  } else if (evt.key === 'ArrowRight') {
    getNextLightboxImage(lightboxImage);
  } else if (evt.key === 'ArrowLeft') {
    getPreviousLightboxImage(lightboxImage);
  }

  return;
}

function getNextLightboxImage(currentImage) {
  const isCurrentGalleryItem = (item) => item.original === currentImage.src;

  const currentIndex = galleryItems.findIndex(isCurrentGalleryItem);
  const nextIndex = currentIndex + 1;
  const lastIndex = galleryItems.length - 1;

  if (currentIndex === lastIndex) {
    currentImage.src = galleryItems[0].original;
    currentImage.alt = galleryItems[0].alt;
  } else {
    currentImage.src = galleryItems[nextIndex].original;
    currentImage.alt = galleryItems[nextIndex].alt;
  }
}

function getPreviousLightboxImage(currentImage) {
  const isCurrentGalleryItem = (item) => item.original === currentImage.src;

  const currentIndex = galleryItems.findIndex(isCurrentGalleryItem);
  const previousIndex = currentIndex - 1;
  const lastIndex = galleryItems.length - 1;

  if (currentIndex === 0) {
    currentImage.src = galleryItems[lastIndex].original;
    currentImage.alt = galleryItems[lastIndex].alt;
  } else {
    currentImage.src = galleryItems[previousIndex].original;
    currentImage.alt = galleryItems[previousIndex].alt;
  }
}

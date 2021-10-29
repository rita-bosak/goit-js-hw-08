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
        data-source="${item.preview}"
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

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const originalImage = getOriginalImage(evt.target, galleryItems);

  lightbox.classList.add('is-open');

  openLightboxImage(evt.target, originalImage);
}

function getOriginalImage(target, array) {
  for (let i = 0; i < array.length; i += 1) {
    if (target.alt === array[i].description) {
      return array[i].original;
    }
  }
}

function openLightboxImage(target, image) {
  lightboxImage.src = image;
  lightboxImage.alt = target.alt;
}

lightboxCloseBtn.addEventListener('click', handleLightboxClose);
lightboxOverlay.addEventListener('click', handleLightboxClose);

function handleLightboxClose() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
}

window.addEventListener('keydown', handleLightboxEscape);

function handleLightboxEscape(evt) {
  if (!lightbox.classList.contains('.is-open') && evt.key !== 'Escape') {
    return;
  }
  handleLightboxClose();
}

window.addEventListener('keydown', handleNextLightboxImage);

function handleNextLightboxImage(evt) {
  if (!lightbox.classList.contains('.is-open') && evt.key !== 'ArrowRight') {
    return;
  }

  const nextLightboxImage = getNextOriginalImage(lightboxImage, galleryItems);
  const nextLightboxImageDescription = getNextImageDescription(
    lightboxImage,
    galleryItems
  );

  lightboxImage.src = nextLightboxImage;
  lightboxImage.alt = nextLightboxImageDescription;
}

function getNextOriginalImage(currentImage, array) {
  for (let i = 0; i < array.length; i += 1) {
    if (currentImage.alt === array[array.length - 1].description) {
      return array[0].original;
    } else if (currentImage.alt === array[i].description) {
      return array[i + 1].original;
    }
  }
}

function getNextImageDescription(currentImage, array) {
  for (let i = 0; i < array.length; i += 1) {
    if (currentImage.alt === array[array.length - 1].description) {
      return array[0].description;
    } else if (currentImage.alt === array[i].description) {
      return array[i + 1].description;
    }
  }
}

window.addEventListener('keydown', handlePreviousLightboxImage);

function handlePreviousLightboxImage(evt) {
  if (!lightbox.classList.contains('.is-open') && evt.key !== 'ArrowLeft') {
    return;
  }

  const previousLightboxImage = getPreviousOriginalImage(
    lightboxImage,
    galleryItems
  );
  const previousLightboxImageDescription = getPreviousImageDescription(
    lightboxImage,
    galleryItems
  );

  lightboxImage.src = previousLightboxImage;
  lightboxImage.alt = previousLightboxImageDescription;
}

function getPreviousOriginalImage(currentImage, array) {
  for (let i = 0; i < array.length; i += 1) {
    if (currentImage.alt === array[0].description) {
      return array[array.length - 1].original;
    } else if (currentImage.alt === array[i].description) {
      return array[i - 1].original;
    }
  }
}

function getPreviousImageDescription(currentImage, array) {
  for (let i = 0; i < array.length; i += 1) {
    if (currentImage.alt === array[0].description) {
      return array[array.length - 1].description;
    } else if (currentImage.alt === array[i].description) {
      return array[i - 1].description;
    }
  }
}

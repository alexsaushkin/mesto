// попап картинки
export const photoPopup = document.querySelector("#photo-popup");
export const imageElement = photoPopup.querySelector(".popup__image");
export const captionElement = photoPopup.querySelector(".popup__caption");
export const buttonClosePhotoPopup = photoPopup.querySelector(".popup__close-btn");

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
}

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

function closeOpenedPopup() {
  const popupOpened = findOpenedPopup();
  if (popupOpened) {
    closePopup(popupOpened);
  }
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closeOpenedPopup();
  }
}

export function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}

function handleEscClose() {
  document.addEventListener('keydown', closePopupEsc);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  handleEscClose();
}

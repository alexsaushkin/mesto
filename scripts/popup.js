export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
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

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeOpenedPopup();
  }
}

function handleEscClose() {
  document.addEventListener('keydown', closePopupEsc);
}

function handleOverlayClose(popupOpened) {
  const overlay = popupOpened.closest('.popup');
  overlay.addEventListener('click', closePopupOverlay)
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  handleEscClose();
  handleOverlayClose(popup);
}

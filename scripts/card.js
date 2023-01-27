import {openPopup} from './popup.js';

// попап картинки
export const photoPopup = document.querySelector("#photo-popup");
const imageElement = photoPopup.querySelector(".popup__image");
const captionElement = photoPopup.querySelector(".popup__caption");
export const closePhotoPopupBtn = photoPopup.querySelector(".popup__close-btn");

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".gallery__element")
      .cloneNode(true);
    return cardElement;
  }

  _likeCard() {
    this._element.querySelector(".gallery__like").classList.toggle("gallery__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPhotoPopup() {
    imageElement.src = this._link;
    imageElement.alt = this._name;
    captionElement.textContent = this._name;
    openPopup(photoPopup);
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardPhotoElement = this._element.querySelector(".gallery__photo");
    cardPhotoElement.src = this._link;
    cardPhotoElement.alt = this._name;

    this._element.querySelector(".gallery__title").textContent = this._name;

    this._element.querySelector(".gallery__like").addEventListener("click", () => {
      this._likeCard();
    });

    this._element.querySelector(".gallery__delete").addEventListener("click", () => {
      this._deleteCard();
    });

    cardPhotoElement.addEventListener("click", () => {
      this._openPhotoPopup();
    });

    return this._element;
  }

}

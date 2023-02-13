export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".gallery__like");
    this._cardPhotoElement = this._element.querySelector(".gallery__photo");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".gallery__element")
      .cloneNode(true);
  }

  _likeCard() {
    this._buttonLike.classList.toggle("gallery__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._cardPhotoElement.src = this._link;
    this._cardPhotoElement.alt = this._name;

    this._element.querySelector(".gallery__title").textContent = this._name;

    this._buttonLike.addEventListener("click", () => {
      this._likeCard();
    });

    this._element.querySelector(".gallery__delete").addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardPhotoElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });

    return this._element;
  }

}

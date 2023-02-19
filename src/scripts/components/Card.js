export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, handleDislikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._isLiked = this._checkIfLiked(userId);
    this._isOwner = this._checkIfOwner(userId);
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".gallery__like");
    this._likeCounter = this._element.querySelector(".gallery__like-counter");
    this._cardPhotoElement = this._element.querySelector(".gallery__photo");
    this._deleteBtn = this._element.querySelector(".gallery__delete");
    this._elementTitle = this._element.querySelector(".gallery__title");
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".gallery__element")
      .cloneNode(true);
  }

  _checkIfLiked(userId) {
    return !!this._likes.find(el => el._id === userId);
  }

  _checkIfOwner(userId) {
    return userId === this._owner._id;
  }

  like() {
    this._buttonLike.classList.add("gallery__like_active");
  }

  dislike() {
    this._buttonLike.classList.remove("gallery__like_active");
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = this._likes.length;
  }

  remove() {
    if (this._isOwner) {
      this._element.remove();
      this._element = null;
    }
  }

  _deleteCard() {
    this._handleDeleteClick(this._id, this);
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleDislikeClick(this)
          .then(() => {
            this._isLiked = false;
          })
      } else {
        this._handleLikeClick(this)
          .then(() => {
            this._isLiked = true;
          })
      }
    });

    if (this._isOwner) {
      this._deleteBtn.classList.add("gallery__delete_active");

      this._deleteBtn.addEventListener("click", () => {
        this._deleteCard();
      });
    }

    this._cardPhotoElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._cardPhotoElement.src = this._link;
    this._cardPhotoElement.alt = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._elementTitle.textContent = this._name;

    if (this._isLiked) {
      this.like();
    } else {
      this.dislike();
    }

    this._setEventListeners();

    return this._element;
  }

}

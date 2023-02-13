export default class Popup {
  constructor(templateSelector) {
    this._element = document.querySelector(templateSelector);
    this._handleEscCloseBinded = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBinded);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBinded);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    })
  }
}

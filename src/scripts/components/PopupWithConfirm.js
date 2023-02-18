import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(templateSelector, handleSubmitForm) {
    super(templateSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardId, this._card);
    });
  }


}

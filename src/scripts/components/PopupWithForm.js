import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(templateSelector, formSelector, inputSelector, submitButtonSelector, handleSubmitForm) {
    super(templateSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._element.querySelector(formSelector);
    this._inputElements = this._element.querySelectorAll(inputSelector);
    this._submitButton = this._form.querySelector(submitButtonSelector);
  }

  _getInputValues() {
    this._values = {};
    this._inputElements.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._handleSubmitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

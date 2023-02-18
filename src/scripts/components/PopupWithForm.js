import { formSelector, inputSelector, submitButtonSelector } from "../settings.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(templateSelector, handleSubmitForm) {
    super(templateSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._element.querySelector(formSelector);
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, btnText = "") {
    if (isLoading) {
      this._submitButton.textContent = btnText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    this._values = {};
    this._element.querySelectorAll(inputSelector).forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

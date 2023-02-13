import {formSelector, inputSelector} from "../settings.js"
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(templateSelector, handleSubmitForm) {
    super(templateSelector);
    this._handleSubmitForm = handleSubmitForm;
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
    this._element.querySelector(formSelector).reset();
  }
}

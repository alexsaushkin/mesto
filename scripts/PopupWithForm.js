import Popup from "./popup";

export class PopupWithForm extends Popup {
  constructor(handleSubmitForm, templateSelector) {
    super(templateSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  close(src) {
    super.open();
  }
}

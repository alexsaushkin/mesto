import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(templateSelector) {
    super(templateSelector);
    this._image = this._element.querySelector(".popup__image");
    this._caption = this._element.querySelector(".popup__caption");
  }

  open(src, alt) {
    this._image.src = src;
    this._image.alt = alt;
    this._caption.textContent = alt;
    super.open();
  }
}

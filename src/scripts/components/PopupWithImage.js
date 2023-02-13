import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(src, alt) {
    this._element.querySelector(".popup__image").src = src;
    this._element.querySelector(".popup__image").alt = alt;
    this._element.querySelector(".popup__caption").textContent = alt;
    super.open();
  }
}

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  _clear() {
    this._renderedItems = [];
    this._container.innerHTML = '';
  }

  setItems(items) {
    this._clear();
    this._renderedItems = items;
  }

  renderElements() {
    this._renderedItems.forEach(item => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}

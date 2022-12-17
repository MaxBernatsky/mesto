export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((data) => {
      this._renderer(data, this._container);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }

  addInitialItems(item) {
    this._container.append(item);
  }
}

import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = {};
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(
      this._popupForm.querySelectorAll('.popup__input')
    );
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputs[input.name] = [input.value];
    });
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      this._handleFormSubmit(e, this._getInputValues());
    });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}

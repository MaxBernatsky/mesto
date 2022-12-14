import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputs = [...this._popupForm.querySelectorAll('.popup__input')];
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  changeHandleFormSubmit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}

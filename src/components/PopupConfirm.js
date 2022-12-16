import { Popup } from './Popup.js';
export class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__button');
    this._handleFormSubmit = handleFormSubmit;
  }

  changeHandleFormSubmit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}

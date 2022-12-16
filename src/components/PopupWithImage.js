import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgFull = this._popup.querySelector('.popup__img');
    this._popupImgDescr = this._popup.querySelector('.popup__descr');
  }
  open(name, link) {
    this._popupImgDescr.textContent = name;
    this._popupImgFull.alt = name;
    this._popupImgFull.src = link;
    super.open();
  }
}

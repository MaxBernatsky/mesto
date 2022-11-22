import { Popup } from './Popup';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this.popupImgDescr = this._popup.querySelector('.popup__descr');
  }
  open(name, link) {
    super.open();
    popupImgDescr.textContent = name;
    popupImgFull.alt = name;
    popupImgFull.src = link;
  }
}

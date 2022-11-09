import { openPopup, popupImg, popupImgDescr, popupImgFull } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__img').src = this._link;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.place__delete-btn')
      .addEventListener('click', this._deletePlace);

    this._element
      .querySelector('.place__like-btn')
      .addEventListener('click', this._likePlace);

    this._element
      .querySelector('.place__img')
      .addEventListener('click', this._openPlaceCard);
  }

  _deletePlace = () => {
    this._element.remove();
  };

  _likePlace = (e) => {
    e.target.classList.toggle('place__like-btn_active');
  };

  _openPlaceCard = () => {
    openPopup(popupImg);
    popupImgFull.src = this._link;
    popupImgFull.alt = this._name;
    popupImgDescr.textContent = this._name;
  };
}

export class Card {
  constructor(data, templateSelector, openCardPlace) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCardPlace = openCardPlace;
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
    this._element.querySelector('.place__img').alt = this._name;
    this._element.querySelector('.place__img').src = this._link;

    return this._element;
  }

  _setEventListeners() {
    this._placeDeleteBtn = this._element.querySelector('.place__delete-btn');
    this._placeDeleteBtn.addEventListener('click', () => {
      this._deletePlace();
    });

    this._placeLikeBtn = this._element.querySelector('.place__like-btn');
    this._placeLikeBtn.addEventListener('click', () => {
      this._likePlace();
    });

    this._placeImg = this._element.querySelector('.place__img');
    this._placeImg.addEventListener('click', () => {
      this._openCardPlace(this._name, this._link);
    });
  }

  _deletePlace() {
    this._element.remove();
  }

  _likePlace() {
    this._placeLikeBtn.classList.toggle('place__like-btn_active');
  }
}

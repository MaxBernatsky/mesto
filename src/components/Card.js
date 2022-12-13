export class Card {
  constructor(data, templateSelector, openCardPlace, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._openCardPlace = openCardPlace;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }

  _setLikes() {
    const likeCountElement = this._element.querySelector('.place__like-count');
    likeCountElement.textContent = this._likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._name;
    this._placeImg.alt = this._name;
    this._placeImg.src = this._link;
    this._setLikes();
    return this._element;
  }

  _setEventListeners() {
    this._placeDeleteBtn = this._element.querySelector('.place__delete-btn');
    this._placeDeleteBtn.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
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

  deletePlace() {
    this._element.remove();
    this._element = null;
  }

  _likePlace() {
    this._placeLikeBtn.classList.toggle('place__like-btn_active');
  }
}

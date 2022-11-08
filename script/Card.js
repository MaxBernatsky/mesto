initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

class Card {
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

    this._element.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.place__delete-btn')
      .addEventListener('click', this._deletePlace);

    this._element.addEventListener('click', this._likePlace);
  }

  _deletePlace = () => {
    this._element.remove();
  };

  _likePlace = () => {
    this._element
      .querySelector('.place__like-btn')
      .classList.toggle('place__like-btn_active');
  };
}

initialCards.forEach((item) => {
  const card = new Card(item, '#place-template');
  const cardElement = card.generateCard();
  document.querySelector('.places').append(cardElement);
});

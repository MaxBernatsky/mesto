export class Card {
  constructor(
    data,
    templateSelector,
    openCardPlace,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._openCardPlace = openCardPlace;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.place__like-count');
    likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._addFillLikePlace();
    } else {
      this._removeFillLikePlace();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._name;
    this._placeImg.alt = this._name;
    this._placeImg.src = this._link;
    this.setLikes(this._likes);
    this.isOwner();

    return this._element;
  }

  isOwner() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.place__delete-btn').remove();
    }
  }

  isLiked() {
    const hasLikedCard = this._likes.find((user) => user._id === this._userId);
    return hasLikedCard;
  }

  _setEventListeners() {
    this._placeDeleteBtn = this._element.querySelector('.place__delete-btn');
    this._placeDeleteBtn.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._placeLikeBtn = this._element.querySelector('.place__like-btn');
    this._placeLikeBtn.addEventListener('click', () => {
      this._handleLikeClick(this._id);
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

  _addFillLikePlace() {
    this._placeLikeBtn.classList.add('place__like-btn_active');
  }

  _removeFillLikePlace() {
    this._placeLikeBtn.classList.remove('place__like-btn_active');
  }
}

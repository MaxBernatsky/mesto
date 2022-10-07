// Profile Elements
const editBtn = document.querySelector('.profile__btn-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Popup Elements
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const closeBtn = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__name');
const inputProfession = document.querySelector('.popup__profession');

// Popup-place Elements
const popupAddBtn = document.querySelector('.profile__btn-add');
const popupPlace = document.querySelector('.popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup-place__form');
const popupPlaceCloseBtn = popupPlace.querySelector('.popup-place__close');
const popupPlaceInputName = popupPlace.querySelector('.popup-place__name');
const popupPlaceInputLink = popupPlace.querySelector('.popup-place__link');
const popupPlaceBtnCreate = popupPlace.querySelector('.popup-place__button');

const popupImg = document.querySelector('.popup-img');
const popupImgCloseBtn = popupImg.querySelector('.popup-img__close');
const popupImgFull = popupImg.querySelector('.popup-img__full');
const popupImgDescr = popupImg.querySelector('.popup-img__descr');

const popupOpen = () => {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileTitle.textContent;
    inputProfession.value = profileSubtitle.textContent;
  }
};

const popupPlaceOpen = () => {
  popupPlace.classList.add('popup-place_opened');
};

const popupPlaceClose = () => {
  popupPlace.classList.remove('popup-place_opened');
};

const popupClose = () => {
  popup.classList.remove('popup_opened');
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;

  popupClose();
};

const placeFormSubmitHandler = (evt) => {
  evt.preventDefault();
  popupPlaceClose();
};

popupForm.addEventListener('submit', formSubmitHandler);

popupPlaceForm.addEventListener('submit', placeFormSubmitHandler);

editBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose);

popupPlaceCloseBtn.addEventListener('click', popupPlaceClose);

popupAddBtn.addEventListener('click', popupPlaceOpen);

popupPlaceBtnCreate.addEventListener('click', popupPlaceClose);

const initialCards = [
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

const placeTemplate = document.querySelector('#place-template').content;
const container = document.querySelector('.places');

const render = () => {
  initialCards.forEach((item) => {
    const currentElement = createItemNode(item.name, item.link);
    container.append(currentElement);
  });
  popupPlaceBtnCreate.addEventListener('click', addNewPlace);
};

const createItemNode = (name, link) => {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__title');
  const placeImg = placeElement.querySelector('.place__img');

  placeTitle.textContent = name;
  placeImg.src = link;

  const deleteBtn = placeElement.querySelector('.place__delete-btn');
  deleteBtn.addEventListener('click', deletePlace);

  const likeBtn = placeElement.querySelector('.place__like-btn');
  likeBtn.addEventListener('click', likePlace);

  placeImg.addEventListener('click', () => {
    popupImg.classList.add('popup-img_opened');
    if (popupImg.classList.contains('popup-img_opened')) {
      popupImgFull.src = link;
      popupImgDescr.textContent = name;
    }
  });

  popupImgCloseBtn.addEventListener('click', closeImgPopup);

  return placeElement;
};

const addNewPlace = () => {
  const newPlace = createItemNode(
    popupPlaceInputName.value,
    popupPlaceInputLink.value
  );
  container.prepend(newPlace);
};

const likePlace = (evt) => {
  const currentLike = evt.target;
  currentLike.classList.toggle('place__like-btn_active');
};

const deletePlace = (evt) => {
  const currentEl = evt.target.closest('.place');
  currentEl.remove();
};

const closeImgPopup = () => {
  popupImg.classList.remove('popup-img_opened');
};

render();

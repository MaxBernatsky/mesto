// Profile Elements
const editBtn = document.querySelector('.profile__btn-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Popup Elements
const popup = document.querySelector('#popup-profile');
const popupForm = document.querySelector('.popup__form');
const closeBtn = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__input_item_name');
const inputProfession = document.querySelector('.popup__input_item_descr');

// Popup-place Elements
const popupAddBtn = document.querySelector('.profile__btn-add');
const popupPlace = document.querySelector('#popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceCloseBtn = popupPlace.querySelector('.popup__close');
const popupPlaceInputName = popupPlace.querySelector('.popup__input_item_name');
const popupPlaceInputLink = popupPlace.querySelector(
  '.popup__input_item_descr'
);
const popupPlaceBtnCreate = popupPlace.querySelector('.popup__button');

//Popup-img
const popupImg = document.querySelector('#popup-img');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');
const popupImgFull = popupImg.querySelector('.popup__img');
const popupImgDescr = popupImg.querySelector('.popup__descr');

const placeTemplate = document.querySelector('#place-template').content;
const container = document.querySelector('.places');

const popupOpen = () => {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileTitle.textContent;
    inputProfession.value = profileSubtitle.textContent;
  }
};

const popupPlaceOpen = () => {
  popupPlace.classList.add('popup_opened');
};

const popupPlaceClose = () => {
  popupPlace.classList.remove('popup_opened');
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

const render = () => {
  initialCards.forEach((item) => {
    const currentElement = createItemNode(item.name, item.link);
    container.append(currentElement);
  });
  popupPlaceBtnCreate.addEventListener('click', addNewPlace);
};

const addNewPlace = () => {
  const newPlace = createItemNode(
    popupPlaceInputName.value,
    popupPlaceInputLink.value
  );
  container.prepend(newPlace);
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
    popupImg.classList.add('popup_opened');
    if (popupImg.classList.contains('popup_opened')) {
      popupImgFull.src = link;
      popupImgDescr.textContent = name;
    }
  });

  popupImgCloseBtn.addEventListener('click', closeImgPopup);

  return placeElement;
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
  popupImg.classList.remove('popup_opened');
};

render();

popupForm.addEventListener('submit', formSubmitHandler);

popupPlaceForm.addEventListener('submit', placeFormSubmitHandler);

editBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose);

popupPlaceCloseBtn.addEventListener('click', popupPlaceClose);

popupAddBtn.addEventListener('click', popupPlaceOpen);

popupPlaceBtnCreate.addEventListener('click', popupPlaceClose);

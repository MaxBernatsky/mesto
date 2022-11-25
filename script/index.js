import { initialCards, settings } from './settings.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

// Profile Elements
const popupProfile = document.querySelector('#popup-profile');
const editBtn = document.querySelector('.profile__btn-edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileName = popupProfileForm.querySelector('.popup__input_item_name');
const profileProfession = popupProfileForm.querySelector(
  '.popup__input_item_descr'
);
const popupAddBtn = document.querySelector('.profile__btn-add');

//Profile Validation
const profileFormValidation = new FormValidator(settings, popupProfileForm);
profileFormValidation.enableValidation();

//Place Validation
const placeFormValidation = new FormValidator(settings, popupPlaceForm);
placeFormValidation.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createNewPlace(data));
    },
  },
  '.places'
);

const popupFullImg = new PopupWithImage('#popup-img');
popupFullImg.setEventListeners();

const popupAddPlace = new PopupWithForm('#popup-place', handlePlaceFormSubmit);
popupAddPlace.setEventListeners();

function handlePlaceFormSubmit(evt, data) {
  evt.preventDefault();
  createNewPlace(data);
  const newPlace = createNewPlace(data);
  cardList.addItem(newPlace);
  popupPlaceForm.reset();
  popupAddPlace.close();
}

const handlePlaceClick = (name, link) => {
  popupFullImg.open(name, link);
};

const createNewPlace = (data) => {
  return new Card(data, '#place-template', handlePlaceClick).generateCard();
};

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupUserProfile = new PopupWithForm(
  '#popup-profile',
  handleProfileFormSubmit
);

function handleProfileFormSubmit(evt, data) {
  evt.preventDefault();
  userInfo.setUserInfo(data);
  popupUserProfile.close();
}

popupUserProfile.setEventListeners();

editBtn.addEventListener('click', () => {
  popupUserProfile.open();
  const profileInfo = userInfo.getUserInfo();
  profileName.value = profileInfo.userName;
  profileProfession.value = profileInfo.userDescription;
  profileFormValidation.resetValidation();
});

popupAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
  placeFormValidation.resetValidation();
});

cardList.renderItems();
